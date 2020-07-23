import axios from 'axios';

export const GET_MYINFO = '[MYINFO] GET MYINFO';

export function getMyInfo(groupId, accountId) {
	const request = axios.get('/api/user/getInfo', {
		params: {
			groupId,
			accountId
		}
	});

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_MYINFO,
				payload: response.data
			})
		);
}
