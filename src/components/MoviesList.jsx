import { Fragment } from 'react';

import { List, Divider } from '@mui/material';

import MovieListItem from './MovieListItem';

export default function MoviesList({ items = [] }) {
	return (
		<List>
			{items.map((item) => (
				<Fragment key={item?._id}>
					<MovieListItem data={item} />
					<Divider variant="inset" component="li" />
				</Fragment>
			))}
		</List>
	);
}
