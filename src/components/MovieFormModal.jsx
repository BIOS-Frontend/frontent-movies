import { useState } from 'react';
import { useMutation } from 'react-query';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { addMovie } from '../api/movies';

import { queryClient } from '../App';

const fields = [
	{
		name: 'title',
		label: 'Título',
		type: 'text',
	},
	{
		name: 'description',
		label: 'Descripción',
		type: 'text',
	},
	{
		name: 'director',
		label: 'Director',
		type: 'text',
	},
	{
		name: 'rating',
		label: 'Nota',
		type: 'number',
	},
	{
		name: 'year',
		label: 'Año',
		type: 'number',
	},
	{
		name: 'duration',
		label: 'Duración',
		type: 'number',
	},
];

const defaultValue = Object.fromEntries(fields.map(({ name }) => [name, '']));

export default function MovieFormModal({
	opened,
	data = defaultValue,
	onClose = () => {},
	title = 'Crear película',
}) {
	const [formData, setFormData] = useState(data);

	const {
		mutate,
		isLoading,
		error: errors = [],
	} = useMutation({
		mutationFn: addMovie,
		onSuccess: () => {
			queryClient.invalidateQueries('movies');
			onClose(null);
		},
	});

	const onSubmitButtonClick = () => {
		mutate(formData);
	};

	const onFieldChange = ({ target }) => {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	};

	return (
		<Dialog open={opened} onClose={() => onClose(null)}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<form className="flex flex-col gap-2 w-96 pt-2">
					{fields.map(({ name, label, type }) => {
						const error = errors?.find(({ path }) => path === name);

						return (
							<TextField
								required
								key={name}
								label={label}
								type={type}
								name={name}
								value={formData[name]}
								error={!!error}
								fullWidth
								onChange={onFieldChange}
								helperText={error?.msg}
							/>
						);
					})}
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose(null)}>Cancelar</Button>
				<Button
					disabled={isLoading}
					onClick={onSubmitButtonClick}
					variant="contained"
				>
					{isLoading ? 'Enviando...' : 'Enviar'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
