import { index, prefix, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("app", [route("dashboard", "routes/dashboard.tsx")]),
] satisfies RouteConfig as RouteConfig;
