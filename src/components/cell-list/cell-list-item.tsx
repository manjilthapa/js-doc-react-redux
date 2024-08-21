import React, { FC } from "react"
import { Cell } from "../../state/cell"
import CodeCell from "../code-cell/code-cell"
import { TextEditor } from "../text-editor/text-editor"
import { ActionBar } from "./action-bar"

export const CellListItem: FC<{ cell: Cell }> = ({ cell }) => {
  return (
    <div className="cell-list-item" style={{ position: "relative" }}>
      {cell.type === "code" ? (
        <>
          <div className="action-bar-wrapper" style={{ height: "30px", width: "100%", backgroundColor: "#37414b" }}>
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      )}
    </div>
  )
}
