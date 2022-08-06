import "./App.css";
import { useEffect, useState } from "react";
import { addText, getText } from "./util/FirebaseOperation";
import { useParams } from "react-router-dom";
function App() {
  const [text, setText] = useState("");
  const { noteId } = useParams();
  const [skipCount, setSkipCount] = useState(true);
  useEffect(() => {
    getText(noteId).then((res) => {
      if (res != null) {
        setText(res);
      } else {
        addText(noteId);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (skipCount) setSkipCount(false);
    if (!skipCount) {
      addText(noteId, text);
    }
    // eslint-disable-next-line
  }, [text]);

  return (
    <div className="App">
      <textarea
        name=""
        id=""
        placeholder="Enter your note here!"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
    </div>
  );
}

export default App;
