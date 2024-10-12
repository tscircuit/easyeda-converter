import { readFile, writeFile } from "node:fs/promises"
import { convertEasyEdaJsonToVariousFormats } from "../lib/convert-easyeda-json-to-various-formats"
import path from "node:path"

async function benchmark() {
  const partnumbersPath = path.join(__dirname, "partnumbers.json")
  const resultPath = path.join(__dirname, "result.txt")

  let partnumbers: string[]
  try {
    const data = await readFile(partnumbersPath, "utf-8")
    partnumbers = JSON.parse(data)
  } catch (error) {
    console.error("Error reading partnumbers.json:", error)
    return
  }

  let successes = 0
  let failures = 0
  let failureLog = ""

  for (const partnumber of partnumbers) {
    try {
      await convertEasyEdaJsonToVariousFormats({
        jlcpcbPartNumberOrFilepath: partnumber,
        outputFilename: "temp.tsx",
        formatType: "tsx",
      })
      successes++
    } catch (error) {
      failures++
      failureLog += `Part number: ${partnumber}\nError: ${error}\n\n`
    }
  }

  const summary = `Successes: ${successes}\nFailures: ${failures}\n\nFailure Details:\n${failureLog}`

  try {
    await writeFile(resultPath, summary)
    console.log(`Benchmark complete. Results written to ${resultPath}`)
    console.log(`Successes: ${successes}`)
    console.log(`Failures: ${failures}`)
  } catch (error) {
    console.error("Error writing result.txt:", error)
  }
}

benchmark()
