import React, { useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import MyInfoTable from './MyInfoTable';
import reducer from './store/reducers';
import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function MyInfoPage(props) {
	const classes = useStyles(props);

	const dispatch = useDispatch();

	const user = useSelector(state => state.auth.user);
	const scoreInfo = useSelector(({ MyInfo }) => MyInfo.myInfo.scoreInfo);

	useEffect(() => {
		dispatch(Actions.getMyInfo(user.groupList.result[0].groupId, user.loginResult.result.accountId));
	}, [dispatch, user]);

	if (!scoreInfo) {
		return <FuseLoading />;
	}

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>내 정보</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Content Toolbar</h4>
				</div>
			}
			content={
				<div className="p-24">
					<h4>
						레이팅:{scoreInfo.defaultRating + scoreInfo.additionalRating}
						<br />
						기본 레이팅:{scoreInfo.defaultRating}
						<br />
						추가 레이팅:{scoreInfo.additionalRating}
						<br />
						총:{scoreInfo.win + scoreInfo.lose}
						<br />
						승:{scoreInfo.win}
						<br />
						패:{scoreInfo.lose}
						<br />
						승률:{Math.ceil((scoreInfo.win / (scoreInfo.win + scoreInfo.lose)) * 100)}%
					</h4>

					<MyInfoTable />
				</div>
			}
		/>
	);
}

export default withReducer('MyInfo', reducer)(MyInfoPage);
