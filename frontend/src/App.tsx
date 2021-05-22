
import { FormControlLabel, Input, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { completeFileHistory, createLeague, getFileHistories, getLeagues, upsertFileHistory } from "./api/axiosApi";
import "./App.scss";
import { FileUpload } from "./components/FileUpload";
import { IFileHistory } from "./models/fileHistory";
import { ILeague } from "./models/league";

export function App() {
  const [leagues, setLeagues] = useState<Array<ILeague>>([]);
  const [fileHistories, setFileHistories] = useState<Array<IFileHistory>>([]);
  const [init, setInit] = useState(true);
  const [league, setLeague] = useState('');
  const [leagueName, setLeagueName] = useState('');

  const handleLeagueSelectChange = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
    setLeague(event.target.value as string);
  };

  const handleLeagueNameChange = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
    setLeagueName(event.target.value as string);
  }

  const handleLeagueCreateClick = () => {
    createLeague({ CreateDate: new Date(), Name: leagueName, Active: true }, (league) => setLeagues(prev => [...prev, league]));
  }

  const handleOnFileUpload = (file: File) => {
    upsertFileHistory({ LeagueId: league, Name: file.name, UploadDate: new Date(), Completed: false });
  }
  
  const handleOnFileComplete = (file: File) => {
    completeFileHistory({ LeagueId: league, Name: file.name, UploadDate: new Date(), Completed: true });
  }

  useEffect(() => {
    if (init) {
      getLeagues(setLeagues);
      setInit(false);
    }
  }, [init]);

  useEffect(() => {
    if (league !== '') {
      getFileHistories(league, setFileHistories);
    }
  }, [league]);

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
                value={league}
                onChange={handleLeagueSelectChange}
              >
                {leagues.map((l, index) => <MenuItem key={index} value={l._id}>{l.Name}</MenuItem>)}
              </Select>
            </div>
            <div className="fof8-app">
              <FileUpload 
                leagueId={league}
                title={"Player Record"} 
                onUpload={handleOnFileUpload} 
                onComplete={handleOnFileComplete} />
              <FileUpload 
                leagueId={league}
                title={"Player Ratings"} 
                onUpload={handleOnFileUpload} 
                onComplete={handleOnFileComplete} 
              />
            </div>
            <div>
              <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={leagueName} onChange={handleLeagueNameChange}/>
                <Input type={"button"} value={"Create League"} onClick={() => handleLeagueCreateClick()} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
