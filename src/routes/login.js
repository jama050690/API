export default function (server) {
  server.route({
    method: "POST",
    url: "/login",
    schema: {
      // request needs to have a body with `username` and `password`
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
      // the response needs to be an object with a `message` property
      response: {
        201: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },

    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
      return reply.code(201).send({ message: "ok" });
    },
  });
}
