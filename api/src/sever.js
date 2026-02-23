import Routes from "../routes/index.js";
import dbPlugin from "../plugins/db.js";

import fastify from "fastify";
import cors from "@fastify/cors";
import oauthPlugin from "@fastify/oauth2";
import cookie from "@fastify/cookie";

const PORT = process.env.PORT || 3000;
const server = fastify({ logger: true });

// CORS — frontenddan so'rovlarni qabul qilish
server.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});

// Database plugin
server.register(dbPlugin);

// Routes (signup, login, main)
server.register(Routes);

// Cookie plugin
server.register(cookie, {
  secret: process.env.SESSION_SECRET,
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
  startRedirectPath: "/login/google", // Login boshlash URL
  callbackUri: "http://localhost:3000/login/google/callback", // Callback URL
});

// Google callback handler
server.get("/login/google/callback", async function (request, reply) {
  try {
    // Access token olish
    const { token } =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    // Google'dan user ma'lumotlarini olish
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );

    const userInfo = await userResponse.json();

    // Cookie'ga token saqlash
    reply.setCookie("token", token.access_token, {
      path: "/",
      httpOnly: true,
      secure: false, // production'da true qiling
      maxAge: 3600,
    });

    // Frontendga redirect
    return reply.redirect("http://localhost:5173/");
  } catch (err) {
    server.log.error(err);
    reply.status(500).send({ error: "Authentication xatolik" });
  }
});

// Himoyalangan route
server.get("/profile", async (request, reply) => {
  const token = request.cookies.token;

  if (!token) {
    return reply.status(401).send({ error: "Avval login qiling" });
  }

  const userResponse = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!userResponse.ok) {
    return reply.status(401).send({ error: "Token yaroqsiz" });
  }

  const userInfo = await userResponse.json();
  return { user: userInfo };
});

// Server ishga tushirish
server.listen({ port: PORT }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log("Server http://localhost:3000 da ishlayapti");
});
