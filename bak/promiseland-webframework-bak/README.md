promiseland-webframework
========================

makes it incredibly simple to create a webapp using only promiseland modules.  
you dont have to take care of the html part at all.  
  
you can of course use as many classical js modules as you want.  
  
## usage:  
  
```
  var Fw = require ("promiseland-webframework");
  var fw = new Fw({
    load: "app/app",
    dirs: [{
      client: "/app",
      server: __dirname + "/app/"
    }],
    css: "mycssfile.css"
  });
  fw.listen(3000);
```  
  
the example above will create a http server.  
the directory app will be routed to the web under /app.  
on the client the module "app/app" will be loaded.  
a framename server is available on the client side and a framename client on the server side.  
the server listens on port 3000.  
  
## details  
  
Fw takes a configuration parameter.
```
  var Fw = require ("promiseland-webframework");
  var fw = new Fw(<config>);
```  
  
the configuration options are:  
  - requireConfig  
    simply the config object passed to requirejs on the client side. make sure it can be json-stringified. the package configuration for promiseland will be added automatically.  
  - load  
    string / array  
    the module / modules to load on client side
  - dirs  
    array  
    directories served to the client. express["static"] is used to serve them. each entry in the array is a object containing a "server" and a "client" property giving the path to the directory on each side.  
    3 predefined directories exist: /promiseland; /requirejs; /frameworkClient
    also socket.io defines its resource. pls refer to the socket.io docu.
  - css
    a string or a array of strings of the css files you want to load in your webapp
    
the return value:  
  new Fw creates a object that contains the following properties:  
  - app  
    the express app
  - http  
    the http server object
  - config
    the config object
  - clientProfile
    the client frame profile. (name is subject to change)
  - socketio
    the socket.io object
    
  the return value also contains a listen method that you must pass a port number parameter.
  
##sum it up
  
  you wont need any of the return values to create a simple app with client / server interaction.  
  simply create a Framework object with your desired directories to be served and go.  
  
  have a look at test.pland in the root directory for a simple demo.  
  
  if you are using the framework from javascript (non promiseland) you might get a promise when you do the require. simply call .then on it with a callback and you get the framework object.  
  
  
## licence
  
  you can use it as a template for your webapp. yes you can use it for commercial products. the copyright belongs to matthias behrens. the framework is licenced under the bsd licence. promiseland is licenced under lgplv3