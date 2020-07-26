import { combineReducers } from 'redux';
import myInfo from './myinfo.reducer';
import championInfo from './championInfo.reducer';

const reducer = combineReducers({
	myInfo,
	championInfo
});

export default reducer;
