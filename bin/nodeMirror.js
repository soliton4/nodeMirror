#!/usr/bin/env node

var nodeMirror = require("../lib/nodeMirror.js");
var argv = require("optimist").argv;

if (argv.makemodules){
  nodeMirror._makeModules();
  return;
};

nodeMirror.startServer({
  dir: argv.dir ? argv.dir : process.cwd()
});
