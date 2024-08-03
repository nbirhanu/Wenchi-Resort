import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GlobalStyles } from './styles/Globalstyles'
import Cabins from './pages/Cabins'
import Settings from './pages/Settings'
import Dashboard from './pages/Dashboard'
import Account from './pages/Account'
import Bookings from './pages/Bookings'
import NewUsers from './pages/Users'
import AppLayout from './ui/AppLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 60 * 1000,
			staleTime: 0,
		},
	},
})

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="users" element={<NewUsers />} />
						<Route path="settings" element={<Settings />} />
						<Route path="account" element={<Account />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{ margin: '8px' }}
				toastOptions={{
					success: {
						duration: 3000,
					},
					error: {
						duration: 5000,
					},
					style: {
						fontSize: '16px',
						maxWidth: '500px',
						padding: '16px 24px',
						backgroundColor: 'var(--color-grey-0)',
						color: 'var(--color-grey-700)',
					},
				}}
			/>
		</QueryClientProvider>
	)
}
