import { useState } from 'react';
import { useQuery } from 'react-query';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { getMovies } from '../api/movies';

import MoviesList from '../components/MoviesList';
import MovieFormModal from '../components/MovieFormModal';

export default function Home() {
	const [isModalOpened, setIsModalOpened] = useState(false);

	const { data = [], isLoading } = useQuery({
		queryFn: getMovies,
		queryKey: 'movies',
	});

	if (isLoading) return <h1>Loading...</h1>;

	const onModalClose = (data) => {
		setIsModalOpened(false);
		console.log(data);
	};

	const onAddButtonClick = () => {
		setIsModalOpened(true);
	};

	return (
		<div className="w-screen h-screen">
			<MoviesList items={data} />
			<MovieFormModal opened={isModalOpened} onClose={onModalClose} />

			<div className="absolute bottom-4 right-4">
				<Fab
					color="primary"
					aria-label="add"
					onClick={onAddButtonClick}
				>
					<AddIcon />
				</Fab>
			</div>
		</div>
	);
}
