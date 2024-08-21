import React, { FC } from "react"
import { useActions } from "../../hooks/use-actions"
import "./add-cell.css"

export const AddCell: FC<{ previousCellId: string | null; forceVisible?: boolean }> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useActions()
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons" style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
        <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, "code")}>
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, "text")}>
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider" style={{ position: "absolute", top: "50%", bottom: "50%", borderBottom: "1px solid grey", zIndex: -1, width: "90%", right: "2.5%", left: "2.5%" }}></div>
    </div>
  )
}
