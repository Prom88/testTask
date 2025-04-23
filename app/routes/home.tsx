import {
	Alert,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import type { Route } from './+types/home'

type Tpost = {
	userId: number
	id: number
	title: string
	body: string
}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	]
}

export default function Home() {
	const [posts, setPosts] = useState<Tpost[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => {
				if (!response.ok) throw new Error('Failed to fetch posts')
				return response.json()
			})
			.then((data) => {
				setPosts(data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err.message)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return (
			<Box display='flex' justifyContent='center' mt={4}>
				<CircularProgress />
			</Box>
		)
	}

	if (error) {
		return (
			<Container maxWidth='md' sx={{ mt: 4 }}>
				<Alert severity='error'>{error}</Alert>
			</Container>
		)
	}

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Typography
				variant='h4'
				component='h1'
				gutterBottom
				align='center'
				sx={{ mb: 4 }}
			>
				Posts
			</Typography>

			<Grid container spacing={3}>
				{posts.map((post) => (
					<Grid key={post.id} size={12}>
						<Card
							sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
						>
							<CardContent>
								<Typography variant='overline' color='text.secondary'>
									Post #{post.id}
								</Typography>
								<Typography variant='h6' component='h2' gutterBottom>
									{post.title}
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'
									sx={{
										display: '-webkit-box',
										WebkitLineClamp: 3, // Ограничиваем текст до 3 строк
										WebkitBoxOrient: 'vertical',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{post.body}
								</Typography>
							</CardContent>
							<CardActions sx={{ mt: 'auto', justifyContent: 'flex-end' }}>
								<Button size='small' variant='outlined'>
									<NavLink to={`/post/${post.id}`}>Просмотр</NavLink>
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}
