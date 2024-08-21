import { FC, useEffect } from "react"
import CodeEditor from "./code-editor"
import Preview from "./preview"
import { setupBundle } from "../../bundler"
import { Resizable } from "./resizable"
import { Cell } from "../../state"
import { useActions } from "../../hooks/use-actions"
import { useTypedSelector } from "../../hooks/use-typed-selector"

setupBundle()
const CodeCell: FC<{ cell: Cell }> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector(({ bundles }) => bundles?.[cell.id])
  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [cell.content, cell.id, createBundle])

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor value={cell.content} onChange={(v) => updateCell(cell.id, v)} />
        </Resizable>
        {bundle && <Preview code={bundle.code} error={bundle.err} />}
      </div>
    </Resizable>
  )
}

export default CodeCell
