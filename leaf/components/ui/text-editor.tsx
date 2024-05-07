import * as React from "react"

import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
// @ts-ignore
import ImageResize from "quill-image-resize-module-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

Quill.register("modules/imageResize", ImageResize)

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
  imageResize: {
    parchment: Quill.import("parchment"),
  },
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
]

// TODO: do this later when have time
// const TextEditor = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, value = "", onChange, ...props }, ref) => {
//     return <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={props.onChange} />
//   }
// )
// TextEditor.displayName = "TextEditor"

// export { TextEditor }
