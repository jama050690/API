export default function( server ) {

	server.route( {
		method: "GET",
		url: "/signup",
		schema: {
			// request needs to have a querystring with a `name` parameter
			querystring: {
				type: "object",
				properties: {
					name: {
						type: "string"
					}
				},
				required: [ "name" ],
			},
			// the response needs to be an object with an `hello` property of type 'string'
			response: {
				200: {
					type: "object",
					properties: {
						hello: { type: "string" }
					}
				}
			}
		},

		// this function is executed for every request before the handler is executed
		preHandler: async ( request, reply ) => {

			// E.g. check authentication
		},
		handler: async ( request, reply ) => {

			return { message: "hello" }
		}
	} )
}
