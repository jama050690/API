import argon2 from "argon2";
export default function (server) {
  // Oddiy router uchun;
  // server.get("/",{
  //   config:{
  //     rateLimit:false,
  //   }
  // })
  server.route({
    method: "POST",
    url: "/signup",
    schema: {
      body: {
        type: "object",
        additionalProperties: false,
        properties: {
          fullname: {
            type: "string",
          },
          username: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
          },
        },
        required: ["fullname", "username", "email", "password"],
      },
      response: {
        201: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    config: {
      rateLimit: false,
    },
    preHandler: async (request) => {
      request.log.info("Signup so'rovi keldi");
    },
    handler: async (request, reply) => {
      const { fullname, username, email, password } = request.body;

      // Username yoki email allaqachon mavjudligini tekshirish
      const existing = await server.db.query(
        "SELECT id FROM users WHERE username = $1 OR email = $2",
        [username, email]
      );
      if (existing.rows.length > 0) {
        return reply.code(409).send({ message: "Username yoki email allaqachon mavjud" });
      }

      // Parolni hash qilish
      const hashedPassword = await argon2.hash(password);

      // Bazaga yozish
      await server.db.query(
        "INSERT INTO users (fullname, username, email, password) VALUES ($1, $2, $3, $4)",
        [fullname, username, email, hashedPassword]
      );

      return reply.code(201).send({ message: "Ro'yxatdan muvaffaqiyatli o'tdingiz" });
    },
  });
}
