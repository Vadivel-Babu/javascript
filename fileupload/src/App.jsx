import { useState } from "react";
function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  return (
    <>
      <div className="upload-container">
        <h1>File Upload</h1>
        <input
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
          }}
        />
        {previewUrl && (
          <div className="preview">
            <h2>Preview:</h2>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: "300px" }} />
            <button
              onClick={() => {
                setFile(null);
                setPreviewUrl(null);
                URL.revokeObjectURL(previewUrl);
              }}
            >
              delete
            </button>
          </div>
        )}
        <button
          onClick={() => {
            if (!file) {
              alert("Please select a file first!");
              return;
            }
            const formData = new FormData();
            formData.append("image", file);

            fetch("http://localhost:3000/upload", {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                alert("File uploaded successfully!");
                console.log(data);
              })
              .catch((error) => {
                alert("Error uploading file.");
                console.error(error);
              });
          }}
        >
          Upload File
        </button>
      </div>
    </>
  );
}

export default App;
