export interface IPlayer extends IQuarterbackPlayer, ISkillPositionPlayer, IDraftPlayer {
    playerId: number;
    firstName: string;
    lastName: string;
    bornDay: number;
    bornMonth: number;
    bornYear: number;
    collegeId: number;
    height: number;
    homeStateId: number;
    homeTownId: number;
    redFlag: boolean;
    weight: number;
    
    position: string;
    positionGroup: string;
    "" : string;
}

export interface IQuarterbackPlayer {
    highAccuracy: number;
    highKickHolding: number;
    highLongPasses: number;
    highMediumPasses: number;
    highRunFrequency: number;
    highScreenPasses: number;
    highSenseRush: number;
    highShortPasses: number;
    highThirdDown: number;
    highTiming: number;
    highTwoMinuteOffense: number;

    lowAccuracy: number;
    lowDeepPasses: number;
    lowKickHolding: number;
    lowLongPasses: number;
    lowMediumPasses: number;
    lowReadDefense: number;
    lowRunFrequency: number;
    lowScreenPasses: number;
    lowSenseRush: number;
    lowShortPasses: number;
    lowThirdDown: number;
    lowTiming: number;
    lowTwoMinuteOffense: number;
}

export interface ISkillPositionPlayer {
    highAdjusttoBall: number;
    highAvoidDrops: number;
    highBigPlayReceiving: number;
    highBlitzPickup: number;
    highBlockingStrength: number;
    highBumpandRunDefense: number;
    highDeepPasses: number;
    highDirectionalPunting: number;
    highElusiveness: number;
    highEndurance: number;
    highGetDownfield: number;
    highHangTime: number;
    highHoleRecognition: number;
    highIntercepting: number;
    highKickReturns: number;
    highKickingAccuracy: number;
    highKickingPower: number;
    highKickoffDistance: number;
    highKickoffHangTime: number;
    highLongSnapping: number;
    highMantoManDefense: number;
    highPassBlocking: number;
    highPassRushStrength: number;
    highPassRushTechnique: number;
    highPlayDiagnosis: number;
    highPowerInside: number;
    highPunishingHitter: number;
    highPuntReturns: number;
    highPuntingPower: number;
    highReadDefense: number;
    highRunBlocking: number;
    highRunDefense: number;
    highSpecialTeams: number;
    highSpeed: number;
    highSpeedOutside: number;
    highThirdDownReceiving: number;
    highThirdDownRuns: number;
    highZoneDefense: number;
    highCourage: number;
    highRouteRunning: number;

    lowAdjusttoBall: number;
    lowAvoidDrops: number;
    lowBigPlayReceiving: number;
    lowBlitzPickup: number;
    lowBlockingStrength: number;
    lowBumpandRunDefense: number;
    lowDirectionalPunting: number;
    lowElusiveness: number;
    lowEndurance: number;
    lowGetDownfield: number;
    lowHangTime: number;
    lowHoleRecognition: number;
    lowIntercepting: number;
    lowKickReturns: number;
    lowKickingAccuracy: number;
    lowKickingPower: number;
    lowKickoffDistance: number;
    lowKickoffHangTime: number;
    lowLongSnapping: number;
    lowMantoManDefense: number;
    lowPassBlocking: number;
    lowPassRushStrength: number;
    lowPassRushTechnique: number;
    lowPlayDiagnosis: number;
    lowPowerInside: number;
    lowPunishingHitter: number;
    lowPuntReturns: number;
    lowPuntingPower: number;
    lowRunBlocking: number;
    lowRunDefense: number;
    lowSpecialTeams: number;
    lowSpeed: number;
    lowSpeedOutside: number;
    lowThirdDownReceiving: number;
    lowThirdDownRuns: number;
    lowZoneDefense: number;
    lowCourage: number;
    lowRouteRunning: number;
}

export interface IDraftPlayer {
    agility: number;
    college: string;
    dash: number;
    developed: number;
    grade: number;
    jump: number;
    solecismic: number;
    strength: number;
    volatility: number;
}

/*
bonusYearFive: 0
bonusYearFour: 0
bonusYearOne: 0
bonusYearThree: 0
bonusYearTwo: 0

careerGameCount: 0
championshipRingCount: 0
choosenTeamId: 0

contractLength: 0

designation: "None"

draftPosition: 0
draftRound: 0
draftTeamId: 0
draftYear: 0
experience: 1

forthQuarterComebackCount: 0

hallOfFame: false
hallOfFamePoints: 0
hallOfFameYear: 0
health: "Good"

holdout: false

howAcquired: "None"
injuryLength: 0
injuryType: "0"
intelligence: 0
interviewed: false
jump: 116
juniorFlag: "0"
lastName: "Tyler"
leadership: 0

loyalty: 0
mentor: 0
nickname: ""
percentageOfVote: 0
personalityStrength: 0

playerOfGameCount: 0
playerOfTheWeekCount: 0
playerOfTheWeekWinCount: 0
playforWinner: 0
popularity: 59
position: "SLB"
positionGroup: "OLB"
positionSpecific: 33
quarterbackLossCount: 0
quarterbackTieCount: 0
quarterbackWinCount: 0

salaryYearFive: 0
salaryYearFour: 0
salaryYearOne: 0
salaryYearThree: 0
salaryYearTwo: 0
seasonCount: 0
seasonEightYear: 0
seasonEightteenYear: 0
seasonElvenYear: 0
seasonFiftheenYear: 0
seasonFiveYear: 0
seasonFourYear: 0
seasonFourteenYear: 0
seasonNineYear: 0
seasonNineteenYear: 0
seasonOneYear: 0
seasonSevenYear: 0
seasonSeventeenYear: 0
seasonSixYear: 0
seasonSixteenYear: 0
seasonStatisticsSGamesPlayed: 0
seasonTenYear: 0
seasonThirteenYear: 0
seasonThreeYear: 0
seasonTwelveYear: 0
seasonTwentyYear: 0
seasonTwoYear: 0

specialTeamsDesignation: false
status: "Active Roster"

teamId: 49
uniformNumber: 0

yearSigned: 0
*/