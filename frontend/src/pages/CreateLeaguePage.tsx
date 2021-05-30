import { Input, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createLeague } from "../api/axiosApi";
import { ILeague } from "../models/league";
import { useAppSelector } from "../reducers/hooks";
import { setLeagues } from "../reducers/slices/leagueSlice";

import "./CreateLeaguePage.scss";

export function CreateLeaguePage() {
    const [leagueName, setLeagueName] = useState('');
    const leagues: Array<ILeague> = useAppSelector(state => state.league.leagues);
    const dispatch = useDispatch();

    const onChangeLeagueName = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setLeagueName(event.target.value as string);
    }
    
    const onClickCreateLeague = () => {
        createLeague({ CreateDate: new Date(), Name: leagueName, Active: true }, (league) => dispatch(setLeagues([...leagues, league])));
    }

    return (
        <form className={"create-league-form"} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="League Name" variant="outlined" value={leagueName} onChange={onChangeLeagueName} />
            <Input type={"button"} value={"Create League"} onClick={onClickCreateLeague} />
        </form>
    );
}