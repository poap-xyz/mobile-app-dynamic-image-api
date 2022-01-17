const dev = !!process.env.development

// Dev Logger
const log = ( ...comments ) => {
	if( dev ) console.log( ...comments )
}


module.exports = {
	log,
	dev
}
