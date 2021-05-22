import { AppRouter } from "./AppRouter";

import "./App.scss";
import LeftNav from "./components/LeftNav";

export function App() {
  return (
    <div className={"fof8-app"}>
      <LeftNav />
      <div className={"main-content"}>
        <h1>FOF8 Uploader</h1>
        <AppRouter />
      </div>
    </div>
  );
}
