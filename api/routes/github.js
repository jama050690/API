export default function (server) {
  server.get("/auth/github/callback", async (request, reply) => {
    const { code } = request.query;

    if (!code) {
      return reply.status(400).send({ error: "Code topilmadi" });
    }

    try {
      const tokenResponse = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
          }),
        },
      );

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        server.log.error(tokenData);
        return reply.status(400).send({ error: tokenData.error_description });
      }

      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "User-Agent": "fastify-app",
        },
      });

      const userInfo = await userResponse.json();

      const jwtToken = server.jwt.sign({
        id: userInfo.id,
        name: userInfo.name || userInfo.login,
        email: userInfo.email,
        avatar: userInfo.avatar_url,
        provider: "github",
      });

      reply.setCookie("token", jwtToken, {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 3600,
      });

      return reply.redirect("http://localhost:5173/");
    } catch (err) {
      server.log.error(err);
      reply.status(500).send({ error: "GitHub authentication xatolik" });
    }
  });
}
