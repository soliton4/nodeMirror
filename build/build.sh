#!/bin/bash

mkdir ../release

rm ../release/nodeMirror -R

echo ---------------------------------------------------------------------------
echo server build
echo ---------------------------------------------------------------------------

cp ../src/build/plugins/* ../src/util/build/plugins/

../src/util/buildscripts/build.sh profile=server.profile.js 

echo ---------------------------------------------------------------------------
echo client build
echo ---------------------------------------------------------------------------

../src/util/buildscripts/build.sh profile=client.profile.js 

echo ---------------------------------------------------------------------------
echo copy
echo ---------------------------------------------------------------------------


mkdir ../release/nodeMirror

cp ../LICENSE ../release/nodeMirror/
cp ../README.md ../release/nodeMirror/
cp ../package.json ../release/nodeMirror/

mkdir ../release/nodeMirror/src
mkdir ../release/nodeMirror/bin
mkdir ../release/nodeMirror/lib

cp ../lib/nodeMirror.js ../release/nodeMirror/lib/
cp ../lib/terminal.js ../release/nodeMirror/lib/
cp ../lib/helpText.js ../release/nodeMirror/lib/
cp ../lib/pty-win ../release/nodeMirror/lib/ -R
cp ../bin/nodeMirror.js ../release/nodeMirror/bin/

cp ../src/index.build.html ../release/nodeMirror/src/index.html
cp ../src/favicon.ico ../release/nodeMirror/src/

mkdir ../release/nodeMirror/src/client
mkdir ../release/nodeMirror/src/client/dojo

cp ../release/client/dojo/dojo.js ../release/nodeMirror/src/client/dojo/
cp ../release/client/dojo/dojo.js.map ../release/nodeMirror/src/client/dojo/
cp ../release/client/dojo/dojo.js.uncompressed.js ../release/nodeMirror/src/client/dojo/
cp -R ../release/client/dojo/nls ../release/nodeMirror/src/client/dojo/
cp -R ../release/client/dojo/resources ../release/nodeMirror/src/client/dojo/
cp -R ../release/client/dojo/selector ../release/nodeMirror/src/client/dojo/

mkdir ../release/nodeMirror/src/dgrid
cp -R ../release/client/dgrid/css ../release/nodeMirror/src/dgrid/

mkdir ../release/nodeMirror/src/dijit
cp -R ../release/client/dijit/nls ../release/nodeMirror/src/dijit/
cp -R ../release/client/dijit/icons ../release/nodeMirror/src/dijit/
# mkdir ../release/nodeMirror/src/dijit/themes
# cp -R ../release/client/dijit/themes/claro ../release/nodeMirror/src/dijit/themes/
cp -R ../release/client/dijit/themes ../release/nodeMirror/src/dijit/

mkdir ../release/nodeMirror/src/dojo
cp -R ../src/dojo/nls ../release/nodeMirror/src/dojo/
cp -R ../src/dojo/_base ../release/nodeMirror/src/dojo/
cp -R ../src/dojo/errors ../release/nodeMirror/src/dojo/
cp -R ../src/dojo/promise ../release/nodeMirror/src/dojo/
cp ../src/dojo/aspect.js ../release/nodeMirror/src/dojo/
cp ../src/dojo/Deferred.js ../release/nodeMirror/src/dojo/
cp ../src/dojo/dojo.js ../release/nodeMirror/src/dojo/
cp ../src/dojo/Evented.js ../release/nodeMirror/src/dojo/
cp ../src/dojo/has.js ../release/nodeMirror/src/dojo/
cp ../src/dojo/json.js ../release/nodeMirror/src/dojo/
cp ../src/dojo/on.js ../release/nodeMirror/src/dojo/
cp ../src/dojo/sniff.js ../release/nodeMirror/src/dojo/
cp ../src/dojo/when.js ../release/nodeMirror/src/dojo/
cp ../src/dojo/topic.js ../release/nodeMirror/src/dojo/

mkdir ../release/nodeMirror/src/dojox
mkdir ../release/nodeMirror/src/dojox/editor
mkdir ../release/nodeMirror/src/dojox/editor/plugins
cp -R ../release/client/dojox/editor/plugins/resources ../release/nodeMirror/src/dojox/editor/plugins/

mkdir ../release/nodeMirror/src/jshint
cp ../release/client/jshint/jshint.js ../release/nodeMirror/src/jshint/

mkdir ../release/nodeMirror/src/server
cp ../release/server/server/server.js ../release/nodeMirror/src/server/

mkdir ../release/nodeMirror/src/style
cp ../release/client/style/style.css ../release/nodeMirror/src/style/

mkdir ../release/nodeMirror/src/image
cp ../src/image/* ../release/nodeMirror/src/image/

mkdir ../release/nodeMirror/src/image/cursor
cp ../src/image/cursor/* ../release/nodeMirror/src/image/cursor/

mkdir ../release/nodeMirror/src/avc
cp ../release/client/avc/Avc.js ../release/nodeMirror/src/avc/
cp ../release/client/avc/avc-codec.js ../release/nodeMirror/src/avc/
cp ../release/client/avc/canvas.js ../release/nodeMirror/src/avc/
cp ../release/client/avc/glUtils.js ../release/nodeMirror/src/avc/
cp ../release/client/avc/util.js ../release/nodeMirror/src/avc/
cp ../release/client/avc/sylvester.js ../release/nodeMirror/src/avc/
cp ../release/client/avc/Wgt.js ../release/nodeMirror/src/avc/
cp ../release/client/avc/worker.js ../release/nodeMirror/src/avc/
cp ../release/client/avc/workeravccodec.js ../release/nodeMirror/src/avc/
cp ../release/client/avc/workerutil.js ../release/nodeMirror/src/avc/

mkdir ../release/nodeMirror/src/modules
mkdir ../release/nodeMirror/src/modules/javascript
cp ../src/modules/javascript/Formatter4.js ../release/nodeMirror/src/modules/javascript/

mkdir ../release/nodeMirror/src/promiseland
cp ../src/promiseland/main.js ../release/nodeMirror/src/promiseland/
cp ../src/promiseland/promiseland.js ../release/nodeMirror/src/promiseland/
cp ../src/promiseland/modules ../release/nodeMirror/src/promiseland/ -R
