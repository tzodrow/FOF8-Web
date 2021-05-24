import { Button, ButtonGroup, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getDraftYears, getLeagues, getPlayers } from "../api/axiosApi";
import { DraftTable } from "../components/DraftTable";
import { PlayerTable } from "../components/PlayerTable";
import { ILeague } from "../models/league";
import { IDraftPlayer, IPlayerInformation } from "../models/player";

export function GetPlayerPage() {
    const [league, setLeague] = useState('');
    const [leagues, setLeagues] = useState<Array<ILeague>>([]);

    const [draftYear, setDraftYear] = useState(0);
    const [draftYears, setDraftYears] = useState<Array<number>>([]);

    const [players, setPlayers] = useState<Array<IPlayerInformation>>([]);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        getLeagues(setLeagues);
    }, []);

    useEffect(() => {
        if (league !== '') {
            getDraftYears(league, setDraftYears);
        }
    }, [league])

    useEffect(() => {
        if (league !== '') {
            getPlayers(league, skip, setPlayers);
        }
    }, [league, skip]);

    const onChangeLeague = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setLeague(event.target.value as string);
    };

    const onChangeDraftYear = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setDraftYear(event.target.value as number);
    };

    return (
        <div>
            <Select
                label={"League"}
                labelId={"league-select-label"}
                id={"league-select"}
                value={league}
                onChange={onChangeLeague}
            >
                {leagues.map((l, index) => <MenuItem key={index} value={l._id}>{l.Name}</MenuItem>)}
            </Select>
            <Select
                label={"Draft Year"}
                labelId={"draft-year-select-label"}
                id={"draft-year-select"}
                value={draftYear}
                onChange={onChangeDraftYear}
            >
                {draftYears.map((dy, index) => <MenuItem key={index} value={dy}>{dy}</MenuItem>)}
            </Select>
            <ButtonGroup color="primary">
                <Button disabled={skip === 0} onClick={() => setSkip(prev => prev - 1)}>Previous</Button>
                <Button onClick={() => setSkip(prev => prev + 1)}>Next</Button>
            </ButtonGroup>
            <PlayerTable 
                players={players}
            />
            <DraftTable 
                players={players as unknown as Array<IDraftPlayer>}
            />
        </div>
    );
}