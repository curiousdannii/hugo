# heglk makefile for emglken

GLK = emglken
TARGET=hugo.js

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
	-O3 \
	--js-library $(GLKINCLUDEDIR)/library.js \
	--pre-js pre.js \
	--post-js post.js \
	-s EMTERPRETIFY=1 \
	-s EMTERPRETIFY_ASYNC=1 \
	-s EMTERPRETIFY_WHITELIST='["_AP", "_AddAllObjects", "_Available", "_CallLibraryParse", "_CallRoutine", "_ContextCommand", "_Dict", "_DisplayPicture", "_EvalExpr", "_FileIO", "_Flushpbuffer", "_GetCommand", "_GetProp", "_GetResourceParameters", "_GetVal", "_GetValue", "_InitGame", "_IsIncrement", "_LoadGame", "_MatchCommand", "_MatchObject", "_MatchWord", "_Name", "_ObjWordType", "_Parse", "_ParseError", "_PlayMusic", "_PlaySample", "_PlayVideo", "_Printout", "_PromptMore", "_RecordCommands", "_RestoreGameData", "_RunEvents", "_RunGame", "_RunIf", "_RunInput", "_RunMove", "_RunPrint", "_RunRestart", "_RunRestore", "_RunRoutine", "_RunSave", "_RunScriptSet", "_RunSet", "_RunString", "_RunSystem", "_RunWindow", "_SetCompound", "_SetupExpr", "_TryObj", "_ValidObj", "_emhugoen", "_glem_fileref_create_by_prompt", "_glem_select", "_glk_fileref_create_by_prompt", "_glk_select", "_hugo_getline", "_hugo_timewait", "_hugo_waitforkey"]' \
	-s EXPORT_NAME='"Hugo"' \
	-s EXPORTED_FUNCTIONS='["_emhugoen"]'

#	-s ASYNCIFY=1 \
#	-s ASYNCIFY_FUNCTIONS='["glem_fileref_create_by_prompt","glem_select"]' \
#	-s EMTERPRETIFY_FILE='"hugo.js.bin"' \

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

hugo.js: Makefile pre.js post.js $(OBJS) $(GLKINCLUDEDIR)/Make.$(GLK) $(GLKINCLUDEDIR)/libemglken.a $(GLKINCLUDEDIR)/library.js
	$(LINK) -o $(TARGET) $(OBJS) -L$(GLK_DIR) -L$(XLIB_DIR) -lX11 $(GLKLIB)

clean:
	rm -f $(OBJS) hugo.js*

# Portable sources:

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
