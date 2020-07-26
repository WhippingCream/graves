import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const rows = [
	{
		id: 'index',
		align: 'left',
		disablePadding: true,
		label: '#',
		sort: false
	},
	{
		id: 'champ',
		align: 'left',
		disablePadding: false,
		label: 'Champion',
		sort: false
	},
	{
		id: 'totalMatchCount',
		align: 'left',
		disablePadding: false,
		label: 'Score',
		sort: true
	},
	{
		id: 'kda',
		align: 'left',
		disablePadding: false,
		label: 'KDA',
		sort: true
	}
];

function MyInfoTableHead(props) {
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className="h-64">
				{rows.map(row => {
					return (
						<TableCell
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort ? (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							) : (
								row.label
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default MyInfoTableHead;
