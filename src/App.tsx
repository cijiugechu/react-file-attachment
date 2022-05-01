import { useState } from "react"
import FileAttachment from "./lib"
import "./App.css"

function App() {
	return (
		<div className="App">
			<FileAttachment
				acceptFileType={[".pdf", ".html"]}
				onFileAccepted={(e) => {
					console.log(e.detail.attachments)
				}}
				renderFileNames={(fileNames) => {
					return fileNames.map((n) => <span key={n}>{n}</span>)
				}}
			>
				tips here.
			</FileAttachment>
		</div>
	)
}

export default App
