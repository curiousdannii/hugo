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
		this.vm.ccall(
			'emhugoen',
			null,
			[ 'array', 'number' ],
			[ this.data, this.data.length ],
			{ async: true }
		)
		delete this.data
	}

}

module.exports = Hugo