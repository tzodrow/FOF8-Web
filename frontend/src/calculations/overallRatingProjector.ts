import { IDraftPlayer } from "../models/player";
import { avg } from "./average";

// QB:
const ScreenPassesQB = 20;
const ShortPassesQB = 19;
const MediumPassesQB = 22;
const LongPassesQB = 22;
const DeepPassesQB = 15;
const ThirdDownPassingQB = 24;
const AccuracyQB = 23;
const TimingQB = 0;
const SenseRushQB = 8;
const ReadDefenseQB = 11;
const TwoMinuteOffenseQB = 7;
const ScrambleFrequencyQB = 0;
const KickHoldingQB = 0;

const QBTotal = 
    ScreenPassesQB 
    + ShortPassesQB 
    + MediumPassesQB 
    + LongPassesQB
    + DeepPassesQB
    + ThirdDownPassingQB
    + AccuracyQB
    + TimingQB
    + SenseRushQB
    + ReadDefenseQB
    + TwoMinuteOffenseQB
    + ScrambleFrequencyQB
    + KickHoldingQB;

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

const RunDefenseILB = 25;
const PassRushTechniqueILB = 5;
const PassRushStrengthILB = 8;
const ManToManDefenseILB = 8;
const ZoneDefenseILB = 8;
const BumpAndRunDefenseILB = 2;
const PlayDiagnosisILB = 8;
const PunishingHitterILB = 4;
const EnduranceILB = 4;
const SpecialTeamsILB = 1;

const ILBTotal =
    RunDefenseILB
    + PassRushTechniqueILB
    + PassRushStrengthILB
    + ManToManDefenseILB
    + ZoneDefenseILB
    + BumpAndRunDefenseILB
    + PlayDiagnosisILB
    + PunishingHitterILB
    + EnduranceILB
    + SpecialTeamsILB;

// OLB:

const RunDefenseOLB = 25;
const PassRushTechniqueOLB = 8;
const PassRushStrengthOLB = 10;
const ManToManDefenseOLB = 10;
const ZoneDefenseOLB = 10;
const BumpAndRunDefenseOLB = 2;
const PlayDiagnosisOLB = 8;
const PunishingHitterOLB = 4;
const EnduranceOLB = 4;
const SpecialTeamsOLB = 1;

const OLBTotal =
    RunDefenseOLB
    + PassRushTechniqueOLB
    + PassRushStrengthOLB
    + ManToManDefenseOLB
    + ZoneDefenseOLB
    + BumpAndRunDefenseOLB
    + PlayDiagnosisOLB
    + PunishingHitterOLB
    + EnduranceOLB
    + SpecialTeamsOLB;

// CB:

const RunDefenseCB = 16;
const ManToManDefenseCB = 24;
const ZoneDefenseCB = 22;
const BumpAndRunDefenseCB = 24;
const PlayDiagnosisCB = 8;
const PunishingHitterCB = 2;
const InterceptionsCB = 9;
const PuntReturnsCB = 1;
const KickReturnsCB = 1;
const EnduranceCB = 5;
const SpecialTeamsCB = 1;

const CBTotal =
    RunDefenseCB
    + ManToManDefenseCB
    + ZoneDefenseCB
    + BumpAndRunDefenseCB
    + PlayDiagnosisCB
    + PunishingHitterCB
    + InterceptionsCB
    + PuntReturnsCB
    + KickReturnsCB
    + EnduranceCB
    + SpecialTeamsCB;

// S:

const RunDefenseS = 25;
const ManToManDefenseS = 11;
const ZoneDefenseS = 11;
const BumpAndRunDefenseS = 11;
const PlayDiagnosisS = 9;
const PunishingHitterS = 3;
const InterceptionsS = 7;
const PuntReturnsS = 1;
const KickReturnsS = 1;
const EnduranceS = 4;
const SpecialTeamsS = 1;

const STotal =
    RunDefenseS
    + ManToManDefenseS
    + ZoneDefenseS
    + BumpAndRunDefenseS
    + PlayDiagnosisS
    + PunishingHitterS
    + InterceptionsS
    + PuntReturnsS
    + KickReturnsS
    + EnduranceS
    + SpecialTeamsS;


export function overallProjectionQB(player: IDraftPlayer) {
    let proj = avg(player.Low_Screen_Passes, player.High_Screen_Passes) * (ScreenPassesQB / QBTotal);
    proj += avg(player.Low_Short_Passes, player.High_Short_Passes) * (ShortPassesQB / QBTotal);
    proj += avg(player.Low_Medium_Passes, player.High_Medium_Passes) * (MediumPassesQB / QBTotal);
    proj += avg(player.Low_Long_Passes, player.High_Long_Passes) * (LongPassesQB / QBTotal);
    proj += avg(player.Low_Deep_Passes, player.High_Deep_Passes) * (DeepPassesQB / QBTotal);
    proj += avg(player.Low_Third_Down, player.High_Third_Down) * (ThirdDownPassingQB / QBTotal);
    proj += avg(player.Low_Accuracy, player.High_Accuracy) * (AccuracyQB / QBTotal);
    proj += avg(player.Low_Timing, player.High_Timing) * (TimingQB / QBTotal);
    proj += avg(player.Low_Sense_Rush, player.High_Sense_Rush) * (SenseRushQB / QBTotal);
    proj += avg(player.Low_Read_Defense, player.High_Read_Defense) * (ReadDefenseQB / QBTotal);
    proj += avg(player["Low_Two-Minute_Offense"], player["High_Two-Minute_Offense"]) * (TwoMinuteOffenseQB / QBTotal);
    proj += avg(player.Low_Run_Frequency, player.High_Run_Frequency) * (ScrambleFrequencyQB / QBTotal);
    proj += avg(player.Low_Kick_Holding, player.High_Kick_Holding) * (KickHoldingQB / QBTotal);

    return proj;
}

export function overallProjectionRB(player: IDraftPlayer) {
    let proj = avg(player.Low_Speed, player.High_Speed) * (BreakawaySpeedRB / RBTotal);
    proj += avg(player.Low_Power_Inside, player.High_Power_Inside) * (PowerInsideRB / RBTotal);
    proj += avg(player["Low_Third-Down_Runs"], player["High_Third-Down_Runs"]) * (ThirdDownRunningRB / RBTotal);
    proj += avg(player.Low_Hole_Recognition, player.High_Hole_Recognition) * (HoleRecognitionRB / RBTotal);
    proj += avg(player.Low_Elusiveness, player.High_Elusiveness) * (ElusivenessRB / RBTotal);
    proj += avg(player.Low_Speed_Outside, player.High_Speed_Outside) * (SpeedToOutsideRB / RBTotal);
    proj += avg(player.Low_Blitz_Pickup, player.High_Blitz_Pickup) * (BlitzPickupRB / RBTotal);
    proj += avg(player.Low_Avoid_Drops, player.High_Avoid_Drops) * (AvoidDropsRB / RBTotal);
    proj += avg(player.Low_Get_Downfield, player.High_Get_Downfield) * (GettingDownFieldRB / RBTotal);
    proj += avg(player.Low_Route_Running, player.High_Route_Running) * (RouteRunningRB / RBTotal);
    proj += avg(player["Low_Third-Down_Receiving"], player["High_Third-Down_Receiving"]) * (ThirdDownCatchingRB / RBTotal);
    proj += avg(player.Low_Punt_Returns, player.High_Punt_Returns) * (PuntReturnsRB / RBTotal);
    proj += avg(player.Low_Kick_Returns, player.High_Kick_Returns) * (KickReturnsRB / RBTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceRB / RBTotal);
    proj += avg(player.Low_Special_Teams, player.High_Special_Teams) * (SpecialTeamsRB / RBTotal);

    return proj;
}

export function overallProjectionFB(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Blocking, player.High_Run_Blocking) * (RunBlockingFB / FBTotal);
    proj += avg(player.Low_Pass_Blocking, player.High_Pass_Blocking) * (PassBlockingFB / FBTotal);
    proj += avg(player.Low_Blocking_Strength, player.High_Blocking_Strength) * (BlockingStrengthFB / FBTotal);
    proj += avg(player.Low_Power_Inside, player.High_Power_Inside) * (PowerInsideFB / FBTotal);
    proj += avg(player["Low_Third-Down_Runs"], player["High_Third-Down_Runs"]) * (ThirdDownRunningFB / FBTotal);
    proj += avg(player.Low_Hole_Recognition, player.High_Hole_Recognition) * (HoleRecognitionFB / FBTotal);
    proj += avg(player.Low_Blitz_Pickup, player.High_Blitz_Pickup) * (BlitzPickupFB / FBTotal);
    proj += avg(player.Low_Avoid_Drops, player.High_Avoid_Drops) * (AvoidDropsFB / FBTotal);
    proj += avg(player.Low_Route_Running, player.High_Route_Running) * (RouteRunningFB / FBTotal);
    proj += avg(player["Low_Third-Down_Receiving"], player["High_Third-Down_Receiving"]) * (ThirdDownCatchingFB / FBTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceFB / FBTotal);
    proj += avg(player.Low_Special_Teams, player.High_Special_Teams) * (SpecialTeamsFB / FBTotal);

    return proj;
}

export function overallProjectionTE(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Blocking, player.High_Run_Blocking) * (RunBlockingTE / TETotal);
    proj += avg(player.Low_Pass_Blocking, player.High_Pass_Blocking) * (PassBlockingTE / TETotal);
    proj += avg(player.Low_Blocking_Strength, player.High_Blocking_Strength) * (BlockingStrengthTE / TETotal);
    proj += avg(player.Low_Avoid_Drops, player.High_Avoid_Drops) * (AvoidDropsTE / TETotal);
    proj += avg(player.Low_Get_Downfield, player.High_Get_Downfield) * (GettingDownFieldTE / RBTotal);
    proj += avg(player.Low_Route_Running, player.High_Route_Running) * (RouteRunningTE / TETotal);
    proj += avg(player["Low_Third-Down_Receiving"], player["High_Third-Down_Receiving"]) * (ThirdDownCatchingTE / TETotal);
    proj += avg(player.Low_Big_Play_Receiving, player.High_Big_Play_Receiving) * (BigPlayReceivingTE / TETotal);
    proj += avg(player.Low_Courage, player.High_Courage) * (CourageTE / TETotal);
    proj += avg(player.Low_Adjust_to_Ball, player.High_Adjust_to_Ball) * (AdjustToBallTE / TETotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceTE / TETotal);
    proj += avg(player.Low_Special_Teams, player.High_Special_Teams) * (SpecialTeamsTE / TETotal);
    proj += avg(player.Low_Long_Snapping, player.High_Long_Snapping) * (LongSnappingTE / TETotal);

    return proj;
}

export function overallProjectionWR(player: IDraftPlayer) {
    let proj = avg(player.Low_Avoid_Drops, player.High_Avoid_Drops) * (AvoidDropsWR / WRTotal);
    proj += avg(player.Low_Get_Downfield, player.High_Get_Downfield) * (GettingDownFieldWR / RBTotal);
    proj += avg(player.Low_Route_Running, player.High_Route_Running) * (RouteRunningWR / WRTotal);
    proj += avg(player["Low_Third-Down_Receiving"], player["High_Third-Down_Receiving"]) * (ThirdDownCatchingWR / WRTotal);
    proj += avg(player.Low_Big_Play_Receiving, player.High_Big_Play_Receiving) * (BigPlayReceivingWR / WRTotal);
    proj += avg(player.Low_Courage, player.High_Courage) * (CourageWR / WRTotal);
    proj += avg(player.Low_Adjust_to_Ball, player.High_Adjust_to_Ball) * (AdjustToBallWR / WRTotal);
    proj += avg(player.Low_Punt_Returns, player.High_Punt_Returns) * (PuntReturnsWR / WRTotal);
    proj += avg(player.Low_Kick_Returns, player.High_Kick_Returns) * (KickReturnsWR / WRTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceWR / WRTotal);
    proj += avg(player.Low_Special_Teams, player.High_Special_Teams) * (SpecialTeamsWR / WRTotal);

    return proj;
}

export function overallProjectionC(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Blocking, player.High_Run_Blocking) * (RunBlockingC / CTotal);
    proj += avg(player.Low_Pass_Blocking, player.High_Pass_Blocking) * (PassBlockingC / CTotal);
    proj += avg(player.Low_Blocking_Strength, player.High_Blocking_Strength) * (BlockingStrengthC / CTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceC / CTotal);
    proj += avg(player.Low_Long_Snapping, player.High_Long_Snapping) * (LongSnappingC / CTotal);

    return proj;
}

export function overallProjectionG(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Blocking, player.High_Run_Blocking) * (RunBlockingG / GTotal);
    proj += avg(player.Low_Pass_Blocking, player.High_Pass_Blocking) * (PassBlockingG / GTotal);
    proj += avg(player.Low_Blocking_Strength, player.High_Blocking_Strength) * (BlockingStrengthG / GTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceG / GTotal);

    return proj;
}

export function overallProjectionT(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Blocking, player.High_Run_Blocking) * (RunBlockingT / TTotal);
    proj += avg(player.Low_Pass_Blocking, player.High_Pass_Blocking) * (PassBlockingT / TTotal);
    proj += avg(player.Low_Blocking_Strength, player.High_Blocking_Strength) * (BlockingStrengthT / TTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceT / TTotal);

    return proj;
}

export function overallProjectionP(player: IDraftPlayer) {
    let proj = avg(player.Low_Punting_Power, player.High_Punting_Power) * (KickingPowerP / PTotal);
    proj += avg(player.Low_Hang_Time, player.High_Hang_Time) * (PuntHangTime / PTotal);
    proj += avg(player.Low_Directional_Punting, player.High_Directional_Punting) * (DirectionalPunting / PTotal);
    proj += avg(player.Low_Kick_Holding, player.High_Kick_Holding) * (KickHoldingP / PTotal);

    return proj;
}

export function overallProjectionK(player: IDraftPlayer) {
    let proj = avg(player.Low_Kicking_Accuracy, player.High_Kicking_Accuracy) * (KickingAccuracy / KTotal);
    proj += avg(player.Low_Kicking_Power, player.High_Kicking_Power) * (KickingPowerK / KTotal);
    proj += avg(player.Low_Kickoff_Distance, player.High_Kickoff_Distance) * (KickoffDistance / KTotal);
    proj += avg(player.Low_Kickoff_Hang_Time, player.High_Kickoff_Hang_Time) * (KickoffHangTime / KTotal);

    return proj;
}

export function overallProjectionDE(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Defense, player.High_Run_Defense) * (RunDefenseDE / DETotal);
    proj += avg(player.Low_Pass_Rush_Technique, player.High_Pass_Rush_Technique) * (PassRushTechniqueDE / DETotal);
    proj += avg(player.Low_Pass_Rush_Strength, player.High_Pass_Rush_Strength) * (PassRushStrengthDE / DETotal);
    proj += avg(player.Low_Play_Diagnosis, player.High_Play_Diagnosis) * (PlayDiagnosisDE / DETotal);
    proj += avg(player.Low_Punishing_Hitter, player.High_Punishing_Hitter) * (PunishingHitterDE / DETotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceDE / DETotal);

    return proj;
}

export function overallProjectionDT(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Defense, player.High_Run_Defense) * (RunDefenseDT / DTTotal);
    proj += avg(player.Low_Pass_Rush_Technique, player.High_Pass_Rush_Technique) * (PassRushTechniqueDT / DTTotal);
    proj += avg(player.Low_Pass_Rush_Strength, player.High_Pass_Rush_Strength) * (PassRushStrengthDT / DTTotal);
    proj += avg(player.Low_Play_Diagnosis, player.High_Play_Diagnosis) * (PlayDiagnosisDT / DTTotal);
    proj += avg(player.Low_Punishing_Hitter, player.High_Punishing_Hitter) * (PunishingHitterDT / DTTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceDT / DTTotal);

    return proj;
}

export function overallProjectionILB(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Defense, player.High_Run_Defense) * (RunDefenseILB / ILBTotal);
    proj += avg(player.Low_Pass_Rush_Technique, player.High_Pass_Rush_Technique) * (PassRushTechniqueILB / ILBTotal);
    proj += avg(player.Low_Pass_Rush_Strength, player.High_Pass_Rush_Strength) * (PassRushStrengthILB / ILBTotal);
    proj += avg(player["Low_Man-to-Man_Defense"], player["High_Man-to-Man_Defense"]) * (ManToManDefenseILB / ILBTotal);
    proj += avg(player.Low_Zone_Defense, player.High_Zone_Defense) * (ZoneDefenseILB / ILBTotal);
    proj += avg(player["Low_Bump-and-Run_Defense"], player["High_Bump-and-Run_Defense"]) * (BumpAndRunDefenseILB / ILBTotal);
    proj += avg(player.Low_Play_Diagnosis, player.High_Play_Diagnosis) * (PlayDiagnosisILB / ILBTotal);
    proj += avg(player.Low_Punishing_Hitter, player.High_Punishing_Hitter) * (PunishingHitterILB / ILBTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceILB / ILBTotal);
    proj += avg(player.Low_Special_Teams, player.High_Special_Teams) * (SpecialTeamsILB / ILBTotal);

    return proj;
}

export function overallProjectionOLB(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Defense, player.High_Run_Defense) * (RunDefenseOLB / OLBTotal);
    proj += avg(player.Low_Pass_Rush_Technique, player.High_Pass_Rush_Technique) * (PassRushTechniqueOLB / OLBTotal);
    proj += avg(player.Low_Pass_Rush_Strength, player.High_Pass_Rush_Strength) * (PassRushStrengthOLB / OLBTotal);
    proj += avg(player["Low_Man-to-Man_Defense"], player["High_Man-to-Man_Defense"]) * (ManToManDefenseOLB / OLBTotal);
    proj += avg(player.Low_Zone_Defense, player.High_Zone_Defense) * (ZoneDefenseOLB / OLBTotal);
    proj += avg(player["Low_Bump-and-Run_Defense"], player["High_Bump-and-Run_Defense"]) * (BumpAndRunDefenseOLB / OLBTotal);
    proj += avg(player.Low_Play_Diagnosis, player.High_Play_Diagnosis) * (PlayDiagnosisOLB / OLBTotal);
    proj += avg(player.Low_Punishing_Hitter, player.High_Punishing_Hitter) * (PunishingHitterOLB / OLBTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceOLB / OLBTotal);
    proj += avg(player.Low_Special_Teams, player.High_Special_Teams) * (SpecialTeamsOLB / OLBTotal);

    return proj;
}

export function overallProjectionCB(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Defense, player.High_Run_Defense) * (RunDefenseCB / CBTotal);
    proj += avg(player["Low_Man-to-Man_Defense"], player["High_Man-to-Man_Defense"]) * (ManToManDefenseCB / CBTotal);
    proj += avg(player.Low_Zone_Defense, player.High_Zone_Defense) * (ZoneDefenseCB / CBTotal);
    proj += avg(player["Low_Bump-and-Run_Defense"], player["High_Bump-and-Run_Defense"]) * (BumpAndRunDefenseCB / CBTotal);
    proj += avg(player.Low_Play_Diagnosis, player.High_Play_Diagnosis) * (PlayDiagnosisCB / CBTotal);
    proj += avg(player.Low_Punishing_Hitter, player.High_Punishing_Hitter) * (PunishingHitterCB / CBTotal);
    proj += avg(player.Low_Intercepting, player.High_Intercepting) * (InterceptionsCB / CBTotal);
    proj += avg(player.Low_Punt_Returns, player.High_Punt_Returns) * (PuntReturnsCB / CBTotal);
    proj += avg(player.Low_Kick_Returns, player.High_Kick_Returns) * (KickReturnsCB / CBTotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceCB / CBTotal);
    proj += avg(player.Low_Special_Teams, player.High_Special_Teams) * (SpecialTeamsCB / CBTotal);

    return proj;
}

export function overallProjectionS(player: IDraftPlayer) {
    let proj = avg(player.Low_Run_Defense, player.High_Run_Defense) * (RunDefenseS / STotal);
    proj += avg(player["Low_Man-to-Man_Defense"], player["High_Man-to-Man_Defense"]) * (ManToManDefenseS / STotal);
    proj += avg(player.Low_Zone_Defense, player.High_Zone_Defense) * (ZoneDefenseS / STotal);
    proj += avg(player["Low_Bump-and-Run_Defense"], player["High_Bump-and-Run_Defense"]) * (BumpAndRunDefenseS / STotal);
    proj += avg(player.Low_Play_Diagnosis, player.High_Play_Diagnosis) * (PlayDiagnosisS / STotal);
    proj += avg(player.Low_Punishing_Hitter, player.High_Punishing_Hitter) * (PunishingHitterS / STotal);
    proj += avg(player.Low_Intercepting, player.High_Intercepting) * (InterceptionsS / STotal);
    proj += avg(player.Low_Punt_Returns, player.High_Punt_Returns) * (PuntReturnsS / STotal);
    proj += avg(player.Low_Kick_Returns, player.High_Kick_Returns) * (KickReturnsS / STotal);
    proj += avg(player.Low_Endurance, player.High_Endurance) * (EnduranceS / STotal);
    proj += avg(player.Low_Special_Teams, player.High_Special_Teams) * (SpecialTeamsS / STotal);

    return proj;
}