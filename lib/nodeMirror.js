/*
  this is a little chaotic - sorry. i focused on the part within the amd modules
  
  
  the whole app is a dojo app. this is just to initialize the dojo loader and to make the app restartable
*/


var dirName = __dirname;
console.log(dirName);

var Server = function(parConfig){
  var self = this;
  self.config = parConfig;
  
  console.log(parConfig);

  if (!self.config.dir){
    self.config.dir = dirName + "/..";
  };
  self.config.static = dirName + "/../src";
  
  
  console.log("Starting NodeMirror...");
  console.log("dir:" + self.config.dir);
    
  var runFun = function(){
    var loadModule = "server/server";
    
    // Configuration Object for Dojo Loader:
    dojoConfig = {
      baseUrl: dirName + "/../src/", // Where we will put our packages
      async: 1, // We want to make sure we are using the "modern" loader
      hasCache: {
        "host-node": 1, // Ensure we "force" the loader into Node.js mode
        "dom": 0 // Ensure that none of the code assumes we have a DOM
      , "serverModules": 1
      }
      , useDeferredInstrumentation: false
      // While it is possible to use config-tlmSiblingOfDojo to tell the
      // loader that your packages share the same root path as the loader,
      // this really isn't always a good idea and it is better to be
      // explicit about our package map.
      , packages: [{
        name: "dojo",
        location: "dojo"
      },{
        name: "main",
        location: "main"
      },{
        name: "sol",
        location: "sol"
      },{
        name: "server",
        location: "server"
      }, {
        name: "modules"
      , location: "modules"
      }],
      deps: [ loadModule ] // And array of modules to load on "boot"
      , __dirname: self.config.dir
      , nodeMirrorConfig: self.config
    };
    
    // Now load the Dojo loader
    require("../src/dojo/dojo.js");
    
  };
  
  if (self.config.restartableObj){
    runFun();
  }else{
    require("restartable")(function(parRestartableObj){
      console.log("setting restartableObj");
      self.config.restartableObj = parRestartableObj;
      runFun();
    });
  };
  
};

var _Server = {
  
};
Server.prototype = _Server;


var NodeMirror = function(){
};

_NodeMirror = {
  startServer: function(par){
    if (this.server){
      throw {
        msg: "nodeMirror allready running!"
      };
    };
    this.config = par;
    return new Server(par);
  }
  , getConfig: function(){
    return this.config;
  }
};
NodeMirror.prototype = _NodeMirror;


module.exports = new NodeMirror();
