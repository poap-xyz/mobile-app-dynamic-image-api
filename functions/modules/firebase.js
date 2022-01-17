// Firebase interactors
const { initializeApp } = require("firebase-admin/app")
const { getFirestore, FieldValue } = require( 'firebase-admin/firestore' )
const app = initializeApp()
const db = getFirestore( app )
const { log, dev } = require( './helpers' )

const { getStorage } = require( 'firebase-admin/storage' )
const storage = getStorage()
const bucket = storage.bucket()

const dataFromSnap = ( snapOfDocOrDocs, withDocId=true ) => {
	
	// If these are multiple docs
	if( snapOfDocOrDocs.docs ) return snapOfDocOrDocs.docs.map( doc => ( { uid: doc.id, ...doc.data( ) } ) )

	// If this is a single document
	return { ...snapOfDocOrDocs.data(), ...( withDocId && { uid: snapOfDocOrDocs.id } ) }

}

const throw_if_invalid_context = context => {

	if( dev ) return log( '⚠️ DEV detected, skipping app context check' )

	// Appcheck validation
	if( context.app == undefined ) {
		throw new Error( `App context error` )
	}

}


module.exports = {
	db: db,
	app: app,
	dataFromSnap: dataFromSnap,
	increment: FieldValue.increment,
	throw_if_invalid_context,
	bucket
}
