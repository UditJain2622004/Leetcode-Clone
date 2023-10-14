import { useState, useRef } from "react";
import { execute } from "./api";
// import reactLogo from "./assets/react.svg";
import Editor from "@monaco-editor/react";
import "./App.css";
import "./index.js";
import fileInfo from "./utils/fileInfo.js";

function App() {
  const [fileName, setFileName] = useState("main.cpp");
  const editorRef = useRef(null);
  const file = fileInfo[fileName];

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function submit() {
    const source_code = editorRef.current.getValue();
    const response = await execute(
      {
        source_code,
        language_id: file.id,
      },
      "652b0b2db7c5ed659af6904a"
    );
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
      <button onClick={() => submit()}>Submit</button>
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
        height="100vh"
        width="50%"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onValidate={handleEditorValidation}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </div>
  );
}

export default App;
