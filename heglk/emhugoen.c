// Emscripten startup code for Hugo

#include <stdlib.h>
#include <stdio.h>
#include "glk.h"
#include "heheader.h"
#include "emhugoen.h"

void emhugoen(char * data, glui32 dataSize)
{
    // Initialise emglken
    init_emglken();

    /* Open the main window... */
	mainwin = glk_window_open(0, 0, 0, wintype_TextBuffer, 1);

	/* ...and set it up for default output */
	glk_set_window(currentwin = mainwin);

	/* It's possible that the main window failed to open. There's
	   nothing we can do without it, so exit */
	if (!mainwin)
		return;

    // Set up the game stream
    game = glk_stream_open_memory( data, dataSize, filemode_Read, 0 );

    time_t seed;

	/* Seed the random number generator */
#if !defined (RANDOM)
	srand((unsigned int)time((time_t *)&seed));
#else
	SRANDOM((unsigned int)time((time_t *)&seed));
#endif

	hugo_init_screen();

#if defined (DEBUGGER)
	debug_getinvocationpath(argv[0]);
	SwitchtoGame();
#endif
	SetupDisplay();

	strcpy(pbuffer, "");

	gameseg = 0;

	LoadGame();

#if defined (DEBUGGER)
	LoadDebuggableFile();
	StartDebugger();
#endif

	RunGame();

	hugo_cleanup_screen();

	hugo_blockfree(mem);
	mem = NULL;
	hugo_closefiles();
	glk_exit();
}