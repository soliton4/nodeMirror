## tldr  
  
  --> [screenshots](#screenshots)
  
## Description

Develop your App completely within the Browser.  
Administrate your Server and edit your Code from where ever you are.  
  
NodeMirror is a IDE utilizing CodeMirror.net, pty.js and other cool libraries.  
  
I wrote it to fit the needs of a Developer and to make maximal usage of the CodeMirror Editor library.  
Giving you a Powerful IDE and Admin tool.  

Ever asked yourself which Editor you should choose? This is trying to answer that Question once and for all ;)
  
  
## Requirements  
  
  - a Unix / Windows Computer
  - node.js
  - the ability to start a node.js app
  
  
## Customizablity
  
  NodeMirror is open Source. You can easily customize it to your needs.  
  Everything is a module. If you are missing some functionality let me know or fork it and write a module.
  
  
## features include:
  
 - view / edit all content/types supported by CodeMirror.net  
 - view / edit all files in text mode or download them  
 - html tester / analyzer  
 - .less tester / .less online help / save your .less file immediately as .css file  
 - awesome hexeditor  
 - integrated pegjs parser debugger  
 - download directories as zip files (alpha)   
 - Terminals (!)  
 - more ...  
  
  
## Files Module  
  
For every Content Type where a CodeMirror Mode exists, a CodeMirror instance will be opened. Also every content Type starting with text/* will be opened using CodeMirror.  
For all other files there is a download button or a Hex Editor.  
If a file is opened for which no native Text Mode exists it will be opened in a Hex Editor. You can switch between hex view and text view.
  
  
## Terminal Module  
  
utilizing pty.js nodeMirror allows you to have several terminals within your browser. the Terminals will stay open when you close your browser window. You can even have the same terminal open on different browsers / machines opening new possibilities for collaboration.   
  
  
## Security  
  
pass username and password to secure your local files from being hacked  
  
  
## Usage  
  
```
npm install node-mirror  
  
node node_modules/node-mirror/bin/nodeMirror.js --port 3000 --dir /home/sol/projects --username sol --password mysupersecretpassword
```

```
http://127.0.0.1:3000/  
```
  
  
## miscellaneous  
  
i am using this for my development so you can expect more.  
  
the npm distribution is a release build  
check out my git page to get the development version which you can use to customize NodeMirror  
call the build script to make your own version of NodeMirror  

```
cd build  
./build.sh  
```  
  
to switch of the terminal or the experimental debugger use this command line parameters  
  
```
node node_modules/node-mirror/bin/nodeMirror.js --no-terminal --no-debug
```  

## Special Thanks  
  
* CodeMirror ( http://codemirror.net/ )  
for creating the most developer friendly editor  
  
* pty.js ( https://github.com/chjj/pty.js )  
for making terminals in node.js possible  
  
* all the contributers, testers and users  
for making this a great IDE  
  
  
## screenshots
  
![Folder view](https://raw.github.com/soliton4/nodeMirror/master/src/image/screenshots/nodeMirrorFolder.png)
  Browse your project folder  
  
![JavaScript Editor](https://raw.github.com/soliton4/nodeMirror/master/src/image/screenshots/nodeMirrorJavaScript.png)
  edit JavaScript with online Syntax Check  
  
![JavaScript Editor](https://raw.github.com/soliton4/nodeMirror/master/src/image/screenshots/nodeMirrorHexEditor.png)
  edit huge Files with the Hex Editor  
  
![Terminal](https://raw.github.com/soliton4/nodeMirror/master/src/image/screenshots/nodeMirrorTerminal.png)
  Yes you can use midnight commander in your Browser with your Mouse(!)  
  Thank you pty.js  
  
![less](https://raw.github.com/soliton4/nodeMirror/master/src/image/screenshots/nodeMirrorLess.png)
  Have less online help available while testing your less file before saving it parallel as .less and .css file.  
  
![html](https://raw.github.com/soliton4/nodeMirror/master/src/image/screenshots/nodeMirrorHtml.png)
  test and analyse your HTML  
  
![peg.js](https://raw.github.com/soliton4/nodeMirror/master/src/image/screenshots/nodeMirrorPegJs.png)
  try out that cool parser you just wrote  
  
  
## whats to expect for 0.2?
  
  - JavaScript debugging
  - more CodeMirror feature integrations
  
  
## Contributions welcome!
  
  i am a good coder but my gui designs are poor.  
  while i am happy about all kinds of contributions i especially ask for icon designs / css.  
  
  
## License

BSD
