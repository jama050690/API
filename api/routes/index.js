import AuthRoutes from "./auth.js";
import MainRoutes from "./main.js";
import LoginRoutes from "./login.js";
import GoogleRoutes from "./google.js";
import GithubRoutes from "./github.js";
import ProfileRoutes from "./profile.js";

export default function (server) {
  server.register(MainRoutes);
  server.register(AuthRoutes);
  server.register(LoginRoutes);
  server.register(GoogleRoutes);
  server.register(GithubRoutes);
  server.register(ProfileRoutes);
}
