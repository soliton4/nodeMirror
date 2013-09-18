#!/bin/bash

mkdir ../release

rm ../release/nodeMirror -R

../src/util/buildscripts/build.sh profile=server.profile.js 
