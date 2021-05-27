export enum PositionGroup {
    QB = "QB",
    RB = "RB",
    WR = "WR",
    TE = "TE",
    FB = "FB",
    C = "C",
    G = "G",
    T = "T",
    DE = "DE",
    DT = "DT",
    ILB = "ILB",
    OLB = "OLB",
    CB = "CB",
    S = "S"
}

export function getPositionGroups() {
    return Object.values(PositionGroup);
}