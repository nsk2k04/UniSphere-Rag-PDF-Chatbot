import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="hero">

        <div className="logo">
          🚀
        </div>

        <h1>UniSphere</h1>

        <p className="subtitle">
          AI-Powered Academic Knowledge Assistant
        </p>

        <p className="description">
          Upload university regulations, syllabus,
          notes and instantly chat with your documents.
        </p>

        <div className="upload-card">

          <div className="upload-area">
            <div className="upload-icon">📄</div>

            <h3>Drop your PDF here</h3>

            <p>or browse files from your computer</p>

            <input
              type="file"
              accept=".pdf"
            />
          </div>

          <button>
            Upload & Start Chat
          </button>

        </div>

      </div>
    </div>
  );
}

export default App;