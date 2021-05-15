// reducers.js
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { counterSlice } from './slices/counterSlice';
import { draftSlice } from './slices/draftSlice';
import { playersSlice } from './slices/playerSlice';

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    counter: counterSlice.reducer,
    draft: draftSlice.reducer,
    players: playersSlice.reducer
})
export default createRootReducer