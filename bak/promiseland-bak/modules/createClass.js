(function(){
  var defineFun;
  var requireFun;
  
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    requireFun = function(modulesAr, callback, errBack){
      try{
        var i = 0;
        var l = modulesAr.length;
        var args = [];
        for (i; i < l; ++i){
          args.push(require(modulesAr[i]));
        };
      }catch(e){
        errBack(e);
        return;
      };
      callback.apply(callback, args);
    };
    defineFun = function(requireAr, callback){
      requireFun(requireAr, function(){
        module.exports = callback.apply(callback, arguments);
      });
    };
    
  }else if (typeof define == "function" && define.amd){ // AMD
    var _define = define;
    requireFun = require;
    
    defineFun = function(par1, par2){
      if (par1 instanceof Array){
        par1.unshift("require");
      }else{
        par2 = par1;
        par1 = ["require"];
      };
      _define(par1, function(){
        requireFun = arguments[0];
        var args = [];
        for (var i = 1; i < arguments.length; ++i){
          args.push(arguments[i]);
        };
        return par2.apply(par2, args);
      });
    };
    
  }else{ // Plain browser env
    alert("not working out!");
    
  };
  defineFun([], function(){
var __execute = function(promiseland, extra){ __execute = undefined; var __require = requireFun;

if (promiseland._hasModule({ hashStr: "4a01c4f3b4388a1628a72080d91dbb50" })){ return promiseland._getModule("4a01c4f3b4388a1628a72080d91dbb50"); };
var PL$18/*Array*/;try{PL$18/*Array*/ = Array;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  ;
  var PL$2/*mixinPrototype*/ = (function(PL$3/*parProto*/, PL$4/*parMixin*/, PL$5/*inheritedObject*/, PL$6/*gotit*/){
  
    ;
    if((! PL$4/*parMixin*/ || ! PL$4/*parMixin*/["prototype"])){
      return;
    };
    ;
    if(! PL$6/*gotit*/){
      PL$6/*gotit*/ = {
        
      };
    };
    ;
    var PL$7/*i*/;
    ;
    var PL$8/*proto*/ = PL$4/*parMixin*/["prototype"];
    ;
    for(PL$7/*i*/ in PL$8/*proto*/){
      if(((PL$7/*i*/ === "prototype") || PL$6/*gotit*/[PL$7/*i*/])){
        continue;;
      };
      ;
      PL$3/*parProto*/[PL$7/*i*/] = PL$8/*proto*/[PL$7/*i*/];
      PL$5/*inheritedObject*/[PL$7/*i*/] = PL$3/*parProto*/[PL$7/*i*/];
      PL$6/*gotit*/[PL$7/*i*/] = true;};
    ;
    if(PL$4/*parMixin*/["prototype"]){
      PL$2/*mixinPrototype*/(PL$3/*parProto*/, PL$4/*parMixin*/["prototype"], PL$5/*inheritedObject*/, PL$6/*gotit*/);
    };
    ;
    ;});
  ;
  var PL$9/*getProperty*/ = (function(PL$10/*par*/, PL$11/*parProperty*/, PL$12/*parDefault*/){
  
    ;
    if(PL$10/*par*/["hasOwnProperty"](PL$11/*parProperty*/)){
      return PL$10/*par*/[PL$11/*parProperty*/];
    };
    ;
    return PL$12/*parDefault*/;
    ;});
  ;
  var PL$13/*createClass*/ = (function(PL$10/*par*/, PL$14/*parExtends*/, PL$5/*inheritedObject*/){
  
    ;
    var PL$15/*constructorFun*/ = PL$9/*getProperty*/(PL$10/*par*/, "constructor", (function(){
    
      ;
      ;}));
    ;
    var PL$8/*proto*/ = {
      
    };
    ;
    var PL$7/*i*/;
    ;
    var PL$16/*l*/;
    ;
    if(PL$14/*parExtends*/){
      var PL$17/*realConstructorFun*/ = PL$15/*constructorFun*/;
      ;
      if((PL$14/*parExtends*/ instanceof PL$18/*Array*/)){
        PL$16/*l*/ = PL$14/*parExtends*/["length"];
        var PL$19/*extendConstructors*/ = [
          
        ];
        ;
        for(PL$7/*i*/ = 0;(PL$7/*i*/ < PL$16/*l*/);++PL$7/*i*/){{
          PL$2/*mixinPrototype*/(PL$8/*proto*/, PL$14/*parExtends*/[PL$7/*i*/], PL$5/*inheritedObject*/);
          if((typeof PL$14/*parExtends*/[PL$7/*i*/] === "function")){
            PL$19/*extendConstructors*/["push"](PL$14/*parExtends*/[PL$7/*i*/]);
          };
          ;}};
        ;
        var PL$20/*cl*/ = PL$19/*extendConstructors*/["length"];
        ;
        if(PL$20/*cl*/){
          PL$15/*constructorFun*/ = (function(){
          var PL$21/*arguments*/ = arguments;
          
            ;
            var PL$7/*i*/;
            ;
            for(PL$7/*i*/ = 0;(PL$7/*i*/ < PL$20/*cl*/);++PL$7/*i*/){{
              PL$19/*extendConstructors*/[PL$7/*i*/]["apply"](this, PL$21/*arguments*/);}};
            ;
            return PL$17/*realConstructorFun*/["apply"](this, PL$21/*arguments*/);
            ;});
        };
        ;
      }else{
      PL$2/*mixinPrototype*/(PL$8/*proto*/, PL$14/*parExtends*/, PL$5/*inheritedObject*/);
      if((typeof PL$14/*parExtends*/ === "function")){
        PL$15/*constructorFun*/ = (function(){
        var PL$21/*arguments*/ = arguments;
        
          ;
          PL$14/*parExtends*/["apply"](this, PL$21/*arguments*/);
          return PL$17/*realConstructorFun*/["apply"](this, PL$21/*arguments*/);
          ;});
      };
      ;
      };
      ;
    };
    ;
    for(PL$7/*i*/ in PL$10/*par*/){
      PL$8/*proto*/[PL$7/*i*/] = PL$10/*par*/[PL$7/*i*/];};
    ;
    PL$15/*constructorFun*/["prototype"] = PL$8/*proto*/;
    return PL$15/*constructorFun*/;
    ;});
  ;
  return PL$13/*createClass*/;
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();