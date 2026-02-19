export default function (server) {
  server.route({
    method: "POST",
    url: "/signup",
    schema: {
      // request needs to have a body with a `name` parameter
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
      // the response needs to be an object with an `message` property of type 'string'
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
