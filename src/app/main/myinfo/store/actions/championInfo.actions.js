import axios from 'axios';

export const RETRIVE_CHAMPION_INFO = '[RIOT] RETRIVE_CHAMPION_INFO';

export function retriveChampionInfo() {
	const request = axios.get('http://ddragon.leagueoflegends.com/cdn/10.14.1/data/ko_KR/champion.json');

	return dispatch =>
		request.then(response => {
			dispatch({
				type: RETRIVE_CHAMPION_INFO,
				data: response
			});
		});
}
