"use client"

interface GoProps {}

// #1e1f20

const Go = ({}: GoProps) => {
  const startDownload = () => {}

  return (
    <div>
      <div>go where</div>
      <button onClick={startDownload}>Download</button>
    </div>
  )
}

export default Go
