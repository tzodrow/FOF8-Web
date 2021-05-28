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

// RB:
const BreakawaySpeedRB = 5;
const PowerInsideRB = 5;
const ThirdDownRunningRB = 8;
const HoleRecognitionRB = 25;
const ElusivenessRB = 8;
const SpeedToOutsideRB = 5;
const BlitzPickupRB = 6;
const AvoidDropsRB = 6;
const GettingDownFieldRB = 2;
const RouteRunningRB = 6;
const ThirdDownCatchingRB = 2;
const PuntReturnsRB = 1;
const KickReturnsRB = 1;
const EnduranceRB = 15;
const SpecialTeamsRB = 2;

const RBTotal = 
    BreakawaySpeedRB
    + PowerInsideRB
    + ThirdDownRunningRB
    + HoleRecognitionRB
    + ElusivenessRB
    + SpeedToOutsideRB
    + BlitzPickupRB
    + AvoidDropsRB
    + GettingDownFieldRB
    + RouteRunningRB
    + ThirdDownCatchingRB
    + PuntReturnsRB
    + KickReturnsRB
    + EnduranceRB
    + SpecialTeamsRB;

// FB:
const RunBlockingFB = 22;
const PassBlockingFB = 5;
const BlockingStrengthFB = 3;
const PowerInsideFB = 9;
const ThirdDownRunningFB = 7;
const HoleRecognitionFB = 14;
const BlitzPickupFB = 12;
const AvoidDropsFB = 6;
const RouteRunningFB = 8;
const ThirdDownCatchingFB = 3;
const EnduranceFB = 5;
const SpecialTeamsFB = 2;

const FBTotal =
    RunBlockingFB
    + PassBlockingFB
    + BlockingStrengthFB
    + PowerInsideFB
    + ThirdDownRunningFB
    + HoleRecognitionFB
    + BlitzPickupFB
    + AvoidDropsFB
    + RouteRunningFB
    + ThirdDownCatchingFB
    + EnduranceFB
    + SpecialTeamsFB;

// TE:

const RunBlockingTE = 24;
const PassBlockingTE = 20;
const BlockingStrengthTE = 15;
const AvoidDropsTE = 12;
const GettingDownFieldTE = 12;
const RouteRunningTE = 25;
const ThirdDownCatchingTE = 18;
const BigPlayReceivingTE = 3;
const CourageTE = 5;
const AdjustToBallTE = 4;
const EnduranceTE = 8;
const SpecialTeamsTE = 1;
const LongSnappingTE = 0;

const TETotal = 
    RunBlockingTE
    + PassBlockingTE
    + BlockingStrengthTE
    + AvoidDropsTE
    + GettingDownFieldTE
    + RouteRunningTE
    + ThirdDownCatchingTE
    + BigPlayReceivingTE
    + CourageTE
    + AdjustToBallTE
    + EnduranceTE
    + SpecialTeamsTE
    + LongSnappingTE;

// WR:

const AvoidDropsWR = 10;
const GettingDownFieldWR = 16;
const RouteRunningWR = 25; // 24
const ThirdDownCatchingWR = 13;
const BigPlayReceivingWR = 25; // 8
const CourageWR = 6;
const AdjustToBallWR = 5;
const PuntReturnsWR = 1; // 5
const KickReturnsWR = 1; // 5
const EnduranceWR = 4;
const SpecialTeamsWR = 1;

const WRTotal = 
    AvoidDropsWR
    + GettingDownFieldWR
    + RouteRunningWR
    + ThirdDownCatchingWR
    + BigPlayReceivingWR
    + CourageWR
    + AdjustToBallWR
    + PuntReturnsWR
    + KickReturnsWR
    + EnduranceWR
    + SpecialTeamsWR;

// C:

const RunBlockingC = 24;
const PassBlockingC = 17;
const BlockingStrengthC = 12;
const EnduranceC = 7;
const LongSnappingC = 0;

const CTotal = 
    RunBlockingC
    + PassBlockingC
    + BlockingStrengthC
    + EnduranceC
    + LongSnappingC;

// G:

const RunBlockingG = 24;
const PassBlockingG = 15;
const BlockingStrengthG = 13;
const EnduranceG = 7;

const GTotal = 
    RunBlockingG
    + PassBlockingG
    + BlockingStrengthG
    + EnduranceG;

// T:

const RunBlockingT = 24;
const PassBlockingT = 23;
const BlockingStrengthT = 13;
const EnduranceT = 8;

const TTotal = 
    RunBlockingT
    + PassBlockingT
    + BlockingStrengthT
    + EnduranceT;

// P:

const KickingPowerP = 25;
const PuntHangTime = 12;
const DirectionalPunting = 8;
const KickHoldingP = 0;

const PTotal = 
    KickingPowerP
    + PuntHangTime
    + DirectionalPunting
    + KickHoldingP;

// K:

const KickingAccuracy = 25;
const KickingPowerK = 14;
const KickoffDistance = 3;
const KickoffHangTime = 2;

const KTotal =
    KickingAccuracy
    + KickingPowerK
    + KickoffDistance
    + KickoffHangTime;

// DE:

const RunDefenseDE = 25;
const PassRushTechniqueDE = 18;
const PassRushStrengthDE = 16;
const PlayDiagnosisDE = 6;
const PunishingHitterDE = 3;
const EnduranceDE = 6;

const DETotal =
    RunDefenseDE
    + PassRushTechniqueDE
    + PassRushStrengthDE
    + PlayDiagnosisDE
    + PunishingHitterDE
    + EnduranceDE;

// DT:

const RunDefenseDT = 25;
const PassRushTechniqueDT = 10;
const PassRushStrengthDT = 13;
const PlayDiagnosisDT = 4;
const PunishingHitterDT = 2;
const EnduranceDT = 6;

const DTTotal =
    RunDefenseDT
    + PassRushTechniqueDT
    + PassRushStrengthDT
    + PlayDiagnosisDT
    + PunishingHitterDT
    + EnduranceDT;

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