// Emglken prefix code for Hugo
(function(){

// Utility to extend objects
function extend()
{
	var old = arguments[0], i = 1, add, name;
	while ( i < arguments.length )
	{
		add = arguments[i++];
		for ( name in add )
		{
			old[name] = add[name];
		}
	}
	return old;
}

var GiDispa
var Glk

var default_options = {
	name: 'hugo',
	//resourcepath: '', // Path to additional resources (.mem, .bin, etc)
}

// Give this Emscripten module the Quixe API
var Module = {

	// Store the data and options
	prepare: function( data, options )
	{
		// If we are not given a glk option then we cannot continue
		if ( !options.Glk )
		{
			throw new Error( 'A reference to Glk is required' )
		}
		GiDispa = options.GiDispa
		Glk = options.Glk
		this.data = data
		this.options = extend( {}, default_options, options )

		// Cache the game signature
		var signature = ''
		var i = 0
		while ( i < 64 )
		{
			signature += ( this.data[i] < 0x10 ? '0' : '' ) + this.data[i++].toString( 16 )
		}
		this.signature = signature

		this.loadMem()
	},

	// Call emgiten()
	init: function()
	{
		// Setup game
		this.ccall(
			'emhugoen',
			null,
			[ 'array', 'number' ],
			[ this.data, this.data.length ],
			typeof EmterpreterAsync === 'undefined' ? {} : { async: true }
		)
		delete this.data
	},

	resume: function( res )
	{
		this.glem_callback( res )
	},

	get_signature: function()
	{
		return this.signature
	},

	// Find the .mem file
	locateFile: function( filename )
	{
		if ( ENVIRONMENT_IS_NODE )
		{
			return __dirname + '/' + filename
		}
		return filename
	},

	// A dummy XHR to delay loading
	memoryInitializerRequest: typeof XMLHttpRequest !== 'undefined' && new XMLHttpRequest(),

	// Load memory in the browser
	loadMem: function()
	{
		if ( ENVIRONMENT_IS_WEB )
		{
			if ( this.options.memdir )
			{
				memoryInitializer = this.options.memdir + '/' + memoryInitializer
			}
			doBrowserLoad()
		}
		delete this.memoryInitializerRequest
	},

	// Load resources
	/*loadResources: function( callback )
	{
		const options = this.options
		const basepath = options.resourcepath + '/' + options.name
		var emptPromise, memPromise

		if ( ENVIRONMENT_IS_NODE )
		{
			const fs = require( 'fs' )
			emptPromise = new Promise( function( resolve, reject )
			{
				fs.readFile( basepath + '.js.bin', function( err, data )
				{
					if ( err )
					{
						reject( err )
					}
					else
					{
						resolve( new ArrayBuffer( data ) )
					}
				})
			})
			memPromise = Promise.resolve()
		}
		if ( ENVIRONMENT_IS_WEB )
		{
			emptPromise = fetch( basepath + '.js.bin' ).then( function ( response ) { return response.arrayBuffer() } )
			memPromise = fetch( basepath + '.js.mem' ).then( function ( response ) { return response.arrayBuffer() } )
		}
		delete this.memoryInitializerRequest

		Promise.all( emptPromise, memPromise )
			.then( function( values )
			{
				var emptData = values[0], memData = values[1]
				Module.emterpreterFile = emptData
				if ( ENVIRONMENT_IS_WEB )
				{
					HEAPU8.set( memData, Runtime.GLOBAL_BASE )
				}
				callback()
			})
	},*/

}