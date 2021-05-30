import { AppRouter } from "./AppRouter";
import { useAppSelector } from "./reducers/hooks";
import React, { useEffect } from "react";
import { getLeagues } from "./api/axiosApi";
import { useDispatch } from "react-redux";
import { setLeague, setLeagues } from "./reducers/slices/leagueSlice";
import { ILeague } from "./models/league";
import { LeagueSelect } from "./components/LeagueSelect";
import clsx from 'clsx';
import { IconButton, makeStyles } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import LeftNav from "./components/LeftNav";

import "./App.scss";


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  }
}));

export function App() {
  const classes = useStyles();

  const league = useAppSelector(state => state.league.league);
  const leagues = useAppSelector(state => state.league.leagues);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getLeagues((leagues) => dispatch(setLeagues(leagues)));
  }, [dispatch]);

  const onLeagueChange = (league?: ILeague) => {
    if (league) {
      dispatch(setLeague(league));
    }
  }

  const handleDrawerOpen = () => {
      setOpen(true);
  };

  const handleDrawerClose = () => {
      setOpen(false);
  };

  return (
    <div className={"fof8-app"}>
      <LeftNav open={open} handleDrawerClose={handleDrawerClose} />
      <div className={"main-content"}>
        <div className={"main-header"}>
          <div className={"icon-header"}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <h1>FOF8 Uploader</h1>
          </div>
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
