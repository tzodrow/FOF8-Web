import { LinearProgress } from "@material-ui/core";
import { ParseResult, Parser } from "papaparse";
import { useEffect, useRef, useState } from "react";
import { CSVReader } from "react-papaparse";
import { upsertRating, upsertRecord } from "../api/axiosApi";
import { IRecord } from "../models/record";

interface CSVInputRef {
    state: {
        file: File
    }
}

interface IFileUploadProps {
    title: string;
}

export function FileUpload(props: IFileUploadProps) {
    const csvInput = useRef(null);
    const [csvUploaded, setCsvUploaded] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(0);
    const [fileSize, setFileSize] = useState(0);

    useEffect(() => {
        const csvFileSize = (csvInput.current as unknown as CSVInputRef)?.state?.file?.size;
        if (csvFileSize !== undefined && csvUploaded) {
            setDataUploaded(0);
            setFileSize(csvFileSize);
        }
    }, [csvUploaded]);

    const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
        console.error(err);
        setCsvUploaded(false);
    }

    const handleOnRemoveFile = (data: null) => {
        setCsvUploaded(false);
        setFileSize(0);
    }

    const onStep = (result: ParseResult<IRecord>, parser: Parser) => {
        if (result?.data) {
            parser.pause();

            // TODO: Add better way to determine the files being sent in
            if (result.meta.fields?.some(f => f === "Scouting")) {
                upsertRating(
                    result.data,
                    () => {
                        setDataUploaded((prev) => prev + result.meta.cursor);
                        parser.resume();
                    },
                    () => parser.abort());
            } else {
                upsertRecord(
                    result.data,
                    () => {
                        setDataUploaded((prev) => prev + result.meta.cursor);
                        parser.resume();
                    },
                    () => parser.abort());
            }
        }
    }

    const onComplete = (results: ParseResult<any>, file?: any) => {
        setCsvUploaded(false);
    }

    const onBeforeFirstChunk = (chunk: string) => {
        // TODO: Add verification?
        setCsvUploaded(true);
    }

    let value = fileSize > 0 ? (dataUploaded / fileSize) * 100 : 0;

    return (
        <div className={""}>
            <h1>{props.title}</h1>
            <LinearProgress variant="determinate" value={value} />
            <CSVReader
                ref={csvInput}
                onError={handleOnError}
                config={{
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    header: true,
                    beforeFirstChunk: onBeforeFirstChunk,
                    complete: onComplete,
                    step: onStep
                }}
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
                noDrag={csvUploaded}
                noClick={csvUploaded}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
        </div>
    );
}