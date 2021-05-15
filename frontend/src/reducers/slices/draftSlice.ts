import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPlayer } from '../../models/player';
import { RootState } from '../store';

// Define a type for the slice state
interface DraftState {
    players: Array<IPlayer>;
}

// Define the initial state using that type
const initialState: DraftState = {
    players: []
}

export const draftSlice = createSlice({
    name: 'draft',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        add: (state, action: PayloadAction<IPlayer>) => {
            if (!state.players.some(p => p.playerId === action.payload.playerId)) {
                state.players = [...state.players, action.payload];
            }
        },
        remove: (state, action: PayloadAction<IPlayer>) => {
            const removeIndex = state.players.findIndex(p => p.playerId === action.payload.playerId);
            if (removeIndex >= 0) {
                state.players.splice(removeIndex, 1);
            }
        },
        set: (state, action: PayloadAction<Array<IPlayer>>) => {
            state.players = [...action.payload];
        },
        update: (state, action: PayloadAction<Array<IPlayer>>) => {
            state.players = state.players.map(player => {
                const found = action.payload.find(search => search.playerId === player.playerId);
                if (found) {
                    return {
                        ...player,
                        ...found
                    };
                }

                return player;
            });
            const extraPlayers = action.payload.filter(player => state.players.findIndex(search => search.playerId === player.playerId) === -1);
            state.players = [...state.players, ...extraPlayers];
        }
    }
})

export const { add, remove, set, update } = draftSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDraftPlayers = (state: RootState) => state.players.players

export default draftSlice.reducer