export default function( server ) {

	server.get( "/", () => {

		server.log.info( "Homepage ga kirildi" )
			// server.log.warm( "Homepage ga kirildi" )
			// server.log.error( "Homepage ga kirildi" )

		return "Home"
	} )
}
