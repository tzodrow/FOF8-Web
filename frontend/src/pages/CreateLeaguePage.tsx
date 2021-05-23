import { Input, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { createLeague } from "../api/axiosApi";

import "./CreateLeaguePage.scss";

export function CreateLeaguePage() {
    const [leagueName, setLeagueName] = useState('');

    const onChangeLeagueName = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setLeagueName(event.target.value as string);
    }

    // TODO: Set Leagues in Redux
    const onClickCreateLeague = () => {
        createLeague({ CreateDate: new Date(), Name: leagueName, Active: true });
    }

    return (
        <form className={"create-league-form"} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="League Name" variant="outlined" value={leagueName} onChange={onChangeLeagueName} />
            <Input type={"button"} value={"Create League"} onClick={onClickCreateLeague} />
        </form>
    );
}