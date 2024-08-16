import { useCallback, useEffect, useState } from "react"
import CodeEditor from "./code-editor"
import Preview from "./preview"
import bundle, { setupBundle } from "../bundler"
import { Resizable } from "./resizable"

setupBundle()
const CodeCell = () => {
  const [input, setInput] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input)
      setCode(output.code)
      setError(output.error)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor value={input} onChange={(v) => setInput(v)} />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  )
}

export default CodeCell