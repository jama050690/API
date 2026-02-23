export default function (server) {
  server.get("/profile", async (request, reply) => {
    const token = request.cookies.token;

    if (!token) {
      return reply.status(401).send({ error: "Avval login qiling" });
    }

    try {
      const user = server.jwt.verify(token);
      return { user };
    } catch (err) {
      return reply.status(401).send({ error: "Token yaroqsiz" });
    }
  });
}
