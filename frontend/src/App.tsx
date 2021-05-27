import { AppRouter } from "./AppRouter";
import LeftNav from "./components/LeftNav";
import { useAppSelector } from "./reducers/hooks";
import { useEffect } from "react";
import { getLeagues } from "./api/axiosApi";
import { useDispatch } from "react-redux";
import { setLeague, setLeagues } from "./reducers/slices/leagueSlice";
import { ILeague } from "./models/league";
import { LeagueSelect } from "./components/LeagueSelect";

import "./App.scss";

export function App() {
  const league = useAppSelector(state => state.league.league);
  const leagues = useAppSelector(state => state.league.leagues);

  const dispatch = useDispatch();

  useEffect(() => {
    getLeagues((leagues) => dispatch(setLeagues(leagues)));
  }, [dispatch]);

  const onLeagueChange = (league?: ILeague) => {
    if (league) {
      dispatch(setLeague(league));
    }
  }

  return (
    <div className={"fof8-app"}>
      <LeftNav />
      <div className={"main-content"}>
        <div className={"main-header"}>
          <h1>FOF8 Uploader</h1>
          <LeagueSelect
            value={league}
            options={leagues}
            onChange={onLeagueChange}
          />
        </div>
        <AppRouter />
      </div>
    </div>
  );
}
