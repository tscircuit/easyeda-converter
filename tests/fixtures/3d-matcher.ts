import { expect, type MatcherResult } from "bun:test"
import type { AnyCircuitElement } from "circuit-json"
import {
  convertCircuitJsonTo3dGlb,
  getDefaultCameraForCircuitJson,
  renderCircuitJsonTo3dPng,
} from "circuit-json-to-3d-png"
import * as fs from "node:fs"
import * as path from "node:path"
import looksSame from "looks-same"

/** [0,1] percentage of the image that is different */
const ACCEPTABLE_DIFF_FRACTION = 0.01

export type Match3dSnapshotOptions = {
  diffTolerance?: number
  camPos?: readonly [number, number, number]
}

const writeSnapshot = async (
  filePath: string,
  content: Buffer,
  soup: AnyCircuitElement[],
): Promise<void> => {
  fs.writeFileSync(filePath, content)
  if (process.env.SAVE_3D_DEBUG_SNAPSHOT === "1") {
    const debugPath = filePath.replace(/\.png$/, ".glb")
    fs.writeFileSync(debugPath, await convertCircuitJsonTo3dGlb(soup))
  }
}

async function save3dSnapshotOfCircuitJson({
  soup,
  testPath,
  updateSnapshot,
  forceUpdateSnapshot,
  options,
}: {
  soup: AnyCircuitElement[]
  testPath: string
  updateSnapshot: boolean
  forceUpdateSnapshot: boolean
  options?: Match3dSnapshotOptions
}): Promise<MatcherResult> {
  testPath = testPath.replace(/\.test\.tsx?$/, "")
  const snapshotDir = path.join(path.dirname(testPath || ""), "__snapshots__")
  const snapshotName = `${path.basename(testPath || "")}-simple-3d.snap.png`
  const filePath = path.join(snapshotDir, snapshotName)

  const camera = options?.camPos
    ? {
        ...(await getDefaultCameraForCircuitJson(soup)),
        camPos: options.camPos,
      }
    : undefined
  const content = Buffer.from(
    await renderCircuitJsonTo3dPng(soup, camera ? { camera } : undefined),
  )

  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir, { recursive: true })
  }

  if (!fs.existsSync(filePath) || forceUpdateSnapshot) {
    console.log("Writing snapshot at", filePath)
    await writeSnapshot(filePath, content, soup)
    return {
      message: () => `Snapshot created at ${filePath}`,
      pass: true,
    }
  }

  const existingSnapshot = fs.readFileSync(filePath)
  const currentBuffer = Buffer.isBuffer(content)
    ? content
    : Buffer.from(content)

  const lsResult = await looksSame(currentBuffer, existingSnapshot, {
    strict: false,
    tolerance: 7,
    ignoreAntialiasing: true,
    antialiasingTolerance: 4,
    shouldCluster: true,
    clustersSize: 10,
    createDiffImage: true,
  })

  if (lsResult.equal) {
    if (forceUpdateSnapshot) {
      console.log("Updating snapshot at", filePath)
      await writeSnapshot(filePath, content, soup)
    }
    return {
      message: () => "Snapshot matches",
      pass: true,
    }
  }

  let areaOfDiffClusters = 0
  for (const cluster of lsResult.diffClusters) {
    areaOfDiffClusters +=
      (cluster.right - cluster.left) * (cluster.bottom - cluster.top)
  }

  /** [0,1] percentage of the image that is different */
  const diffFraction = areaOfDiffClusters / lsResult.totalPixels

  if (diffFraction <= (options?.diffTolerance ?? ACCEPTABLE_DIFF_FRACTION)) {
    return {
      message: () =>
        `Snapshot within acceptable difference (${(diffFraction * 100).toFixed(2)}% <= ${(ACCEPTABLE_DIFF_FRACTION * 100).toFixed(3)}%)`,
      pass: true,
    }
  }

  if (updateSnapshot) {
    console.log("Updating snapshot at", filePath)
    await writeSnapshot(filePath, content, soup)
    return {
      message: () =>
        `Snapshot updated at ${filePath}(was ${(diffFraction * 100).toFixed(2)}% different)`,
      pass: true,
    }
  }

  const diffPath = filePath.replace(/\.snap\.(svg|png)$/, ".diff.png")
  if (lsResult.diffImage) {
    await lsResult.diffImage.save(diffPath)
  } else {
    await looksSame.createDiff({
      reference: existingSnapshot,
      current: currentBuffer,
      diff: diffPath,
      highlightColor: "#ff00ff",
    })
  }

  return {
    message: () =>
      `Snapshot differs by ${(diffFraction * 100).toFixed(2)}% (> ${(ACCEPTABLE_DIFF_FRACTION * 100).toFixed(3)}%). Diff saved at ${diffPath}`,
    pass: false,
  }
}

async function match3dSnapshot(
  received: unknown,
  ...args: any[]
): Promise<MatcherResult> {
  const resolved = await received
  let circuitJson: AnyCircuitElement[]

  if (Array.isArray(resolved)) {
    circuitJson = resolved as AnyCircuitElement[]
  } else if (
    resolved &&
    typeof resolved === "object" &&
    "getCircuitJson" in resolved &&
    typeof (resolved as any).getCircuitJson === "function"
  ) {
    const maybeRoot = resolved as {
      renderUntilSettled?: () => Promise<void>
      getCircuitJson: () => Promise<AnyCircuitElement[]>
    }
    if (typeof maybeRoot.renderUntilSettled === "function") {
      await maybeRoot.renderUntilSettled()
    }
    circuitJson = await maybeRoot.getCircuitJson()
  } else {
    throw new Error(
      "toMatch3dSnapshot received value that could not be converted to circuit-json",
    )
  }

  return save3dSnapshotOfCircuitJson({
    soup: circuitJson,
    testPath: args[0],
    options: args[1],
    updateSnapshot:
      process.argv.includes("--update-snapshots") ||
      process.argv.includes("-u") ||
      Boolean(process.env.BUN_UPDATE_SNAPSHOTS),
    forceUpdateSnapshot:
      process.argv.includes("--force-update-snapshots") ||
      process.argv.includes("-f") ||
      Boolean(process.env.BUN_FORCE_UPDATE_SNAPSHOTS) ||
      Boolean(process.env.FORCE_BUN_UPDATE_SNAPSHOTS),
  })
}

expect.extend({
  async toMatch3dSnapshot(
    this: any,
    received: unknown,
    ...args: any[]
  ): Promise<MatcherResult> {
    return match3dSnapshot(received, ...args)
  },
})

declare module "bun:test" {
  interface Matchers<T = unknown> {
    toMatch3dSnapshot(
      testPath: string,
      options?: Match3dSnapshotOptions,
    ): Promise<MatcherResult>
  }
}
