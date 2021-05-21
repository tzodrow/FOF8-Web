
import { useEffect, useState } from "react";
import { createLeague, getFileHistories, getLeagues, upsertFileHistory } from "./api/axiosApi";
import "./App.scss";
import { FileUpload } from "./components/FileUpload";
import { IFileHistory } from "./models/fileHistory";
import { ILeague } from "./models/league";

export function App() {
  const [leagues, setLeagues] = useState<Array<ILeague>>([]);
  const [fileHistories, setFileHistories] = useState<Array<IFileHistory>>([]);
  const [init, setInit] = useState(true);

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
            <div className="fof8-app">
              <FileUpload title={"Player Record"}/>
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
