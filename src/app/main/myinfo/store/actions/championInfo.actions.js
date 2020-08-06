import axios from 'axios';

export const RETRIEVE_CHAMPION_INFO = '[RIOT] RETRIEVE_CHAMPION_INFO';

export function retrieveChampionInfo() {
	const request = axios.get('https://ddragon.leagueoflegends.com/cdn/10.14.1/data/ko_KR/champion.json');

	return dispatch =>
		request
			.then(response => {
				dispatch({
					type: RETRIEVE_CHAMPION_INFO,
					data: response
				});
			})
			.catch(e => {
				console.log(e);
			});
}
