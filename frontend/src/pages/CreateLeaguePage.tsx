import { Button, Snackbar, TextField } from "@material-ui/core";
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

    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onChangeLeagueName = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setLeagueName(event.target.value as string);
    }

    const onClickCreateLeague = () => {
        createLeague(
            { CreateDate: new Date(), Name: leagueName, Active: true }, 
            (league) => {
                dispatch(setLeagues([...leagues, league]))
                setOpen(true);
            });
    }

    return (
        <form className={"create-league-form"} noValidate autoComplete="off">
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
                message="League Created"
            />
            <TextField id="outlined-basic" label="League Name" variant="outlined" value={leagueName} onChange={onChangeLeagueName} />
            <Button variant="contained" color="primary" onClick={onClickCreateLeague}>
                Create League
            </Button>
        </form>
    );
}