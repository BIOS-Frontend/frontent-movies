import { API_URL } from './config';

export async function getMovies() {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await fetch(`${API_URL}/movies`);
			const data = await res.json();

			resolve(data?.result?.movies);
		} catch (error) {
			console.log(error);
			reject('Error al obtener los datos de las películas.');
		}
	});
}

export async function addMovie(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const urlencoded = new URLSearchParams();

			Object.entries(data).forEach(([key, value]) => {
				urlencoded.append(key, value);
			});

			const res = await fetch(`${API_URL}/movies`, {
				method: 'POST',
				body: urlencoded,
			});
			const dataResponse = await res.json();

			if (dataResponse.status === 'ERROR') throw dataResponse;

			resolve(dataResponse?.result);
		} catch (error) {
			reject(error.message);
		}
	});
}
