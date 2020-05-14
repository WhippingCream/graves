import React from 'react';

const RankingConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/ranking',
			component: React.lazy(() => import('./Ranking'))
		}
	]
};

export default RankingConfig;
