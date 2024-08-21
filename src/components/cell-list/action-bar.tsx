import React, { FC } from "react"
import { useActions } from "../../hooks/use-actions"
import "./action-bar.css"

export const ActionBar: FC<{ id: string }> = ({ id }) => {
  const { deleteCell, moveCell } = useActions()
  return (
    <div className="action-bar" style={{ position: "absolute", right: 0, top: 0 }}>
      <button className="button is-primary is-small" onClick={() => moveCell(id, "up")}>
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button className="button is-primary is-small" onClick={() => moveCell(id, "down")}>
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className="button is-danger is-small" onClick={() => deleteCell(id)}>
        <span className="icon">
          <i className="fas fa-trash"></i>
        </span>
      </button>
    </div>
  )
}
