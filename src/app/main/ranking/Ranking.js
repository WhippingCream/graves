import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import RankingHeader from './RankingHeader';
import RankingTable from './RankingTable';

function Ranking() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<RankingHeader />}
			content={<RankingTable />}
			innerScroll
		/>
	);
}

export default withReducer('Ranking', reducer)(Ranking);
