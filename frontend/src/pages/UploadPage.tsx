import { List, ListItem, ListItemText, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { completeFileHistory, getFileHistories, getLeagues, upsertFileHistory } from "../api/axiosApi";
import { FileUpload } from "../components/FileUpload";
import { IFileHistory } from "../models/fileHistory";
import { ILeague } from "../models/league";

import "./UploadPage.scss";

export function UploadPage() {
    const [league, setLeague] = useState('');
    const [leagues, setLeagues] = useState<Array<ILeague>>([]);
    const [fileHistories, setFileHistories] = useState<Array<IFileHistory>>([]);

    useEffect(() => {
        getLeagues(setLeagues);
    }, []);

    useEffect(() => {
        if (league !== '') {
            getFileHistories(league, setFileHistories);
        }
    }, [league]);

    const addFileHistory = (fileHistory: IFileHistory) => {
        setFileHistories(prev => {
            const index = prev.findIndex(p => p.Name === fileHistory.Name);
            if (index >= 0) {
                let files = [...prev];
                files.splice(index, 1, fileHistory)
                return files;
            } else {
                return [...prev, fileHistory]
            }
        });
    }

    const onFileUpload = (file: File) => {
        const fileHistory: IFileHistory = { LeagueId: league, Name: file.name, UploadDate: new Date(), Completed: false };
        addFileHistory(fileHistory);
        upsertFileHistory(fileHistory);
    }

    const onFileComplete = (file: File) => {
        const fileHistory: IFileHistory = { LeagueId: league, Name: file.name, UploadDate: new Date(), Completed: true };
        addFileHistory(fileHistory);
        completeFileHistory(fileHistory);
    }

    const onChangeLeague = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        setLeague(event.target.value as string);
    };

    return (
        <div className={"upload"}>
            <div className={"header"}>
                <Select
                    label={"League"}
                    labelId={"demo-simple-select-label"}
                    id={"demo-simple-select"}
                    value={league}
                    onChange={onChangeLeague}
                >
                    {leagues.map((l, index) => <MenuItem key={index} value={l._id}>{l.Name}</MenuItem>)}
                </Select>
            </div>
            <div className={"body"}>
                <div>
                    <FileUpload
                        leagueId={league}
                        pointerDisabled={league === ""}
                        title={"Upload 1"}
                        onUpload={onFileUpload}
                        onComplete={onFileComplete} />
                    <FileUpload
                        leagueId={league}
                        pointerDisabled={league === ""}
                        title={"Upload 2"}
                        onUpload={onFileUpload}
                        onComplete={onFileComplete}
                    />
                </div>
                <div>
                    <List>
                        {fileHistories.map((fh, index) => {
                            const date = new Date(fh.UploadDate);
                            return (
                                <ListItem key={index}>
                                    <ListItemText primary={`${fh.Name} - ${fh.Completed ? "Completed" : "Started"}: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`} />
                                </ListItem>);
                        })}
                    </List>
                </div>
            </div>
        </div>
    );
}