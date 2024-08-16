import "./resizable.css"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { ResizableBox, ResizableBoxProps } from "react-resizable"

interface ResizableProps {
  direction?: "horizontal" | "vertical"
}
export const Resizable: FC<PropsWithChildren<ResizableProps>> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [width, setWidth] = useState(Math.floor(innerWidth * 0.75))
  let resizableProps: ResizableBoxProps

  useEffect(() => {
    let timer: any

    const listner = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight)
        setInnerWidth(window.innerWidth)
        if (window.innerWidth * 0.75 < width) {
          setWidth(Math.floor(window.innerWidth * 0.75))
        }
      }, 100)
    }
    window.addEventListener("resize", listner)
    return () => {
      window.removeEventListener("resize", listner)
    }
  }, [width])

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      width,
      height: Infinity,
      minConstraints: [Math.floor(innerWidth * 0.2), Infinity],
      maxConstraints: [Math.floor(innerWidth * 0.75), Infinity],
      resizeHandles: ["e"],
      onResizeStop(e, data) {
        setWidth(Math.floor(data.size.width))
      },
    }
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, Math.floor(innerHeight * 0.9)],
      resizeHandles: ["s"],
    }
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}
