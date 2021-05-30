import { Box, Button, ButtonGroup, FormControl, InputLabel, makeStyles, MenuItem, Select, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getDraftPlayers, getDraftYears } from "../api/axiosApi";
import { CombineTable } from "../tables/CombineTable";
import { QBScoutingTable } from "../tables/QBScoutingTable";
import { RBScoutingTable } from "../tables/RBScoutingTable";
import { getPositionGroups, PositionGroup } from "../constants/positionGroup";
import { ILeague } from "../models/league";
import { IDraftPlayer } from "../models/player";
import { useAppSelector } from "../reducers/hooks";

import './DraftPage.scss';
import { WRScoutingTable } from "../tables/WRScoutingTable";
import { TEScoutingTable } from "../tables/TEScoutingTable";
import { FBScoutingTable } from "../tables/FBScoutingTable";
import { CScoutingTable } from "../tables/CScoutingTable";
import { GScoutingTable } from "../tables/GScoutingTable";
import { TScoutingTable } from "../tables/TScoutingTable";
import { DEScoutingTable } from "../tables/DEScoutingTable";
import { DTScoutingTable } from "../tables/DTScoutingTable";
import { CBScoutingTable } from "../tables/CBScoutingTable";
import { KScoutingTable } from "../tables/KScoutingTable";
import { OLBScoutingTable } from "../tables/OLBScoutingTable";
import { PScoutingTable } from "../tables/PScoutingTable";
import { ILBScoutingTable } from "../tables/ILBScoutingTable";
import { SScoutingTable } from "../tables/SScoutingTable";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

interface ITabPanelProps {
    value: number;
    index: number;
}

function TabPanel(props: React.PropsWithChildren<ITabPanelProps>) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const scoutingTableRender = (positionGroup: PositionGroup, players: Array<IDraftPlayer>) => {
    switch (positionGroup) {
        case PositionGroup.C:
            return (<CScoutingTable players={players} />);
        case PositionGroup.CB:
            return (<CBScoutingTable players={players} />);
        case PositionGroup.DE:
            return (<DEScoutingTable players={players} />);
        case PositionGroup.DT:
            return (<DTScoutingTable players={players} />);
        case PositionGroup.FB:
            return (<FBScoutingTable players={players} />);
        case PositionGroup.G:
            return (<GScoutingTable players={players} />);
        case PositionGroup.ILB:
            return (<ILBScoutingTable players={players} />);
        case PositionGroup.K:
            return (<KScoutingTable players={players} />);
        case PositionGroup.OLB:
            return (<OLBScoutingTable players={players} />);
        case PositionGroup.P:
            return (<PScoutingTable players={players} />);
        case PositionGroup.QB:
            return (<QBScoutingTable players={players} />);
        case PositionGroup.RB:
            return (<RBScoutingTable players={players} />);
        case PositionGroup.S:
            return (<SScoutingTable players={players} />);
        case PositionGroup.T:
            return (<TScoutingTable players={players} />);
        case PositionGroup.TE: 
            return (<TEScoutingTable players={players} />);
        case PositionGroup.WR:
            return (<WRScoutingTable players={players} />);
        default:
            return <span />;
    }
}

export function DraftPage() {
    const league: ILeague | undefined = useAppSelector(state => state.league.league);

    const [draftYear, setDraftYear] = useState<number | undefined>(undefined);
    const [draftYears, setDraftYears] = useState<Array<number>>([]);

    const [draftPlayers, setDraftPlayers] = useState<Array<IDraftPlayer>>([]);
    const [skip, setSkip] = useState(0);

    const [positionGroup, setPositionGroup] = useState("");
    const [positionGroups, setPositionGroups] = useState<Array<PositionGroup>>([]);

    const [tab, setTab] = React.useState(0);

    const classes = useStyles();

    useEffect(() => {
        setPositionGroups(getPositionGroups());
    }, [])

    useEffect(() => {
        if (league?._id) {
            getDraftYears(league._id, setDraftYears);
        }
    }, [league])

    useEffect(() => {
        if (league?._id && draftYear !== undefined) {
            getDraftPlayers(league._id, skip, positionGroup, draftYear, setDraftPlayers);
        }
    }, [league, skip, draftYear, positionGroup]);

    const onChangeDraftYear = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setDraftYear(event.target.value as number);
    };

    const onChangePositionGroup = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setPositionGroup(event.target.value as string);
        setSkip(0);
    };

    const onChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    return (
        <div>
            <div className={"draft-header"}>
                <FormControl className={classes.formControl}>
                    <InputLabel id={"draft-year-select-label"}>Draft Year</InputLabel>
                    <Select
                        labelId={"draft-year-select-label"}
                        id={"draft-year-select"}
                        value={draftYear !== undefined ? draftYear : ""}
                        onChange={onChangeDraftYear}
                    >
                        {draftYears.map((dy, index) => <MenuItem key={index} value={dy}>{dy ? dy : 'Current'}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id={"position-group-select-label"}>Position Group</InputLabel>
                    <Select
                        labelId={"position-group-select-label"}
                        id={"position-group-select"}
                        value={positionGroup ? positionGroup : ""} 
                        onChange={onChangePositionGroup}
                    >
                        {positionGroups.map((pg, index) => <MenuItem key={index} value={pg}>{pg}</MenuItem>)}
                    </Select>
                </FormControl>
                <ButtonGroup color="primary">
                    <Button disabled={skip === 0} onClick={() => setSkip(prev => prev - 1)}>Previous</Button>
                    <Button disabled={draftPlayers.length < 15} onClick={() => setSkip(prev => prev + 1)}>Next</Button>
                </ButtonGroup>
            </div>
            <Tabs
                value={tab}
                onChange={onChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label={"Draft Board"} />
                <Tab label={"Combine"} />
                <Tab label={"Scouting"} />
                <Tab label={"Analysis"} />
            </Tabs>
            <TabPanel value={tab} index={0}>
                Draft Board
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <CombineTable
                    players={draftPlayers}
                />
            </TabPanel>
            <TabPanel value={tab} index={2}>
                {scoutingTableRender(positionGroup as PositionGroup, draftPlayers)}
            </TabPanel>
            <TabPanel value={tab} index={3}>
                Analysis
            </TabPanel>
        </div>
    );
}