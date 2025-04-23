import { NavLink } from 'react-router'
import type { Route } from '../+types/root'

import { useEffect, useState } from 'react'

import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	Divider,
	Typography,
} from '@mui/material'

type Tpost = {
	userId: number
	id: number
	title: string
	body: string
}

export default function details(props: Route.ComponentProps) {
	let id = props.params.id
	const [post, setPost] = useState<Tpost>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then((response) => {
				if (!response.ok) throw new Error('Post not found')
				return response.json()
			})
			.then((data) => {
				setPost(data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err.message)
				setLoading(false)
			})
	}, [id])

	if (error) {
		return (
			<Box sx={{ maxWidth: 'md', mx: 'auto', mt: 4 }}>
				<Alert severity='error'>{error}</Alert>
				<Button variant='contained' sx={{ mt: 2 }}>
					<NavLink to={`/testTask`}>Назад к списку </NavLink>
				</Button>
			</Box>
		)
	}

	return (
		<Box sx={{ maxWidth: 'md', mx: 'auto', mt: 4, p: 3 }}>
			<Button variant='outlined' startIcon={'<'} sx={{ mb: 3 }}>
				<NavLink to={`/testTask`}>Назад </NavLink>
			</Button>

			{loading && (
				<Box display='flex' justifyContent='center' mt={4}>
					<CircularProgress />
				</Box>
			)}

			{post && (
				<Card elevation={3}>
					<CardContent>
						<Box
							sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
						>
							<Chip
								label={`Post #${post.id}`}
								color='primary'
								variant='outlined'
								size='small'
							/>

							<Chip
								label={`Author: ${post.userId}`}
								color='secondary'
								variant='outlined'
								size='small'
							/>
						</Box>

						<Typography variant='h4' component='h1' gutterBottom>
							{post.title}
						</Typography>

						<Divider sx={{ my: 2 }} />

						<Typography
							variant='body1'
							sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}
						>
							{post.body}
						</Typography>
					</CardContent>
				</Card>
			)}
		</Box>
	)
}
