const sharp = require( "sharp" );
const fs = require( "fs" );
const path = require( "path" );

// Retrieve command line arguments
const args = process.argv.slice( 2 );
const directory = args[ 0 ] || ".";
const padding = parseInt( args[ 1 ], 1 ) || 1;

let filename = "spritesheet.png";

// Delete the old spritesheet if it exists
if( fs.existsSync( filename ) ) {
	fs.unlinkSync( filename );
}

fs.readdir( directory, async ( err, files ) => {
	if( err ) {
		console.error( "Error reading directory:", err );
		return;
	}

	const images = files.filter( file => /\.(jpg|jpeg|png|gif)$/i.test( file ) );
	if( images.length === 0 ) {
		console.log( "No images found in the directory." );
		return;
	}

	// Determine the size of the images
	let maxWidth = 0;
	let maxHeight = 0;
	const metadata = {};
	for( const image of images ) {
		const imagePath = path.join( directory, image );
		try {
			metadata[ imagePath ] =  await sharp( imagePath ).metadata();
			maxWidth = Math.max( maxWidth, metadata[ imagePath ].width );
			maxHeight = Math.max( maxHeight, metadata[ imagePath ].height );
		} catch( error ) {
			console.error( `Error reading image ${image}:`, error );
		}
	}

	const grid = Math.ceil( Math.sqrt( images.length ) );
	const spriteWidth = maxWidth + padding;
	const spriteHeight = maxHeight + padding;
	const canvasWidth = grid * spriteWidth;
	const canvasHeight = grid * spriteHeight;

	const spritesheet = sharp( {
		create: {
			"width": canvasWidth,
			"height": canvasHeight,
			"channels": 4,
			"background": { "r": 0, "g": 0, "b": 0, "alpha": 0 }
		}
	} );

	const sprites = [];
	images.forEach( ( image, index ) => {
		const imagePath = path.join( directory, image );
		const row = Math.floor( index / grid );
		const col = index % grid;

		// Center the sprites horizontally
		const x = col * spriteWidth + Math.floor( ( maxWidth - metadata[ imagePath ].width ) / 2 );

		// Put the sprites at the bottom of the canvas
		const y = row * spriteHeight + maxHeight - metadata[ imagePath ].height;
		console.log( imagePath, x, y );
		sprites.push( { "input": imagePath, "top": y, "left": x } );
	} );

	spritesheet.composite( sprites );
	console.log( "Creating spritesheet:", filename );
	spritesheet.toFile( filename, ( err, info ) => {
		if( err ) {
			console.error( "Error creating spritesheet:", err );
			return;
		}
		console.log( "Spritesheet created:", info );
	} );
} );

