import { useState, useRef } from "react";
import { execute } from "./api";
// import reactLogo from "./assets/react.svg";
import Editor from "@monaco-editor/react";
import "./App.css";
import "./index.js";

const files = {
  "script.py": {
    name: "script.py",
    language: "python",
    id: 71,
    value: "# Write your code",
  },
  "main.c": {
    name: "main.c",
    language: "c",
    id: 48,
    value: "// Write your code",
  },
  "main.cpp": {
    name: "main.cpp",
    language: "cpp",
    id: 52,
    value: "// Write your code",
  },
  "app.js": {
    name: "app.js",
    language: "javascript",
    id: 93,
    value: "// Write your code",
  },
  "main.java": {
    name: "main.java",
    language: "java",
    id: 62,
    value: "// Write your code",
  },
};

function App() {
  const [fileName, setFileName] = useState("main.cpp");
  const editorRef = useRef(null);
  const file = files[fileName];

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function getEditorValue() {
    const source_code = editorRef.current.getValue();
    // console.log(typeof code);
    // alert(editorRef.current.getValue());
    const response = await execute({ source_code, language_id: file.id });
  }

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  return (
    <div className="App">
      <button onClick={() => setFileName("main.cpp")}>C++</button>
      <button onClick={() => setFileName("main.c")}>C</button>
      <button onClick={() => setFileName("script.py")}>Python</button>
      <button onClick={() => setFileName("main.java")}>Java</button>
      <button onClick={() => setFileName("app.js")}>Javascript</button>
      <button onClick={() => getEditorValue()}>Get Editor Value</button>
      {/* <div
        id="editor-container"
        style={{
          width: "50%",
          height: "50vh",
          overflow: "hidden", // Prevent content from overflowing
          position: "relative", // Required for absolute positioning of handle
        }}
      >
        <Editor
          height="100%" // The Editor should take 100% height of its parent
          width="100%" // The Editor should take 100% width of its parent
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onValidate={handleEditorValidation}
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
        />
        <div
          id="resize-handle"
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "10px", // Width of the handle
            height: "10px", // Height of the handle
            background: "gray",
            cursor: "nwse-resize", // Use a resize cursor
          }}
        />
      </div> */}

      <Editor
        height="50vh"
        width="50%"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </div>
  );
}

export default App;
