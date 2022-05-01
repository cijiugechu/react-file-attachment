import "@github/file-attachment-element"
import type Attachment from "@github/file-attachment-element/dist/attachment"
import { CSSProperties, ReactNode, useEffect, useState } from "react"
import "./index.css"

interface FileAttachmentProps {
	enableDir?: boolean
	enableMultiple?: boolean
	className?: string
	style?: CSSProperties
	acceptFileType?: string | string[]
	onFileAccept?: (event: CustomEvent<AcceptEventDetail>) => void
	onFileAccepted?: (event: CustomEvent<AcceptedEventDetail>) => void
	children?: ReactNode
	renderFileNames?: (fileNames: string[]) => ReactNode
}

interface FileAttachmentElementProps {
	directory: boolean
	className?: string
	style?: CSSProperties
}

interface AcceptEventDetail {
	attachments: Attachment[] | Promise<Attachment[]>
}

interface AcceptedEventDetail {
	attachments: Attachment[]
}

declare global {
	interface DocumentEventMap {
		"file-attachment-accept": CustomEvent<AcceptEventDetail>
		"file-attachment-accepted": CustomEvent<AcceptedEventDetail>
	}
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"file-attachment": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> &
				FileAttachmentElementProps
		}
	}
}

function FileAttachment(props: FileAttachmentProps) {
	const {
		enableDir = true,
		enableMultiple = true,
		className,
		acceptFileType = "",
		style,
		onFileAccept,
		onFileAccepted,
		children,
		renderFileNames
	} = props

	const accept = Array.isArray(acceptFileType)
		? acceptFileType.join(" , ")
		: acceptFileType

	const [fileNames, changeFileNames] = useState<string[]>([])

	useEffect(() => {
		onFileAccept &&
			document.addEventListener("file-attachment-accept", onFileAccept)

		document.addEventListener("file-attachment-accepted", (e) => {
			onFileAccepted?.(e)
			const { attachments } = e.detail
			changeFileNames(attachments.map((a) => a.file.name))
		})

		return () => {
			onFileAccept &&
				document.removeEventListener(
					"file-attachment-accept",
					onFileAccept
				)
			onFileAccepted &&
				document.removeEventListener(
					"file-attachment-accepted",
					onFileAccepted
				)
		}
	}, [])

	return (
		<file-attachment
			directory={enableDir}
			className={className}
			style={style}
		>
			{children}
			<input type="file" multiple={enableMultiple} accept={accept} />
			{renderFileNames ? renderFileNames(fileNames) : null}
		</file-attachment>
	)
}

export default FileAttachment
