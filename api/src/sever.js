import Routes from "../routes/index.js";
import dbPlugin from "../plugins/db.js";

import fastify from "fastify";
import cors from "@fastify/cors";
import oauthPlugin from "@fastify/oauth2";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";

const PORT = process.env.PORT || 3000;
const server = fastify({ logger: true });

// CORS
server.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});

// Database plugin
server.register(dbPlugin);

// Cookie plugin
server.register(cookie, {
  secret: process.env.SESSION_SECRET,
});

// JWT plugin
server.register(jwt, {
  secret: process.env.JWT_SECRET,
});

// Google OAuth2 plugin
server.register(oauthPlugin, {
  name: "googleOAuth2",
  scope: ["profile", "email"],
  credentials: {
    client: {
      id: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    auth: oauthPlugin.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: "/login/google",
  callbackUri: "http://localhost:3000/login/google/callback",
});

// Routes
server.register(Routes);

// Server ishga tushirish
server.listen({ port: PORT }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server http://localhost:${PORT} da ishlayapti`);
});
