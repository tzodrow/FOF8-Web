
import { createLeague } from "./api/axiosApi";
import "./App.scss";
import { FileUpload } from "./components/FileUpload";

export function App() {
  return (
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
            <h1>FOF8 Uploader</h1>
            <div className="fof8-app">
              <FileUpload title={"Player Record"}/>
              <FileUpload title={"Player Ratings"} />
              <input type={"button"} value={"Create League"} onClick={() => createLeague()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
