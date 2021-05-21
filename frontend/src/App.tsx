
import { MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { createLeague, getFileHistories, getLeagues, upsertFileHistory } from "./api/axiosApi";
import "./App.scss";
import { FileUpload } from "./components/FileUpload";
import { IFileHistory } from "./models/fileHistory";
import { ILeague } from "./models/league";

export function App() {
  const [leagues, setLeagues] = useState<Array<ILeague>>([]);
  const [fileHistories, setFileHistories] = useState<Array<IFileHistory>>([]);
  const [init, setInit] = useState(true);
  const [age, setAge] = useState('');

  const handleChange = (event: React.ChangeEvent<{ name?: string, value: unknown}>) => {
    setAge(event.target.value as string);
  };

  useEffect(() => {
    if (init) {
      getLeagues(setLeagues);
      getFileHistories(setFileHistories);
      setInit(false);
    }
  }, [init]);

  console.log(leagues);
  console.log(fileHistories);

  return (
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
            <h1>FOF8 Uploader</h1>
            <div>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
            <div className="fof8-app">
              <FileUpload title={"Player Record"} />
              <FileUpload title={"Player Ratings"} />
              <input type={"button"} value={"Create League"} onClick={() => createLeague({ CreateDate: new Date(), Name: "Test League", Active: true })} />
              <input type={"button"} value={"Create File History"} onClick={() => upsertFileHistory({ LeagueId: leagues.length > 0 && leagues[0]._id ? leagues[0]._id : "", Name: "Test History", UploadDate: new Date(), Completed: false })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
