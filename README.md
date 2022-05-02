# react-file-attachment

React bindings for [file-attachment-element](https://github.com/github/file-attachment-element).

## Installation
```bash
npm install react-file-attachment
# or yarn
yarn add react-file-attachment
# or pnpm
pnpm add react-file-attachment
```

## Usage
#### Plain
```jsx
import FileAttachment from 'react-file-attachment';

const App = () => {
    return (
        <FileAttachment>
            Your tips here
        </FileAttachment>
    )
}
```

#### specifying the file types
```jsx
import FileAttachment from 'react-file-attachment';

const App = () => {
    return (
        <FileAttachment acceptFileType={[".pdf", ".html"]}
        >
            Your tips here
        </FileAttachment>
    )
}
```

#### render accepted file names
```jsx
import FileAttachment from 'react-file-attachment';

const App = () => {
    return (
        <FileAttachment renderFileName={(fileNames) => {
            return fileNames.map((n) => <span key={n}>{n}</span>)
        }}
        >
            Your tips here
        </FileAttachment>
    )
}
```

#### styling the element
```jsx
import FileAttachment from 'react-file-attachment';

const App = () => {
    return (
        <FileAttachment
            style={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #e3e3e3',
                borderRadius: '4px',
                padding: '10px',
                cursor: 'pointer',
                display: 'inline-block',
                margin: '10px',
            }}
            className="custom-classname"
        >
            Your tips here
        </FileAttachment>
    )
}
```

#### events
```tsx
import FileAttachment from 'react-file-attachment';
import type {FileAcceptEvent, FileAcceptEvented} from 'react-file-attachment';

const App = () => {
    const onFileAccept = (evt: FileAcceptEvent) => {
        console.log(evt.detail.attachments);
    }

    const onFileAccepted = (evt: FileAcceptedEvent) => {
        console.log(evt.detail.attachments);
    }
    return (
        <FileAttachment
            onFileAccept={onFileAccept}
            onFileAccepted={onFileAccepted}
        >
            Your tips here
        </FileAttachment>
    )
}
```