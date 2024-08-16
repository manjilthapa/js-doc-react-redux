import CodeCell from "./components/code-cell"
import "bulmaswatch/darkly/bulmaswatch.min.css"
import { TextEditor } from "./components/text-editor/text-editor"

const App = () => {
  return (
    <div>
      <TextEditor />
      <CodeCell />
    </div>
  )
}

export default App
