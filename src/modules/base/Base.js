/*
  if you write a module you have to provide these functions
  
  modules are singletons that do not instance themselves
  the instanciation is done by the main/moduleLoader
  
  that gives you the possibility to derive a module from another
  
  functions that end with a ...Ps are supposed to return a promise
*/
define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "main/_RemoteCall"
  , "main/nameTranslator"
  , "dojo/_base/lang"
], function(
  declare
  , Deferred
  , _RemoteCall
  , nameTranslator
  , lang
){
  
  var remoteFunctions = {
    getContentPs: true
    , saveContentPs: true
  };
  
  var Base = declare([], {
    
    WidgetClass: undefined // simple overwrite this with your widget Class
    
    , remoteFunctions: remoteFunctions
    
    , def: function(){ return new Deferred(); } // makes things a little easier to type
    
    // the model decides if it is competent to handle that type
    /* par: {
         type: ["file"|"..."]
         , id: <type specific id>
         , contentType: file content type detected by magic or mime
       }
    */
    , isCompetentPs: function(par){
      var def = this.def();
      def.reject();
      return def;
    }
    
    // create a content that will be sent to the client
    , getContentPs: function(par){
      var def = this.def();
      def.reject();
      return def;
    }
    
    // create a content that will be sent to the client
    , saveContentPs: function(par, parContent){
      var def = this.def();
      def.reject();
      return def;
    }
    
    // return the widget Class
    , getWidgetClassPs: function(par){
      var def = this.def();
      def.resolve(this.WidgetClass || this.ModuleClass);
      return def;
    }
    
    , createWidgetPs: function(par){
      var def = this.def();
      this.getWidgetClassPs(par).then(lang.hitch(this, function(WidgetClass){
        if (WidgetClass){
          var functionOverride = {
            createWidgetPs: lang.hitch(this, "createWidgetPs")
            , isCompetentPs: lang.hitch(this, "isCompetentPs")
            , getContentPs: lang.hitch(this, "getContentPs")
            , saveContentPs: lang.hitch(this, "saveContentPs")
            , moduleId: this.getModuleId()
          };
          for(var f in this.remoteFunctions){
            functionOverride[f] = lang.hitch(this, f);
          };
          
          def.resolve(new WidgetClass(lang.mixin(functionOverride, par)));
        }else{
          def.reject();
        };
      }));
      return def;
    }
    
    // convenient functions:
    , getFileName: function(parName){
      return nameTranslator.fileName(parName);
    }
    
    , getModuleId: function(){
      return this.moduleId;
    }
    
  });
  Base.remoteFunctions = remoteFunctions; // making it accessable during Class definition time
  return Base;
  
});
