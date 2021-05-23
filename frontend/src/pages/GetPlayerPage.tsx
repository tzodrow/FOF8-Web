import { List, ListItem, ListItemText, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getLeagues, getPlayers } from "../api/axiosApi";
import { ILeague } from "../models/league";
import { IRecord } from "../models/record";

export function GetPlayerPage() {
    const [league, setLeague] = useState('');
    const [leagues, setLeagues] = useState<Array<ILeague>>([]);
    const [players, setPlayers] = useState<Array<IRecord>>([]);

    useEffect(() => {
        getLeagues(setLeagues);
    }, []);

    useEffect(() => {
        if (league !== '') {
            getPlayers(league, setPlayers);
        }
    }, [league]);

    const onChangeLeague = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setLeague(event.target.value as string);
    };

    return (
        <div>
            <Select
                label={"League"}
                labelId={"demo-simple-select-label"}
                id={"demo-simple-select"}
                value={league}
                onChange={onChangeLeague}
            >
                {leagues.map((l, index) => <MenuItem key={index} value={l._id}>{l.Name}</MenuItem>)}
            </Select>
            <List>
                {players.map(p => {
                    return (
                        <ListItem key={p.Player_ID}>
                            <ListItemText primary={`${p.Player_ID} - ${p.LeagueId}`} />
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}