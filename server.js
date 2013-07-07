// The module to "bootstrap"

/*var originalfun = console.log
var consoleOutput = "";

console.log = function(par){
  originalfun.apply(console, arguments);
  consoleOutput += par;
}

console.log(consoleOutput);*/

console.log("Starting ...");

var cluster = require('cluster');

if (cluster.isMaster) {
  // Fork workers.
  
  var startClone;
  startClone = function(worker, code, signal){
    var kid = cluster.fork();
    kid.on("exit", startClone);
  };
  startClone();
  return;
  
};


var loadModule = "server/server";

// Configuration Object for Dojo Loader:
dojoConfig = {
    baseUrl: "src/", // Where we will put our packages
    async: 1, // We want to make sure we are using the "modern" loader
    hasCache: {
        "host-node": 1, // Ensure we "force" the loader into Node.js mode
        "dom": 0 // Ensure that none of the code assumes we have a DOM
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
    }],
    deps: [ loadModule ] // And array of modules to load on "boot"
    , __dirname: __dirname
};
 
// Now load the Dojo loader
require("./src/dojo/dojo.js");


