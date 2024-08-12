import { useCallback, useEffect, useState } from "react"
import * as esbuild from "esbuild-wasm"
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"
import { fetchPlugin } from "./plugins/fetch-plugin"

const App = () => {
  const [input, setInput] = useState("")
  const [code, setCode] = useState("")

  useEffect(() => {
    const startService = async () => {
      await esbuild.initialize({
        wasmURL: `https://unpkg.com/esbuild-wasm@latest/esbuild.wasm`,
      })
    }
    startService()
  }, [])

  const onClick = useCallback(async () => {
    if (!esbuild.context) {
      return
    }
    // const result = await esbuild.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // })
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    })
    setCode(result.outputFiles[0].text)
  }, [input])
  return (
    <div>
      <textarea placeholder="Type here" onChange={(e) => setInput(e.target.value)} value={input} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

export default App
