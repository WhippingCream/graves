import createCamilleAxios from 'app/utility/camilleAxios';

export const GET_MYINFO = '[MYINFO] GET MYINFO';

const getTotalMatchCount = champData => champData.win + champData.lose;
const getWinRate = champData => Math.ceil((champData.win / getTotalMatchCount(champData)) * 100);
const getAverageKills = champData => champData.kills / getTotalMatchCount(champData);
const getAverageDeaths = champData => champData.deaths / getTotalMatchCount(champData);
const getAverageAssists = champData => champData.assists / getTotalMatchCount(champData);
const getKDA = champData => (getAverageKills(champData) + getAverageAssists(champData)) / getAverageDeaths(champData);

export function getMyInfo(groupId) {
	const request = createCamilleAxios().get('/api/user/getInfo', {
		params: {
			groupId
		}
	});

	return dispatch =>
		request.then(response => {
			if (response.status !== 200) return;

			let champScoreArray = response.data.championScore;
			champScoreArray = champScoreArray.sort((a, b) => {
				const aTotal = getTotalMatchCount(a);
				const bTotal = getTotalMatchCount(b);
				if (aTotal !== bTotal) return bTotal - aTotal;

				return b.win - a.win;
			});
			champScoreArray = champScoreArray.map((elem, index) => {
				return {
					...elem,
					totalMatchCount: getTotalMatchCount(elem),
					winRate: getWinRate(elem),
					averageKills: getAverageKills(elem),
					averageDeaths: getAverageDeaths(elem),
					averageAssists: getAverageAssists(elem),
					kda: getKDA(elem),
					index: index + 1
				};
			});

			response.data.championScore = champScoreArray;

			dispatch({
				type: GET_MYINFO,
				payload: response.data
			});
		});
}
