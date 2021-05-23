import { Route, Switch } from "react-router";
import { CreateLeaguePage } from "./pages/CreateLeaguePage";
import { GetPlayerPage } from "./pages/GetPlayerPage";
import { UploadPage } from "./pages/UploadPage";

export function AppRouter() {
    return (
        <Switch>
          <Route path={"/createLeague"} render={() => <CreateLeaguePage />} />
          <Route path={"/upload"} render={() => <UploadPage />} />
          <Route path={"/players"} render={() => <GetPlayerPage />} />
          <Route path={"/"}>
            <div>Welcome!</div>
          </Route>
        </Switch>
    );
}