import { Box, Button, ButtonGroup, FormControl, InputLabel, makeStyles, MenuItem, Select, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getDraftPlayers, getDraftYears } from "../api/axiosApi";
import { DraftTable } from "../components/DraftTable";
import { ScoutingTable } from "../components/ScoutingTable";
import { ILeague } from "../models/league";
import { IDraftPlayer } from "../models/player";
import { useAppSelector } from "../reducers/hooks";

import './DraftPage.scss';

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
                    {/* <Typography>{children}</Typography> */}
                    {children}
                </Box>
            )}
        </div>
    );
}

export function DraftPage() {
    const league: ILeague | undefined = useAppSelector(state => state.league.league);

    const [draftYear, setDraftYear] = useState(0);
    const [draftYears, setDraftYears] = useState<Array<number>>([]);

    const [draftPlayers, setDraftPlayers] = useState<Array<IDraftPlayer>>([]);
    const [skip, setSkip] = useState(0);

    const [tab, setTab] = React.useState(0);

    const classes = useStyles();

    useEffect(() => {
        if (league?._id) {
            getDraftYears(league._id, setDraftYears);
        }
    }, [league])

    useEffect(() => {
        if (league?._id) {
            getDraftPlayers(league._id, skip, "QB", draftYear, setDraftPlayers);
        }
    }, [league, skip, draftYear]);

    const onChangeDraftYear = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setDraftYear(event.target.value as number);
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
                        value={draftYear}
                        onChange={onChangeDraftYear}
                    >
                        {draftYears.map((dy, index) => <MenuItem key={index} value={dy}>{dy}</MenuItem>)}
                    </Select>
                </FormControl>
                <ButtonGroup color="primary">
                    <Button disabled={skip === 0} onClick={() => setSkip(prev => prev - 1)}>Previous</Button>
                    <Button disabled={draftPlayers.length < 25} onClick={() => setSkip(prev => prev + 1)}>Next</Button>
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
                <DraftTable
                    players={draftPlayers}
                />
            </TabPanel>
            <TabPanel value={tab} index={2}>
                <ScoutingTable 
                    players={draftPlayers}
                />
            </TabPanel>
            <TabPanel value={tab} index={3}>
                Analysis
            </TabPanel>
        </div>
    );
}