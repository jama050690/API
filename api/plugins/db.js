import pg from "pg";

const { Pool } = pg;

export default async function dbPlugin(server) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  server.decorate("db", pool);

  server.addHook("onClose", async () => {
    await pool.end();
  });
}
