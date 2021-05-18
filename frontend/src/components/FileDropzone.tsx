import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { readString } from "react-papaparse";
import { IRecord } from "../models/record";

interface IFileDropzoneProps {
  loadRecords: (records: Array<IRecord>) => void;
}

export function FileDropzone(props: IFileDropzoneProps) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: Blob & File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result as string;
        const results = readString(binaryStr, {
          header: true
        });
        if (file.name === "draft_personal.csv") {
          const data: Array<IRecord> = results.data.map(d => d as IRecord);
          props.loadRecords(data);
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