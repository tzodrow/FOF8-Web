import * as rax from 'retry-axios';
import axios, { AxiosResponse } from "axios";
import "./App.scss";
import { IRecord } from './models/record';
import { CSVReader } from 'react-papaparse';
import { Parser, ParseResult } from 'papaparse';
import { useEffect, useRef, useState } from 'react';
import { LinearProgress } from '@material-ui/core';

const myAxiosInstance = axios.create();
myAxiosInstance.defaults.raxConfig = {
  instance: myAxiosInstance,
  retry: 3,
  noResponseRetries: 4,
  backoffType: 'exponential',
  statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
  httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
  onRetryAttempt: err => {
    const cfg = rax.getConfig(err);
    console.log(`Retry attempt #${cfg?.currentRetryAttempt}`);
  }
};
const interceptorId = rax.attach(myAxiosInstance);

const upsertRecord = (record: IRecord | Array<IRecord>, successCallback?: (res: AxiosResponse<any>) => void, failureCallback?: () => void) => {
  myAxiosInstance
    .put("/api/player/upsert", record)
    .then((res) => {
      if (successCallback) {
        successCallback(res);
      }
    })
    .catch((e) => {
      console.error("Error : ", e);
      if (failureCallback) {
        failureCallback();
      }
    });
}

const upsertRating = (record: IRecord | Array<IRecord>, successCallback?: (res: AxiosResponse<any>) => void, failureCallback?: () => void) => {
  myAxiosInstance
    .put("/api/player/upsertRating", record)
    .then((res) => {
      if (successCallback) {
        successCallback(res);
      }
    })
    .catch((e) => {
      console.error("Error : ", e);
      if (failureCallback) {
        failureCallback();
      }
    });
}

interface CSVInputRef {
  state: {
    file: File
  }
}

export function App() {
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
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
            <h1>FOF8 Uploader</h1>
            <div className="fof8-app">
              <LinearProgress variant="determinate" value={value} />
              <CSVReader
                ref={csvInput}
                key={"testing"}
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
              >
                <span>Drop CSV file here or click to upload.</span>
              </CSVReader>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
