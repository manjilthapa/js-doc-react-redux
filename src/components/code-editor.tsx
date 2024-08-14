import Editor, { OnMount } from "@monaco-editor/react"
import React from "react"

const CodeEditor: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue())
    })

    editor.updateOptions({ tabSize: 2 })
  }

  return (
    <Editor
      height="500px"
      value={value}
      defaultLanguage="javascript"
      defaultValue="const a = 1;"
      theme="vs-dark"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      onMount={handleEditorDidMount}
    />
  )
}

export default CodeEditor
