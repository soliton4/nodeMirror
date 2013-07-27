define([
], function(){
  var modules = {
    modules: []
    
    , register: function(parModule){
      this.modules.push(parModule);
    }
    
    , getContent: function(par){
      var i = 0;
      for(i = this.modules.length - 1; i >= 0; --i){
        if (typeof this.modules[i].getContent == "function"){
          var result;
          try{
            result = this.modules[i].getContent(par);
          }catch(e){
            console.log(e);
          }
          if (result){
            console.log(result);
            return result;
          };
        };
      };
    }
    
  };
  
  var standardModules = [
    "modules/Default"
  , "modules/Directory"
  , "modules/Text"
  ];
  
  var registerFun = function(parModule){
    modules.register(new parModule());
  };
  
  var i = 0;
  for(i = 0; i < standardModules.length; ++i){
    require([standardModules[i]], registerFun);
  };
  
  return modules;
  
});