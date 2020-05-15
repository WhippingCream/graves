import { combineReducers } from 'redux';
import ranking from './ranking.reducer';

const reducer = combineReducers({
	ranking,
});

export default reducer;
