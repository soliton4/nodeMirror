## Description

Do you know CodeMirror.net?  
Its an awesome js library to create a codeeditor. if you dont know it check it out pls.  
This projects aim is to follow the CodeMirror philosophy of pluginability and simplistic approach to give you a full (Web)Developer IDE.  
So all you need is:  
- a Computer (i recommend a unix machine)
- node.js and the knowledge how to start it
- this Project

and you have answered the Question about which Editor to choose.  
You will be able to edit your code from anywhere you want. if you dont like the colors you just change em. if support for a mimetype is missing you can just add it.  
You will never again have to be frustrated about a missing feature within your IDE because you can just add it. At least if you know JavaScript.

## Security

ATTENTION! there is no security build in right now. this is a eary release and i had no focus on security.  
make sure the port you are running node-mirror on is not open for public access. if anyone can access the port you are running node-mirror on, he will have full access to your file system.  

## Usage

`
npm install node-mirror
node node_modules/node-mirror/bin/nodeMirror.js --port 3000 --dir /home/sol/projects
`

`
http://127.0.0.1:3000/index.html
`

this is still early alpha. but i am using this for development so you can expect more.  

the npm distribution is a release build  

check out my git page to get the development version which you can use to customize node-mirror  

## License

BSD - maybe i will relicense it under MIT when i have found out what the differences are
