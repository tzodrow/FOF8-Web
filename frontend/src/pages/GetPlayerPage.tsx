import { Button, ButtonGroup } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getPlayers } from "../api/axiosApi";
import { PlayerTable } from "../components/PlayerTable";
import { ILeague } from "../models/league";
import { IPlayerInformation } from "../models/player";
import { useAppSelector } from "../reducers/hooks";

export function GetPlayerPage() {
    const league: ILeague | undefined = useAppSelector(state => state.league.league);

    const [players, setPlayers] = useState<Array<IPlayerInformation>>([]);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        if (league?._id) {
            getPlayers(league._id, skip, setPlayers);
        }
    }, [league, skip]);

    return (
        <div>
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