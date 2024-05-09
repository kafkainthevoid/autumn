"use client"

interface GoProps {}

import pdfMake from "pdfmake/build/pdfmake.min.js"
import { TDocumentDefinitions } from "pdfmake/interfaces"

const data = [
  ["Item", "Price", "Quantity", "Total"],
  ["Book", "$10.00", 2, "$20.00"],
  ["Pen", "$2.50", 1, "$2.50"],
]

// #1e1f20

const docDefinition: TDocumentDefinitions = {
  content: [
    {
      text: "Sample Invoice",
      fontSize: 20,
      alignment: "center",
      margin: [40, 20], // Top and bottom margins
    },
    {
      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#36383a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      `,
      width: 100,
    },
    {
      text: "Date: 2024-05-09", // Replace with actual date
      fontSize: 12,
      alignment: "left",
      margin: [40, 10], // Top and bottom margins
    },
    {
      table: {
        headerRows: 1,
        widths: ["*", "auto", "auto", "auto"], // Adjust column widths as needed
        body: data,
      },
    },
    {
      text: "Total: $22.50", // Calculate total dynamically if needed
      fontSize: 14,
      alignment: "right",
      margin: [40, 20], // Top and bottom margins
    },
  ],
  defaultStyle: {
    font: "Roboto",
  },
}

pdfMake.fonts = {
  Roboto: {
    normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
}

const Go = ({}: GoProps) => {
  const startDownload = () => {
    pdfMake.createPdf(docDefinition).download("my_invoice.pdf")
  }

  return (
    <div>
      <div>go where</div>
      <button onClick={startDownload}>Download</button>
    </div>
  )
}

export default Go
