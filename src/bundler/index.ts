import * as esbuild from "esbuild-wasm"
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"
import { fetchPlugin } from "./plugins/fetch-plugin"

let waiting: Promise<void>
export const setupBundle = () => {
  waiting = esbuild.initialize({
    wasmURL: `https://unpkg.com/esbuild-wasm@0.23.0/esbuild.wasm`,
    worker: true,
  })
}

const bundle = async (rawCode: string) => {
  await waiting
  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    })
    return {
      error: "",
      code: result.outputFiles[0].text,
    }
  } catch (err: any) {
    return {
      error: err.message,
      code: "",
    }
  }
}

export default bundle
