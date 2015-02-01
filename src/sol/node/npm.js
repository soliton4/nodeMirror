define([
  "dojo/node!npm"
  , "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/_base/lang"
], function(
  npm
  , declare
  , Deferred
  , lang
){
  
  var npmPs = new Deferred();
  npm.load({}, function(err){
    if (err){
      console.log(err);
      npmPs.reject(err);
      return;
    };
    npmPs.resolve(npm);
  });
  
  return {
    //{
    //  name
    //  onInstall
    //  onError
    //  onLoad
    //}
    load: function(par){
      var def = new Deferred();
      if (par.onLoad){
        def.then(par.onLoad);
      };
      if (par.onError){
        def.then(undefined, par.onError);
      };
      
      try {
        if (par.require){
          def.resolve(par.require(par.name));
          return;
        };
        require(["dojo/node!" + par.name], function(module){
          def.resolve(module);
          return;
        });
      }catch(err){
        console.log(err);
      
        npmPs.then(function(npm){
          if (par.onInstall){
            try{
              par.onInstall(par);
            }catch(e){
              console.log(e);
            };
          };
          console.log("installing npm");
          npm.commands.install([par.name], function(err, data){
            console.log("..x.");
            if (err){
              console.log(err);
              def.reject(err);
              return;
            };
            try{
              //var pathStr = process.cwd() + "/" + data[0][1];
              //require(["dojo/node!" + pathStr], function(module){
              if (par.require){
                console.log("got require");
                def.resolve(par.require(par.name));
                return;
              };
              require(["dojo/node!" + par.name], function(module){
                console.log("module:");
                console.log(module);
                def.resolve(module);
                return;
              });
              
            }catch(e){
              def.reject(e);
            };
          });
        });
        
      };
      
      return def;
    }
  };
  
});
