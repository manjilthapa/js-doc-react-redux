import * as esbuild from "esbuild-wasm"

const startESbuild = async () => {
  await esbuild.initialize({
    wasmURL: `https://unpkg.com/esbuild-wasm@0.23.0/esbuild.wasm`,
    worker: false,
  })
}

export default startESbuild
