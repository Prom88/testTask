import { type RouteConfig, route } from '@react-router/dev/routes'

export default [
	route('/', 'routes/home.tsx'),
	route('post/:id', 'routes/details.tsx'),
] satisfies RouteConfig
