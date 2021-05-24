import { IRecord } from "./record";

export interface IPlayer extends IRecord {
    First_Name: string;
    Last_Name: string;
    
    College: string | number;
    Height: number;
    Weight: number;
}

export interface IDraftPlayer extends IPlayer {
    Agility: number;
    Dash: number;
    Position_Group: string;
    Grade: number;
    Jump: number;
    Position_Specific: number;
    Solecismic: number;
    Strength: number;
}

export interface IPlayerInformation extends IPlayer {
    Position: string;
}