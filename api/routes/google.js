export default function (server) {
  server.get("/login/google/callback", async function (request, reply) {
    try {
      const { token } =
        await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
          request,
        );

      const userResponse = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        },
      );

      const userInfo = await userResponse.json();

      const jwtToken = server.jwt.sign({
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        provider: "google",
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
      reply.status(500).send({ error: "Google authentication xatolik" });
    }
  });
}
