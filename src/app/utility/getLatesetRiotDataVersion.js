import axios from 'axios';

let dataVersion = '';

const request = axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
request
	.then(response => {
		[dataVersion] = response.data;
	})
	.catch(e => {
		console.error(e);
		dataVersion = process.env.REACT_APP_RIOT_DATA_VERSION;
	});

export default () => dataVersion;
