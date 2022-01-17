const { bucket } = require( './firebase' )
const { log } = require( './helpers' )

// Mobile app source path
const source_path = `mobile_app_images`

async function source_files_to_json(  ) {


	try {

		// Get all files and folders
		const [ files ] = await bucket.getFiles( {
			prefix: source_path
		} )
		log( 'Found files: ', files )

		// Format a json object based on these files
		const json = files.reduce( ( acc, val ) => {

			log( 'Handling ', val.id )

			log( 'Parsing ', val.metadata )
			const { name: filepath, mediaLink } = val.metadata
			const [ match, folder, filename ] = filepath.match( new RegExp( `(?:${source_path})(?:/)(.*)(?:/)(.*..*)` ) ) || []

			// Skip folders
			if( !match || !filename ) return acc

			if( acc[ folder ] ) acc[ folder ].push( mediaLink )
			else acc[ folder ] = [ mediaLink ]

			return acc

		}, {} )
		log( 'Formatted JSON: ', JSON.stringify( json, null, 2 ) )

		// Make all files public
		await Promise.all( files.map( file => file.makePublic() ) )

		// Write newly formatted json to public API
		const annotatedJson = {
			...json,
			meta: {
				updated: Date.now(),
				updated_human: new Date().toString()
			}
		}
		const minifiedJSON = JSON.stringify( annotatedJson )
		const api_file = bucket.file( `api/poap_images.json` )
		await api_file.save( minifiedJSON )

		// Make public
		await api_file.makePublic()
		return api_file.publicUrl()

	} catch( e ) {
		console.error( `Error in source_files_to_json: `, e )
	}

}

module.exports = {
	source_files_to_json,
	source_path
}