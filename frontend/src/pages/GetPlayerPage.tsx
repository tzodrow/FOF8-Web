import { Button, ButtonGroup, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getLeagues, getPlayers } from "../api/axiosApi";
import { PlayerTable } from "../components/PlayerTable";
import { ILeague } from "../models/league";
import { IPlayerInformation } from "../models/player";

export function GetPlayerPage() {
    const [league, setLeague] = useState('');
    const [leagues, setLeagues] = useState<Array<ILeague>>([]);
    const [players, setPlayers] = useState<Array<IPlayerInformation>>([]);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        getLeagues(setLeagues);
    }, []);

    useEffect(() => {
        if (league !== '') {
            getPlayers(league, skip, setPlayers);
        }
    }, [league, skip]);

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
            <ButtonGroup color="primary">
                <Button disabled={skip === 0} onClick={() => setSkip(prev => prev - 1)}>Previous</Button>
                <Button onClick={() => setSkip(prev => prev + 1)}>Next</Button>
            </ButtonGroup>
            <PlayerTable 
                players={players}
            />
        </div>
    );
}