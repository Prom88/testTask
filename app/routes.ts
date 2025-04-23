import {
	type RouteConfig,
	index,
	prefix,
	route,
} from '@react-router/dev/routes'

export default [
	...prefix('testTask', [
		index('./routes/home.tsx'),
		route(':id', './routes/details.tsx'),
	]),
] satisfies RouteConfig
