define([
  "main/modules"
  , "dojo/_base/array"
  , "dojo/Deferred"
  , "dojo/_base/declare"
  , "main/_RemoteCall"
  , "dojo/_base/lang"
], function(
  modules
  , array
  , Deferred
  , declare
  , _RemoteCall
  , lang
){
  
  var ModuleLoader = declare([], {
    
    modules: []
    , namedModules: {}
    
    , register: function(parModule, parModuleId){
      this.modules.push(parModule);
      this.namedModules[parModuleId] = parModule;
    }
    
    , getModule: function(parModuleId){
      return this.namedModules[parModuleId];
    }
    
    , findModulePs: function(par){
      
      var def = new Deferred();
      var cont = true;
      var i = this.modules.length; // all modules in reverse order
      
      if (par.force){
        try{
          console.log("force:" + par.force);
          var module = this.getModule(par.force);
          if (module){
            def.resolve(module);
            return def;
          }
        }catch(e){
          console.log(e);
        };
      };
      
      var loop;
      loop = lang.hitch(this, function(){
        if (cont && i){
          --i;
          var module;
          try{
            module = this.modules[i];
            module.isCompetentPs(par).then(function(){
              def.resolve(module);
              return;
            }, loop); // calls itself when it is rejected
          }catch(e){
            console.log(e);
            loop();
          };
        }else{
          def.reject();
        };
      });
      loop();
      
      return def;
    }
    
  });
  moduleLoader = new ModuleLoader();
  
  
  var loader = {  // loads all the required modules, registers them and returns the moduleLoader Object
    
    load: function(id, require, load){
      //if (has("server-modules")){
      require(modules, function(){
        array.forEach(arguments, function(module, index){
          var moduleId = modules[index];
          var SingletonClass = declare(moduleId, [_RemoteCall, module], {
            buildRendering: function(){}
          });
          var singleton = new SingletonClass();
          singleton.ModuleClass = module;
          singleton.moduleId = moduleId;
          moduleLoader.register(singleton, moduleId);
        });
        load(moduleLoader);
      });
    }
    
  };
  
  return loader;
  
});