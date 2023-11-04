import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './pages/Home';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	);
}

export default App;
