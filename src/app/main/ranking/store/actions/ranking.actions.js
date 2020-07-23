import axios from 'axios';

export const GET_RANKING = '[RANKING] GET RANKING';
export const SET_SEARCH_TEXT = '[RANKING] SET SEARCH TEXT';

export function getRanking(groupName) {
	const request = axios.get('/api/group/ranking', { params: { groupName } });

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_RANKING,
				payload: response.data.result
			})
		);
}

export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		searchText: event.target.value
	};
}
