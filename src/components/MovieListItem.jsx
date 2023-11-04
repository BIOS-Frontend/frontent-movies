import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

export default function MovieListItem({ data = {} }) {
	const { description, director, rating, title, year } = data;

	return (
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar>{rating}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={title}
				secondary={
					<>
						<span>{director}</span>
						{` — ${description}`}
					</>
				}
			/>
			{year}
		</ListItem>
	);
}
