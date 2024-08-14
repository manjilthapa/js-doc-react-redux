import { useCallback, useEffect, useRef, useState } from "react"
import * as esbuild from "esbuild-wasm"
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin"
import { fetchPlugin } from "../plugins/fetch-plugin"
import CodeEditor from "./code-editor"

const CodeShell = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [input, setInput] = useState("")

  useEffect(() => {
    const startService = async () => {
      await esbuild.initialize({
        wasmURL: `https://unpkg.com/esbuild-wasm@latest/esbuild.wasm`,
      })
    }
    startService()
  }, [])

  const html = `
  <html>
  <head></head>
  <body>
  <div id="root"></div>
  </body>
  <script>
  window.addEventListener("message", (event) => {
    try {
      eval(event.data)
      } catch (err) {
        const root = document.getElementById("root")
        root.innerHTML = "<div style='color: red;'><h4>Runtime Error</h4>" + err + "</div>"
        console.error(err)
      }
        })
  </script>
  </html>
`
  const onClick = useCallback(async () => {
    if (!esbuild.context || !iframeRef.current) {
      return
    }
    // const result = await esbuild.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // })
    iframeRef.current.srcdoc = html
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
    iframeRef.current.contentWindow?.postMessage(result.outputFiles[0].text, "*")
  }, [html, input])

  return (
    <div>
      <CodeEditor value={input} onChange={(v) => setInput(v)} />
      <textarea placeholder="Type here" onChange={(e) => setInput(e.target.value)} value={input} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe ref={iframeRef} title="preview" srcDoc={html} sandbox="allow-scripts" />
    </div>
  )
}

export default CodeShell
