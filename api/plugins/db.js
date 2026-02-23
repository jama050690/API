import pg from "pg";
import fp from "fastify-plugin";

const { Pool } = pg;

async function dbPlugin(server) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  server.decorate("db", pool);

  // Jadvallarni avtomatik yaratish
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      fullname TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  server.addHook("onClose", async () => {
    await pool.end();
  });
}

export default fp(dbPlugin);
