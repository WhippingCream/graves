import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import MyInfoTableHead from './MyInfoTableHeader';

function MyInfoTable(props) {
	const dispatch = useDispatch();

	const championScores = useSelector(({ MyInfo }) => MyInfo.myInfo.championScore);
	const championInfos = useSelector(({ MyInfo }) => MyInfo.championInfo);

	const [data, setData] = useState(championScores);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'desc',
		id: 'totalMatchCount'
	});

	useEffect(() => {
		dispatch(Actions.retriveChampionInfo());
	}, [dispatch]);

	useEffect(() => {
		setData(championScores);
	}, [championScores]);

	const handleRequestSort = (event, property) => {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	};

	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
	};

	const getChampInfo = champId => {
		const id = Object.keys(championInfos.data).find(key => Number(championInfos.data[key].key) === champId);
		return championInfos.data[id];
	};

	const getChampImageURI = champId => {
		const info = getChampInfo(champId);
		return `http://ddragon.leagueoflegends.com/cdn/${championInfos.version}/img/champion/${info.id}.png`;
	};

	if (!championInfos || championInfos.length === 0) {
		return <FuseLoading />;
	}

	return (
		<div className="w-full flex flex-col">
			({data.length > 0} ??
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
					<MyInfoTableHead order={order} onRequestSort={handleRequestSort} rowCount={data.length} />

					<TableBody>
						{_.orderBy(data, [o => o[order.id]], [order.direction])
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n, i) => {
								return (
									<TableRow className="h-64 cursor-pointer" hover role="checkbox" tabIndex={-1} key={n.index}>
										<TableCell component="th" scope="row">
											{n.index}
										</TableCell>

										<TableCell component="th" scope="row">
											<img src={getChampImageURI(n.championId)} width="40" height="40" alt="thumbnail" />{' '}
											{getChampInfo(n.championId).name}
										</TableCell>

										<TableCell component="th" scope="row">
											{n.win}승 {n.lose}패 {n.winRate}%
										</TableCell>

										<TableCell component="th" scope="row">
											{n.kda.toFixed(2)} {n.averageKills.toFixed(1)} / {n.averageDeaths.toFixed(1)} /{' '}
											{n.averageAssists.toFixed(1)})
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>
			<TablePagination
				className="overflow-hidden"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
			)
		</div>
	);
}

export default withRouter(MyInfoTable);
