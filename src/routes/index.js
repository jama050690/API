import AuthRoutes from "./auth.js";
import MainRoutes from "./main.js";
import LoginRoutes from "./login.js";
export default function (server) {
  server.register(MainRoutes);
  server.register(AuthRoutes);
  server.register(LoginRoutes);
}
