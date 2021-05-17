import axios from "axios";
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { readString } from "react-papaparse";

export function FileDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: Blob & File) => {
      const reader = new FileReader();
      console.log(file.name);

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result as string;
        const results = readString(binaryStr, {
          header: true
        });
        console.log(results);
        if (file.name === "draft_personal.csv") {
          axios
            .post("/api/draft", results.data)
            .then((res) => {
              console.log(res);
            })
            .catch((e) => console.log("Error : ", e));
        }
      }
      reader.readAsText(file);
    });
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}