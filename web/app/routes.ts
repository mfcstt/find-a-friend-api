import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("orgs/new", "routes/orgs.new.tsx"),
] satisfies RouteConfig;
