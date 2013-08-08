## Description

A IDE build around CodeMirror.net.  
If you dont know CodeMirror.net, please check it out. Its a great Project.  
This projects aim is to follow the CodeMirror philosophy of pluginability and simplistic approach to give you a full (Web)Developer IDE.  
So all you need is:  
- a Computer (i recommend a unix machine) - update 0.0.15 it runs in win  
- node.js and the knowledge how to start it  
- this Project  

and you have answered the Question about which Editor to choose.  
You will be able to edit your code from anywhere you want. if you dont like the colors you just change em. if support for a mimetype is missing you can just add it.  
You will never again have to be frustrated about a missing feature within your IDE because you can just add it. At least if you know JavaScript.  
  
For every Content Type where a CodeMirror Mode exists, a CodeMirror instance will be opened. Also every content Type starting with text/* will be opened using CodeMirror.  
For all other files there is a download button.

features:  
 - view / edit all content/types supported by CodeMirror.net  
 - view / edit all files in text mode or download them  
 - html tester / analyzer  
 - .less tester / .less online help / save your .less file immediately as .css file  
 - awesome hexeditor  
 - integrated pegjs parser debugger  
 - download directories as zip files (buggy)   
 

## Security  
  
pass username and password to secure your local files from being hacked  


## Usage  

`
npm install node-mirror  
`  
  
`
node node_modules/node-mirror/bin/nodeMirror.js --port 3000 --dir /home/sol/projects --username sol --password mysupersecretpassword
`  

`
http://127.0.0.1:3000/  
`

this is still beta. but i am using this for development so you can expect more.  
i am getting pretty comfortable with this project. maybe i will release 0.1 soon.

the npm distribution is a release build  

check out my git page to get the development version which you can use to customize node-mirror  
there is a build script that lets you build your own node-mirror  

## License

BSD - maybe i will relicense it under MIT when i have found out what the differences are
