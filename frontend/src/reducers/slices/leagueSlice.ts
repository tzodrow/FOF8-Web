import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILeague } from '../../models/league';
import { RootState } from '../store';

// Define a type for the slice state
interface LeagueState {
    league: ILeague | undefined;
    leagues: Array<ILeague>;
}

// Define the initial state using that type
const initialState: LeagueState = {
    league: undefined,
    leagues: []
}

export const leagueSlice = createSlice({
    name: 'league',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setLeague: (state, action: PayloadAction<ILeague>) => {
            state.league = action.payload;
        },
        setLeagues: (state, action: PayloadAction<Array<ILeague>>) => {
            state.leagues = [...action.payload];
        }
    }
})

export const { setLeague, setLeagues } = leagueSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLeague = (state: RootState) => state.league.league
export const selectLeagues = (state: RootState) => state.league.leagues

export default leagueSlice.reducer