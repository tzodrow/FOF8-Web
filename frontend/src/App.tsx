import { useState, useEffect } from 'react';
import axios from "axios";
import "./App.scss";
import { FileDropzone } from './components/FileDropzone';
import { IRecord } from './models/record';
const getRecords = (successCallback?: (data: any) => void, failureCallback?: () => void) => {
  axios
    .get("/api/draft")
    .then((response) => {
      console.log(response.data);
      if (successCallback) {
        successCallback(response.data);
      }
    })
    .catch((e) => {
      console.log("Error : ", e);
      if (failureCallback) {
        failureCallback();
      }
    });
}

const saveRecord = (record: IRecord, successCallback?: () => void, failureCallback?: () => void) => {
  axios
    .post("/api/draft", record)
    .then((res) => {
      console.log(res);
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

const saveRecords = (records: Array<IRecord>, successCallback?: () => void, failureCallback?: () => void) => {
  axios
    .post("/api/draftmany", records)
    .then((res) => {
      console.log(res);
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
  const [init, setInit] = useState(false);
  const [records, setRecords] = useState<Array<IRecord>>([]);
  const [savedRecords, setSavedRecords] = useState<Array<IRecord>>([]);
  const [insertManyCount, setInsertManyCount] = useState("10");

  let displayRecords = records.filter(r => !savedRecords.some(sr => Number(sr.Player_ID) === Number(r.Player_ID)) && r.Player_ID);

  useEffect(() => {
    if (!init) {
      setInit(true);

      getRecords(
        (data) => setSavedRecords(data.data),
        () => setInit(false));
    }
  }, [init]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setInsertManyCount(newValue);
  }

  const onClick = () => {
    const recordCount = Number(insertManyCount);
    if (!isNaN(recordCount)) {
      const records = displayRecords.splice(0, recordCount);
      saveRecords(records, () => setSavedRecords([...savedRecords, ...records]));
    }
  }

  return (
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
            <h1>FOF8 Uploader</h1>
            <div className="fof8-app">
              <FileDropzone loadRecords={setRecords} />
              <div>
                <input type={"text"} value={insertManyCount} onChange={onChange} />
                <input type={"button"} value={"Insert Many"} onClick={onClick} />
              </div>
              <div className={"record-container"}>
                <ul>
                  {savedRecords.map((r, index) => {
                    return (
                      <li key={index}>{r.Player_ID} Saved</li>
                    );
                  })}
                </ul>
                <ul>
                  {displayRecords.map((r, index) => {
                    return (
                      <li key={index}>
                        <span>{r.Player_ID}</span>
                        <input value={"Save"} type={"button"} onClick={() => saveRecord(r, () => setSavedRecords([...savedRecords, r]))} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
