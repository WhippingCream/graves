import * as Actions from '../actions';

const initialState = {
	scoreInfo: null
};

const myInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_MYINFO: {
			return {
				...state,
				scoreInfo: action.payload.userInfo,
				championScore: action.payload.championScore,
				summonerInfo: action.payload.summonerInfo
			};
		}
		default: {
			return state;
		}
	}
};

export default myInfoReducer;
