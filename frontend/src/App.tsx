import { useState, useEffect } from 'react';
import axios from "axios";
import "./App.scss";
import { FileDropzone } from './components/FileDropzone';
import { IRecord } from './models/record';

const saveRecord = (record: IRecord) => {
  console.log(record);
  axios
    .post("/api/draft", record)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => console.log("Error : ", e));
}

export function App() {
  const [init, setInit] = useState(false);
  const [records, setRecords] = useState<Array<IRecord>>([]);
  const [savedRecords, setSavedRecords] = useState<Array<IRecord>>([]);

  const displayRecords = records.filter(r => !savedRecords.some(sr => sr.Player_ID === r.Player_ID));

  useEffect(() => {
    if (!init) {
      setInit(true);
      axios
        .get("/api/draft")
        .then((response) => {
          console.log(response.data);
          setSavedRecords(response.data.data);
        })
        .catch((e) => {
          console.log("Error : ", e);
          setInit(false);
        });
    }
  }, [init]);

  return (
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
            <h1>Todos</h1>
            <div className="todo-app">
              <FileDropzone loadRecords={setRecords} />
              <ul>
                {savedRecords.map((r, index) => {
                  return(
                    <li key={index}>{r.Player_ID} Saved</li>
                  );
                })}
              </ul>
              <ul>
                {displayRecords.map((r, index) => {
                  return (
                    <li key={index}>
                      <span>{r.Player_ID}</span>
                      <input value={"Save"} type={"button"} onClick={() => saveRecord(r)} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
