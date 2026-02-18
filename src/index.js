import Fastify from "fastify"

const PORT = process.env.PORT

const server = Fastify( { logger: true } )

server.get( "/", () => {

	return {
		ok: true,
	}
} )

server.listen( { port: PORT } )
