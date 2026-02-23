export default function (server) {
  server.route({
    method: "POST",
    url: "/login",
    schema: {
      body: {
        type: "object",
        additionalProperties: false,
        properties: {
          username: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
        required: ["username", "password"],
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
    preHandler: async (request) => {
      request.log.info("Login so'rovi keldi");
    },
    handler: async (request, reply) => {
      return reply.code(201).send({ message: "ok" });
    },
  });
}
