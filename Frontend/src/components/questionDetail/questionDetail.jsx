import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { execute, getAQuestion } from "../../api";
import Editor from "@monaco-editor/react";
import Console from "./console";
// import Instructions from "../instructions/instructions";
import DotsLoader from "./../../utils/loader";
import "./questionDetail.css";
import fileInfo from "../../utils/fileInfo.js";

function QuestionDetail() {
  const user = useSelector((state) => state.user?.user);
  const { id } = useParams();

  const [question, setQuestion] = useState({});
  useEffect(() => {
    const fetchQuestion = async () => {
      const question = await getAQuestion(id);
      if (question.success) {
        setQuestion(question.data.question);
      }
    };

    fetchQuestion();
  }, []);

  const [console, setConsole] = useState("start");
  const [response, setResponse] = useState({});
  const [fileName, setFileName] = useState("main.cpp");
  const editorRef = useRef(null);
  const file = fileInfo[fileName];

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.value;
    setFileName(selectedFile);
  };

  async function submit() {
    setConsole("running");
    const source_code = editorRef.current.getValue();
    let options = {
      source_code,
      language_id: file.id,
    };
    if (user) options.user = user;
    const response = await execute(options, id);

    setResponse(response);
    setConsole("ran");
  }

  return (
    <div className="row">
      <div className="question-statement col col-sm-11 col-md-4 col-lg-5 col-xl-6">
        <h2 className="title bold">{question.title}</h2>
        <p className="statement">{question.statement || <DotsLoader />}</p>
        <hr />
        {Object.keys(question).length > 0 && question?.examples.length > 0 && (
          <div className="examples">
            {question.examples.map((ex, i) => {
              return (
                <div className={`example-${i + 1}`}>
                  <h4 className="bold">Example {i + 1} :</h4>
                  <p>Input : {ex[0]}</p>
                  <p>Output : {ex[1]}</p>
                </div>
              );
            })}
          </div>
        )}
        <hr />
        {Object.keys(question).length > 0 &&
          question.constraints.length > 0 && (
            <div className="constraints">
              <h4 className="bold">Constraints : </h4>
              <ul className="list">
                {question.constraints.map((ex) => {
                  return <li>{ex}</li>;
                })}
              </ul>
            </div>
          )}

        <div className="console-area">
          <button className="console-button">Console</button>
          {console == "running" && <DotsLoader />}
          {console == "ran" && <Console response={response} />}
        </div>
      </div>

      <div className="solution col col-sm-12 col-md-8 col-lg-7 col-xl-6">
        <div className="lang">
          <select id="languages" onChange={handleFileChange}>
            <option value="main.cpp" selected>
              C++
            </option>
            <option value="main.c">C</option>
            <option value="script.py">Python</option>
            <option value="main.java">Java</option>
          </select>
          <select id="instructions">
            <option value="" selected>
              Instructions
            </option>
            <option value="" disabled>
              * Take Input from stdin.
            </option>
            <option value="" disabled>
              * Put output to stdout.
            </option>
            <option value="" disabled>
              * You can not put anything else to stdout other than the final
              output.
            </option>
            <option value="" disabled>
              * The first stdout is taken as output.
            </option>
          </select>
        </div>

        <Editor
          className="editor"
          width="100%"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
        />

        <div className="buttons-section">
          <button className="submit-btn" onClick={() => submit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
