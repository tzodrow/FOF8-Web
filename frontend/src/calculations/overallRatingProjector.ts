import { IDraftPlayer } from "../models/player";
import { avg } from "./average";

// QB:
const ScreenPassesValue = 20;
const ShortPassesValue = 19;
const MediumPassesValue = 22;
const LongPassesValue = 22;
const DeepPassesValue = 15;
const ThirdDownPassingValue = 24;
const AccuracyValue = 23;
const TimingValue = 0;
const SenseRushValue = 8;
const ReadDefenseValue = 11;
const TwoMinuteOffenseValue = 7;
const ScrambleFrequencyValue = 0;
const KickHoldingValue = 0;

const QBTotal = 
    ScreenPassesValue 
    + ShortPassesValue 
    + MediumPassesValue 
    + LongPassesValue
    + DeepPassesValue
    + ThirdDownPassingValue
    + AccuracyValue
    + TimingValue
    + SenseRushValue
    + ReadDefenseValue
    + TwoMinuteOffenseValue
    + ScrambleFrequencyValue
    + KickHoldingValue;

// Running Back:
// newWeightInput.Attributes[0] = 5; //"Breakaway Speed (Ft80)",
// newWeightInput.Attributes[1] = 5; //"Power Inside (Bp100)",
// newWeightInput.Attributes[2] = 8; //"Third Down Running (Ag33)",
// newWeightInput.Attributes[3] = 25; //"Hole Recognition (So90)",
// newWeightInput.Attributes[4] = 8; //"Elusiveness (Ag33)",
// newWeightInput.Attributes[5] = 5; //"Speed to Outside (Bj50/Ft20)",
// newWeightInput.Attributes[6] = 6; //"Blitz Pickup (PD90)",
// newWeightInput.Attributes[7] = 6; //"Avoid Drops",
// newWeightInput.Attributes[8] = 2; //"Getting Downfield (Ag33)",
// newWeightInput.Attributes[9] = 6; //"Route Running",
// newWeightInput.Attributes[10] = 2; //"Third Down Catching (PD05)",
// newWeightInput.Attributes[11] = 1; //"Punt Returns",
// newWeightInput.Attributes[12] = 1; //"Kick Returns",
// newWeightInput.Attributes[13] = 15; //"Endurance (Bj50)",
// newWeightInput.Attributes[14] = 2;//"Special Teams"

// FB:

// newWeightInput.Attributes[0] = 22; //"Run Blocking (Bj50)",
// newWeightInput.Attributes[1] = 5; //"Pass Blocking",
// newWeightInput.Attributes[2] = 3; //"Blocking Strength",
// newWeightInput.Attributes[3] = 9;//"Power Inside (Bp100)",
// newWeightInput.Attributes[4] = 7; //"Third Down Running (Ag33Bj50)",
// newWeightInput.Attributes[5] = 14; //"Hole Recognition (So50)",
// newWeightInput.Attributes[6] = 12; //"Blitz Pickup (PD50)",
// newWeightInput.Attributes[7] = 6; //"Avoid Drops",
// newWeightInput.Attributes[8] = 8; //"Route Running (PD50)",
// newWeightInput.Attributes[9] = 3; //"Third Down Catching",
// newWeightInput.Attributes[10] = 5; //"Endurance",
// newWeightInput.Attributes[11] = 2;//"Special Teams"

// TE:

// newWeightInput.Attributes[0] = 24; //"Run Blocking (Bj50)",
// newWeightInput.Attributes[1] = 20; //"Pass Blocking",
// newWeightInput.Attributes[2] = 15; //"Blocking Strength (Bp100)",
// newWeightInput.Attributes[3] = 12; //"Avoid Drops (PD50)",
// newWeightInput.Attributes[4] = 12; //"Getting Downfield (Ft50Ag100)",
// newWeightInput.Attributes[5] = 25; //"Route Running (So50)",
// newWeightInput.Attributes[6] = 18; //"Third Down Catching (Bj50)",
// newWeightInput.Attributes[7] = 3; //"Big Play Receiving (Ft50)",
// newWeightInput.Attributes[8] = 5; //"Courage",
// newWeightInput.Attributes[9] = 4; //"Adjust to Ball (PD50)",
// newWeightInput.Attributes[10] = 8; //"Endurance",
// newWeightInput.Attributes[11] = 1; //"Special Teams",
// newWeightInput.Attributes[12] = 0;//"Long Snapping"

// WR:

// newWeightInput.Attributes[0] = 10; //"Avoid Drops (PD65)",
// newWeightInput.Attributes[1] = 16; //"Getting Downfield (Ag100)",
// newWeightInput.Attributes[2] = 24; //"Route Running (So50)",
// newWeightInput.Attributes[3] = 13; //"Third Down Catching",
// newWeightInput.Attributes[4] = 8; //"Big Play Receiving (Ft70)",
// newWeightInput.Attributes[5] = 6; //"Courage (Bp100)",
// newWeightInput.Attributes[6] = 5; //"Adjust to Ball (PD35)",
// newWeightInput.Attributes[7] = 5; //"Punt Returns (Bj50)",
// newWeightInput.Attributes[8] = 5; //"Kick Returns (Bj50)",
// newWeightInput.Attributes[9] = 4; //"Endurance",
// newWeightInput.Attributes[10] = 1; //"Special Teams"

// C:

// newWeightInput.Attributes[0] = 24; //"Run Blocking (Ft100)",
// newWeightInput.Attributes[1] = 17; //"Pass Blocking (Ag100)",
// newWeightInput.Attributes[2] = 12;//"Blocking Strength (Bp100)",
// newWeightInput.Attributes[3] = 7; //"Endurance (Bj100)",
// newWeightInput.Attributes[4] = 0; //"Long Snapping"

// G:

// newWeightInput.Attributes[0] = 24; //"Run Blocking (Ft100)",
// newWeightInput.Attributes[1] = 15; //"Pass Blocking (Ag100)",
// newWeightInput.Attributes[2] = 13;//"Blocking Strength (Bp100)",
// newWeightInput.Attributes[3] = 7; //"Endurance (Bj100)",

// T:

// newWeightInput.Attributes[0] = 24; //"Run Blocking (Ft100)",
// newWeightInput.Attributes[1] = 23; //"Pass Blocking (Ag100)",
// newWeightInput.Attributes[2] = 13;//"Blocking Strength (Bp100)",
// newWeightInput.Attributes[3] = 8; //"Endurance (Bj100)",

// P:

// newWeightInput.Attributes[0] = 25; //"Kicking Power (Ft100)",
// newWeightInput.Attributes[1] = 12; //"Punt Hang Time (Bp100)",
// newWeightInput.Attributes[2] = 8; //"Directional Punting (So50)",
// newWeightInput.Attributes[3] = 0; //"Kick Holding"

// K:

// newWeightInput.Attributes[0] = 25; //"Kicking Accuracy (So50)",
// newWeightInput.Attributes[1] = 14; //"Kicking Power (Bp100Bj50)",
// newWeightInput.Attributes[2] = 3; //"Kickoff Distance (Ft100)",
// newWeightInput.Attributes[3] = 2; //"Kickoff Hang Time (Bj50)"

// DE:

// newWeightInput.Attributes[0] = 25; //"Run Defense (Ag100)",
// newWeightInput.Attributes[1] = 18; //"Pass Rush Technique (Ft100)",
// newWeightInput.Attributes[2] = 16;//"Pass Rush Strength (Bp50)",
// newWeightInput.Attributes[3] = 6; //"Play Diagnosis (So50)",
// newWeightInput.Attributes[4] = 3; //"Punishing Hitter (Bp50)",
// newWeightInput.Attributes[5] = 6; //"Endurance (Bj100)"

// DT:

// newWeightInput.Attributes[0] = 25; //"Run Defense (Ag100)",
// newWeightInput.Attributes[1] = 10; //"Pass Rush Technique (Ft100)",
// newWeightInput.Attributes[2] = 13;//"Pass Rush Strength (Bp50)",
// newWeightInput.Attributes[3] = 4; //"Play Diagnosis (So50)",
// newWeightInput.Attributes[4] = 2; //"Punishing Hitter (Bp50)",
// newWeightInput.Attributes[5] = 6; //"Endurance (Bj100)"

// ILB:

// newWeightInput.Attributes[0] = 25; //"Run Defense (Ag100)",
// newWeightInput.Attributes[1] = 5; //"Pass Rush Technique (Ft100)",
// newWeightInput.Attributes[2] = 8; //"Man-to-Man Defense (Bj100)",
// newWeightInput.Attributes[3] = 8; //"Zone Defense (PD50)",
// newWeightInput.Attributes[4] = 8; //"Bump and Run Defense (Bp33)",
// newWeightInput.Attributes[5] = 2; //"Pass Rush Strength (Bp33)",
// newWeightInput.Attributes[6] = 8; //"Play Diagnosis (So50)",
// newWeightInput.Attributes[7] = 4; //"Punishing Hitter (Bp33)",
// newWeightInput.Attributes[8] = 4; //"Endurance",
// newWeightInput.Attributes[9] = 1; //"Special Teams"

// OLB:

// newWeightInput.Attributes[0] = 25; //"Run Defense (Ag100)",
// newWeightInput.Attributes[1] = 8; //"Pass Rush Technique (Ft100)",
// newWeightInput.Attributes[2] = 10; //"Man-to-Man Defense (Bj100)",
// newWeightInput.Attributes[3] = 10; //"Zone Defense (PD50)",
// newWeightInput.Attributes[4] = 10; //"Bump and Run Defense (Bp33)",
// newWeightInput.Attributes[5] = 2; //"Pass Rush Strength (Bp33)",
// newWeightInput.Attributes[6] = 8; //"Play Diagnosis (So50)",
// newWeightInput.Attributes[7] = 4; //"Punishing Hitter (Bp33)",
// newWeightInput.Attributes[8] = 4; //"Endurance",
// newWeightInput.Attributes[9] = 1; //"Special Teams"

// CB:

// newWeightInput.Attributes[0] = 16; //"Run Defense (Ag100)",
// newWeightInput.Attributes[1] = 24; //"Man-to-Man Defense (Ft50)",
// newWeightInput.Attributes[2] = 22; //"Zone Defense (Ft50PD50)",
// newWeightInput.Attributes[3] = 24; //"Bump and Run Defense (Bp50)",
// newWeightInput.Attributes[4] = 8; //"Play Diagnosis (So50)",
// newWeightInput.Attributes[5] = 2; //"Punishing Hitter (Bp50)",
// newWeightInput.Attributes[6] = 9; //"Interceptions (PD50)",
// newWeightInput.Attributes[7] = 1; //"Punt Returns (Bj50)",
// newWeightInput.Attributes[8] = 1; //"Kick Returns (Bj50)",
// newWeightInput.Attributes[9] = 5; //"Endurance",
// newWeightInput.Attributes[10] = 1;//"Special Teams"

// S:

// newWeightInput.Attributes[0] = 25; //"Run Defense (Ag100)",
// newWeightInput.Attributes[1] = 11; //"Man-to-Man Defense (Ft50)",
// newWeightInput.Attributes[2] = 11; //"Zone Defense (Ft50PD50)",
// newWeightInput.Attributes[3] = 11; //"Bump and Run Defense (Bp50)",
// newWeightInput.Attributes[4] = 9; //"Play Diagnosis (So50)",
// newWeightInput.Attributes[5] = 3; //"Punishing Hitter (Bp50)",
// newWeightInput.Attributes[6] = 7; //"Interceptions (PD50)",
// newWeightInput.Attributes[7] = 1; //"Punt Returns (Bj50)",
// newWeightInput.Attributes[8] = 1; //"Kick Returns (Bj50)",
// newWeightInput.Attributes[9] = 4; //"Endurance",
// newWeightInput.Attributes[10] = 1;//"Special Teams"


export function overallProjectionQB(player: IDraftPlayer) {
    let proj = avg(player.Low_Screen_Passes, player.High_Screen_Passes) * (ScreenPassesValue / QBTotal);
    proj += avg(player.Low_Short_Passes, player.High_Short_Passes) * (ShortPassesValue / QBTotal);
    proj += avg(player.Low_Medium_Passes, player.High_Medium_Passes) * (MediumPassesValue / QBTotal);
    proj += avg(player.Low_Long_Passes, player.High_Long_Passes) * (LongPassesValue / QBTotal);
    proj += avg(player.Low_Deep_Passes, player.High_Deep_Passes) * (DeepPassesValue / QBTotal);
    proj += avg(player.Low_Third_Down, player.High_Third_Down) * (ThirdDownPassingValue / QBTotal);
    proj += avg(player.Low_Accuracy, player.High_Accuracy) * (AccuracyValue / QBTotal);
    proj += avg(player.Low_Timing, player.High_Timing) * (TimingValue / QBTotal);
    proj += avg(player.Low_Sense_Rush, player.High_Sense_Rush) * (SenseRushValue / QBTotal);
    proj += avg(player.Low_Read_Defense, player.High_Read_Defense) * (ReadDefenseValue / QBTotal);
    proj += avg(player["Low_Two-Minute_Offense"], player["High_Two-Minute_Offense"]) * (TwoMinuteOffenseValue / QBTotal);
    proj += avg(player.Low_Run_Frequency, player.High_Run_Frequency) * (ScrambleFrequencyValue / QBTotal);
    proj += avg(player.Low_Kick_Holding, player.High_Kick_Holding) * (KickHoldingValue / QBTotal);

    return proj;
}