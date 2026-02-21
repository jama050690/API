export default function (server) {
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
    preHandler: async (request) => {
      request.log.info("Signup so'rovi keldi");
    },
    handler: async (request, reply) => {
      return reply.code(201).send({ message: "ok" });
    },
  });
}
