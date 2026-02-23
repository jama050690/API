import argon2 from "argon2";

export default function (server) {
  server.route({
    method: "POST",
    url: "/login",
    schema: {
      body: {
        type: "object",
        additionalProperties: false,
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
          },
        },
        required: ["email", "password"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    preHandler: async (request) => {
      request.log.info("Login so'rovi keldi");
    },
    handler: async (request, reply) => {
      const { email, password } = request.body;

      // Foydalanuvchini bazadan topish
      const result = await server.db.query(
        "SELECT id, username, email, password FROM users WHERE email = $1",
        [email]
      );
      if (result.rows.length === 0) {
        return reply.code(401).send({ message: "Email yoki parol noto'g'ri" });
      }

      const user = result.rows[0];

      // Parolni tekshirish
      const valid = await argon2.verify(user.password, password);
      if (!valid) {
        return reply.code(401).send({ message: "Email yoki parol noto'g'ri" });
      }

      // JWT token yaratish
      const token = server.jwt.sign({ id: user.id, username: user.username, email: user.email });

      return reply
        .setCookie("token", token, {
          path: "/",
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .code(200)
        .send({ message: "Muvaffaqiyatli kirdingiz" });
    },
  });
}
