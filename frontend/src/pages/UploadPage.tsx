import { List, ListItem, ListItemText, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { completeFileHistory, getFileHistories, getLeagues, upsertFileHistory } from "../api/axiosApi";
import { FileUpload } from "../components/FileUpload";
import { IFileHistory } from "../models/fileHistory";
import { ILeague } from "../models/league";
import { useAppSelector } from "../reducers/hooks";

import "./UploadPage.scss";

export function UploadPage() {
    const league: ILeague | undefined = useAppSelector(state => state.league.league);
    const [fileHistories, setFileHistories] = useState<Array<IFileHistory>>([]);

    useEffect(() => {
        if (league?._id) {
            getFileHistories(league._id, setFileHistories);
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
        const fileHistory: IFileHistory = { LeagueId: league?._id ? league._id : "", Name: file.name, UploadDate: new Date(), Completed: false };
        addFileHistory(fileHistory);
        upsertFileHistory(fileHistory);
    }

    const onFileComplete = (file: File) => {
        const fileHistory: IFileHistory = { LeagueId: league?._id ? league._id : "", Name: file.name, UploadDate: new Date(), Completed: true };
        addFileHistory(fileHistory);
        completeFileHistory(fileHistory);
    }

    return (
        <div className={"upload"}>
            <div className={"body"}>
                <div>
                    <FileUpload
                        leagueId={league?._id ? league._id : ""}
                        pointerDisabled={league?._id === undefined || league?._id === ""}
                        title={"Upload 1"}
                        onUpload={onFileUpload}
                        onComplete={onFileComplete} />
                    <FileUpload
                        leagueId={league?._id ? league._id : ""}
                        pointerDisabled={league?._id === undefined || league?._id === ""}
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