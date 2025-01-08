import { RunFrame } from "@tscircuit/runframe/runner"
import { useEffect, useState } from "react"
export default () => {
  const params = new URLSearchParams(window.location.search)
  const jlcpcb_part_number = params.get("jlcpcb_part_number")

  const [error, setError] = useState<string | null>(null)
  const [tscircuitCode, setTscircuitCode] = useState<string>("")

  useEffect(() => {
    if (!jlcpcb_part_number) {
      return
    }
    setError(null)

    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jlcpcb_part_number }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error)
        }
        setTscircuitCode(data.tscircuitCode)
      })
      .catch((error) => {
        setError(error.message)
      })
  }, [jlcpcb_part_number])

  if (!jlcpcb_part_number) {
    return (
      <div>No part number provided, add ?jlcpcb_part_number= to the URL</div>
    )
  }

  if (!tscircuitCode) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <RunFrame
        entrypoint="entrypoint.tsx"
        fsMap={{
          "entrypoint.tsx": `
import * as Snippet from "./snippet.tsx"

let bestImport = Object.keys(Snippet).find((key) => !key.startsWith("use"))

const Component = Snippet[bestImport]

circuit.add(<board width="10mm" height="10mm"><Component name="U1" /></board>)
    
    `,
          "snippet.tsx": tscircuitCode,
        }}
      />
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
        <code className="text-sm font-mono">{tscircuitCode}</code>
      </pre>
    </div>
  )
}
