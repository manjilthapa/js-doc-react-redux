import Editor, { OnMount } from "@monaco-editor/react"
import React, { useRef } from "react"
import prettier from "prettier"
import babelPlugin from "prettier/plugins/babel"
import esTree from "prettier/plugins/estree"

const CodeEditor: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null)
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue())
    })

    editor.updateOptions({ tabSize: 2 })
  }

  const onFormatClick = async () => {
    const unformatted = editorRef.current.getValue()
    const formatted = await prettier.format(unformatted, {
      parser: "babel",
      plugins: [babelPlugin, esTree],
      semi: true,
      useTabs: false,
      singleQuote: true,
    })
    editorRef.current.setValue(formatted)
  }

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>

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
    </div>
  )
}

export default CodeEditor
