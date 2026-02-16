import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("orgs/new", "routes/orgs.new.tsx"),
	route("orgs/login", "routes/orgs.login.tsx"),
	route("pets/new", "routes/pets.new.tsx"),
	route("pet/", "routes/pet.profile.tsx"),
] satisfies RouteConfig;

