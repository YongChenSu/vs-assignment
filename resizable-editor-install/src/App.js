import "./App.css";
import ResizableEditor from "view-sonic-assignments-resizable-editor/dist/ResizableEditor";

function App() {
  return (
    <div className="App">
      <div className="App-title">Task-1: Everyone can install ResizableEditor from npm</div>
      <a className="App-link" href="https://www.npmjs.com/package/view-sonic-assignments-resizable-editor?activeTab=readme">
        NPM URL Link
      </a>
      <ResizableEditor />
    </div>
  );
}

export default App;
