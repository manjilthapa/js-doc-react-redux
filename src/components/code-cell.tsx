import { useCallback, useState } from "react"
import CodeEditor from "./code-editor"
import Preview from "./preview"
import bundle, { setupBundle } from "../bundler"

setupBundle()
const CodeCell = () => {
  const [input, setInput] = useState("")
  const [code, setCode] = useState("")

  const onClick = useCallback(async () => {
    const output = await bundle(input)
    setCode(output)
  }, [input])

  return (
    <div>
      <CodeEditor value={input} onChange={(v) => setInput(v)} />

      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  )
}

export default CodeCell
