// Emscripten startup code for Hugo

#ifndef EMHUGOEN_H
#define EMHUGOEN_H

#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include "glk.h"
#include "emglken.h"

extern void emhugoen( glui32 gameStreamTag );

extern winid_t mainwin;
extern winid_t currentwin;

#endif // EMHUGOEN_H