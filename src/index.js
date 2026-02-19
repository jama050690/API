import Fastify from "fastify"
import Routes from "./routes/index.js"

const PORT = process.env.PORT
const server = Fastify({ logger: true })

server.register(Routes, { prefix: "/routes" })

server.get("/", () => {
	return { ok: true }
})

server.listen({ port: PORT })
