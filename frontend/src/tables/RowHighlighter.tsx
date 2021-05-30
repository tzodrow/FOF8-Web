import { avg } from "../calculations/average";

export function rowHighlightClass (lowValue: number, highValue: number) {
    if (highValue === 100) {
        return "rating-max";
    }

    if (lowValue === 0) {
        return "rating-poor";
    }

    if (avg(highValue, lowValue) >= 65) {
        return "rating-good";
    }

    if (avg(highValue, lowValue) <= 35 ) {
        return "rating-bad";
    }

    return "";
}