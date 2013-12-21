module.exports = "usage: \n\
 installed binary: \n\
  nodeMirror [options]\n\
 \n\
 github version: \n\
  node bin/nodeMirror.js [options]\n\
 \n\
 npm version: \n\
  node node_modules/nodeMirror/bin/nodeMirror.js [options]\n\
  \n\
 --dir <folder> \n\
  the folder you want to edit \n\
  the folder is served as web server under <webpath>/file/\n\
  defaults to \".\"\n\
 \n\
 --port <number>\n\
  http ip port\n\
  defaults to 3000\n\
 \n\
 --username <username> --password <pwd>\n\
 \n\
 --webpath \"/url/\" \n\
  the path nodeMirror will be available in your url\n\
 \n\
  Example: \n\
   --webpath editor\n\
 \n\
  leading and trailing \"/\" are autocompleted.\n\
  defaults to \"/\"\n\
 \n\
 \n\
 --no-terminal\n\
  disable terminal module \n\
 \n\
 --no-music\n\
  );\n\
 \n\
 --no-debug\n\
  disable debugger module\n\
 \n\
 leave \"no-\" to activate the modules\n\
 \n\
 \n\
webbrowser: \n\
 http://127.0.0.1:<port>/[<webpath>]\n\
";
