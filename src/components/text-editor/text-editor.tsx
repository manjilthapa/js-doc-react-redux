import MDEditor from "@uiw/react-md-editor"
import "./text-editor.css"
import React, { FC, useEffect, useRef } from "react"
import { Cell } from "../../state"
import { useActions } from "../../hooks/use-actions"

export const TextEditor: FC<{ cell: Cell }> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [editing, setEditing] = React.useState(false)
  const { updateCell } = useActions()

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return
      }
      setEditing(false)
    }
    document.addEventListener("click", listener, { capture: true })
    return () => {
      document.removeEventListener("click", listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || "")} />
      </div>
    )
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content} />
      </div>
    </div>
  )
}
