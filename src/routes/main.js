export default function( server ) {

	server.get( "/", () => {

		server.log.info( "Homepage ga kirildi" )

		return "Home"
	} )
}
