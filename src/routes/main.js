export default function( server ) {

	server.get( "/", () => {

		server.log.info( "Homepage ga kirildi" )
			// server.log.warm( "Homepage ga kirildi" )
			// server.log.error( "Homepage ga kirildi" )

		return "Home"
	} )

  server.get("/db-check", async () => {
    const result = await server.db.query("SELECT NOW() AS now");
    return { ok: true, now: result.rows[0].now };
  });
}
