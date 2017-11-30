/*

Emglken port of Hugo
===================

Copyright (c) 2017 Dannii Willis
MIT licenced
https://github.com/curiousdannii/emglken

*/

const EmglkenVM = require( '../../emglken/emglken_vm.js' )

class Hugo extends EmglkenVM
{

	default_options()
	{
		return {
			dirname: __dirname,
			emptfile: 'hugo-core.js.bin',
			module: require( './hugo-core.js' ),
		}
	}
	
	start()
	{
		const data_stream = this.options.Glk.glk_stream_open_memory( this.data, 2, 0 )
		this.vm['_emhugoen']( data_stream.disprock )
		delete this.data
	}

}

module.exports = Hugo