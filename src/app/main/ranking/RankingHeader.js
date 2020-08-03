import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

function RankingHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ Ranking }) => Ranking.ranking.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const isRefreshingGroupRating = useSelector(({ Ranking }) => Ranking.ranking.isRefreshingGroupRating);
	const user = useSelector(state => state.auth.user);

	const onRefreshGroupRating = () => {
		dispatch(Actions.refreshGroupRating(user.groupList[0].groupName));
	};

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">format_list_numbered</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Ranking
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => dispatch(Actions.setSearchText(ev))}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
			<div>
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button variant="contained" color="secondary" size="large" onClick={onRefreshGroupRating}>
						{isRefreshingGroupRating ? (
							<FuseLoading isShowingText={false} isLinearProgress={false} />
						) : (
							'그룹 전적 갱신'
						)}
					</Button>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default RankingHeader;
