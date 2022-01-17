const functions = require( "firebase-functions" )

/* ///////////////////////////////
// JSON updater
// /////////////////////////////*/
const { source_files_to_json, source_path } = require( './modules/storage' )
exports.source_files_to_json = functions.storage.object().onFinalize( ( file, context ) => {

	// If this was not a mobile app file, do not update
	if( !file.name.includes( source_path ) ) {
		console.log( `Updated file not a mobile file: `, JSON.stringify( file ) )
		return false
	}

	// If this is a new mobile file, deploy a new json version
	return source_files_to_json()

} )
