import axios from 'axios';
import getLatesetRiotDataVersion from 'app/utility/getLatesetRiotDataVersion';

export const RETRIEVE_CHAMPION_INFO = '[RIOT] RETRIEVE_CHAMPION_INFO';

export function retrieveChampionInfo() {
	const request = axios.get(
		`https://ddragon.leagueoflegends.com/cdn/${getLatesetRiotDataVersion()}/data/ko_KR/champion.json`
	);

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
