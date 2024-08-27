import { FC, useEffect } from "react"
import CodeEditor from "./code-editor"
import Preview from "./preview"
import { setupBundle } from "../../bundler"
import { Resizable } from "./resizable"
import { Cell } from "../../state"
import { useActions } from "../../hooks/use-actions"
import { useTypedSelector } from "../../hooks/use-typed-selector"
import "./code-cell.css"
import { useCumulativeCode } from "../../hooks/use-cumulative-code"

setupBundle()
const CodeCell: FC<{ cell: Cell }> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector(({ bundles }) => bundles?.[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)
  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [cell.id, createBundle, cumulativeCode])

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor value={cell.content} onChange={(v) => updateCell(cell.id, v)} />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
