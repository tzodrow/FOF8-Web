import * as rax from 'retry-axios';
import axios from "axios";
import "./App.scss";
import { IRecord } from './models/record';
import { CSVReader } from 'react-papaparse';
import { Parser, ParseResult } from 'papaparse';

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

const upsertRecord = (record: IRecord | Array<IRecord>, successCallback?: () => void, failureCallback?: () => void) => {
  myAxiosInstance
    .put("/api/player/upsert", record)
    .then((res) => {
      if (successCallback) {
        successCallback();
      }
    })
    .catch((e) => {
      console.log("Error : ", e);
      if (failureCallback) {
        failureCallback();
      }
    });
}

export function App() {

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data: null) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const onStep = (result: ParseResult<IRecord>, parser: Parser) => {
    if (result?.data) {
      parser.pause();
      upsertRecord(result.data, () => parser.resume(), () => parser.abort());
    }
  }

  const onComplete = (results: ParseResult<any>, file?: any) => {
    console.log(results);
    console.log(file);
  }

  return (
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
            <h1>FOF8 Uploader</h1>
            <div className="fof8-app">
              <CSVReader
                onError={handleOnError}
                style={{}}
                config={{
                  header: true,
                  dynamicTyping: true,
                  step: onStep,
                  complete: onComplete,
                  skipEmptyLines: true
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
