# heglk makefile for emglken

GLK = emglken
TARGET=hugo-core.js

# Directory defaults--these may have to be changed depending on where
# things live on your system.  It assumes the layout:
#	hugo/source - portable Hugo sources (SOURCE_DIR)
#	hugo/heglk  - this directory (NONPORTABLE_DIR)
#	hugo/xglk   - XGlk library directory (with glk.h and libxglk.a)
SOURCE_DIR=../source
NONPORTABLE_DIR=.
GLK_DIR=../../$(GLK)
XLIB_DIR=/usr/lib

# PORT_NAME is for file-naming:
PORT_NAME=glk

GLKINCLUDEDIR = $(GLK_DIR)
CC = emcc \
	-O3

LINK_OPTS = \
	--js-library $(GLKINCLUDEDIR)/library.js \
	-s EMTERPRETIFY=1 \
	-s EMTERPRETIFY_ASYNC=1 \
	-s EMTERPRETIFY_FILE='"hugo-core.js.bin"' \
	-s EMTERPRETIFY_WHITELIST='"@whitelist.json"' \
	-s EXPORTED_FUNCTIONS='["_emhugoen"]' \
	-s MODULARIZE=1 \
	-s WASM=0

#	-s ASYNCIFY=1 \
#	-s ASYNCIFY_FUNCTIONS='["glem_fileref_create_by_prompt","glem_select"]' \

include $(GLKINCLUDEDIR)/Make.$(GLK)

COMPILE=$(CC)
LINK=$(CC)

DEFINES=-DCOMPILE_V25 -DGLK -DNO_KEYPRESS_CURSOR -DHUGO_INLINE=static\ inline
WFLAGS=-Wall
OFLAGS=-O3
#DFLAGS=-g2
CFLAGS=-I$(SOURCE_DIR) -I$(GLK_DIR) $(WFLAGS) $(OFLAGS) $(DFLAGS) $(DEFINES) -c

OBJ_EXT=o
NONPORTABLE_OBJS=he$(PORT_NAME).$(OBJ_EXT) emhugoen.$(OBJ_EXT)

OBJS=he.$(OBJ_EXT) heexpr.$(OBJ_EXT) hemisc.$(OBJ_EXT) heobject.$(OBJ_EXT) heparse.$(OBJ_EXT) heres.$(OBJ_EXT) herun.$(OBJ_EXT) heset.$(OBJ_EXT) stringfn.$(OBJ_EXT) $(NONPORTABLE_OBJS)

hugo-core.js: Makefile $(OBJS) $(GLKINCLUDEDIR)/Make.$(GLK) $(GLKINCLUDEDIR)/libemglken.a $(GLKINCLUDEDIR)/library.js
	$(LINK) $(LINK_OPTS) -o $(TARGET) $(OBJS) -L$(GLK_DIR) -L$(XLIB_DIR) -lX11 $(GLKLIB)

clean:
	rm -f $(OBJS) hugo-core.js*

# Portable sources:

$(OBJS): $(SOURCE_DIR)/heheader.h

he.$(OBJ_EXT): $(SOURCE_DIR)/he.c
	$(COMPILE) $(CFLAGS) $(SOURCE_DIR)/he.c

heexpr.$(OBJ_EXT): $(SOURCE_DIR)/heexpr.c
	$(COMPILE) $(CFLAGS) $(SOURCE_DIR)/heexpr.c

hemisc.$(OBJ_EXT): $(SOURCE_DIR)/hemisc.c
	$(COMPILE) $(CFLAGS) $(SOURCE_DIR)/hemisc.c

heobject.$(OBJ_EXT): $(SOURCE_DIR)/heobject.c
	$(COMPILE) $(CFLAGS) $(SOURCE_DIR)/heobject.c

heparse.$(OBJ_EXT): $(SOURCE_DIR)/heparse.c
	$(COMPILE) $(CFLAGS) $(SOURCE_DIR)/heparse.c

heres.$(OBJ_EXT): $(SOURCE_DIR)/heres.c
	$(COMPILE) $(CFLAGS) $(SOURCE_DIR)/heres.c

herun.$(OBJ_EXT): $(SOURCE_DIR)/herun.c
	$(COMPILE) $(CFLAGS) $(SOURCE_DIR)/herun.c

heset.$(OBJ_EXT): $(SOURCE_DIR)/heset.c
	$(COMPILE) $(CFLAGS) $(SOURCE_DIR)/heset.c

stringfn.$(OBJ_EXT): $(SOURCE_DIR)/stringfn.c
	$(COMPILE) $(CFLAGS) $(SOURCE_DIR)/stringfn.c


# Non-portable sources:

he$(PORT_NAME).$(OBJ_EXT): $(NONPORTABLE_DIR)/he$(PORT_NAME).c
	$(COMPILE) $(CFLAGS) $(NONPORTABLE_DIR)/he$(PORT_NAME).c

emhugoen.$(OBJ_EXT): $(NONPORTABLE_DIR)/emhugoen.c
	$(COMPILE) $(CFLAGS) $(NONPORTABLE_DIR)/emhugoen.c

heglkunix.o: $(NONPORTABLE_DIR)/heglkunix.c
	$(COMPILE) $(CFLAGS) $(NONPORTABLE_DIR)/heglkunix.c
