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
  defineFun(["promiseland"], function(promiseland){
var __require = requireFun;

var __Promise = promiseland.Promise;
var Promise = promiseland.Promise;
var __requireFun = function(parModule){
      var returnPromise = new __Promise();
      try{__require([parModule], function(m){
        if (promiseland.isPromiseLandPromisingModule(m)){
          m.then(function(realm){returnPromise.resolve(realm);}, function(e){returnPromise.reject(e);});
        }else{
          returnPromise.resolve(m);
        };
        }, function(err){ returnPromise.reject(err); });
      }catch(e){ returnPromise.reject(e); };
      return returnPromise.promise;};
    if (promiseland._hasModule({ hashStr: "73170fc1361df6e3f238e3485ae7dae3" })){ return promiseland._getModule("73170fc1361df6e3f238e3485ae7dae3"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "73170fc1361df6e3f238e3485ae7dae3", "module": PL$1, promising: true });
var PL$14/*Deferred*/;try{PL$14/*Deferred*/ = Deferred;}catch(e){};
var PL$19/*solPromise*/;try{PL$19/*solPromise*/ = solPromise;}catch(e){};
var PL$20/*array*/;try{PL$20/*array*/ = array;}catch(e){};
var PL$28/*promiseland*/;try{PL$28/*promiseland*/ = promiseland;}catch(e){};
var PL$52/*mimeMagic*/;try{PL$52/*mimeMagic*/ = mimeMagic;}catch(e){};
var PL$60/*mime*/;try{PL$60/*mime*/ = mime;}catch(e){};
var PL$61/*solString*/;try{PL$61/*solString*/ = solString;}catch(e){};
var PL$63/*console*/;try{PL$63/*console*/ = console;}catch(e){};
var PL$2 = (function(){
"use strict";
var PL$3/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$1.reject(e);
    };
  };
};
var PL$4/*catch rejected*/ = function(e){
  PL$1.reject(e);
};
var PL$5/*fs*/;
var PL$7/*path*/;
var PL$9/*customExtensions*/;
var PL$10/*forceTextExtensions*/;
var PL$11/*files*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("fs").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*fs*/ = PL$6;
  __requireFun("path").then(PL$3/*promiseland exception catcher*/(function(PL$8){PL$7/*path*/ = PL$8;
  PL$9/*customExtensions*/ = {
    ".pl": "application/promiseLand",
    ".pegjs": "application/peg.js",
    ".less": "text/x-less",
    ".coffee": "text/x-coffeescript",
    ".cuf": "text/x-fortran",
    ".cu": "text/x-c",
    ".pland": "text/promiseland",
    ".plnd": "text/promiseland"
  };
  PL$10/*forceTextExtensions*/ = {
    ".pl": "application/promiseLand",
    ".pegjs": "application/peg.js",
    ".less": "text/x-less",
    ".coffee": "text/x-coffeescript",
    ".cuf": "text/x-fortran",
    ".cu": "text/x-c",
    ".pland": "text/promiseland",
    ".plnd": "text/promiseland",
    ".js": "application/javascript"
  };
  PL$11/*files*/ = {
    "dirsDef": (function(PL$12/*parFileName*/){
    
      ;
      var PL$13/*def*/ = new PL$14/*Deferred*/();
      ;
      PL$5/*fs*/["stat"](PL$12/*parFileName*/, (function(PL$15/*err*/, PL$16/*stat*/){
      
        ;
        if((PL$15/*err*/ || ! PL$16/*stat*/["isDirectory"]())){
          PL$13/*def*/["resolve"]();
          return;
        };
        ;
        PL$5/*fs*/["readdir"](PL$12/*parFileName*/, (function(PL$15/*err*/, PL$17/*parFiles*/){
        
          ;
          if(PL$15/*err*/){
            PL$13/*def*/["resolve"]();
            return;
          };
          ;
          var PL$18/*resultAr*/ = [
            
          ];
          ;
          PL$19/*solPromise*/["allDone"](PL$20/*array*/["map"](PL$17/*parFiles*/, (function(PL$21/*file*/){
          
            ;
            var PL$22/*filename*/ = ((PL$12/*parFileName*/ + "/") + PL$21/*file*/);
            ;
            return PL$11/*files*/["isDirDef"](PL$22/*filename*/)["then"]((function(PL$22/*filename*/){
            
              ;
              PL$18/*resultAr*/["push"](PL$22/*filename*/);
              ;}));
            ;})))["then"]((function(){
          
            ;
            PL$13/*def*/["resolve"](PL$18/*resultAr*/);
            ;}));
          ;}));
        ;}));
      return PL$13/*def*/["promise"];
      ;}),
    "childrenDef": (function(PL$12/*parFileName*/){
    
      ;
      var PL$13/*def*/ = new PL$14/*Deferred*/();
      ;
      PL$11/*files*/["isDirDef"](PL$12/*parFileName*/)["then"]((function(){
      
        ;
        PL$5/*fs*/["readdir"](PL$12/*parFileName*/, (function(PL$15/*err*/, PL$17/*parFiles*/){
        
          ;
          if(PL$15/*err*/){
            PL$13/*def*/["resolve"]();
            return;
          };
          ;
          PL$13/*def*/["resolve"](PL$20/*array*/["map"](PL$17/*parFiles*/, (function(PL$21/*file*/){
          
            ;
            return ((PL$12/*parFileName*/ + "/") + PL$21/*file*/);
            ;})));
          ;}));
        ;}), (function(){
      
        ;
        PL$13/*def*/["resolve"]();
        ;}));
      return PL$13/*def*/["promise"];
      ;}),
    "isDir": (function(PL$12/*parFileName*/){
    var PL$23 = new __Promise();
    var PL$25/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$23.reject(e);
        };
      };
    };
    var PL$26/*catch rejected*/ = function(e){
      PL$23.reject(e);
    };
    var PL$27/*cb*/;
    var PL$16/*stat*/;
    PL$25/*promiseland exception catcher*/(function(){
    
      ;
      PL$27/*cb*/ = new PL$28/*promiseland*/["CallbackErrorFirst"]();
      PL$5/*fs*/["stat"](PL$12/*parFileName*/, PL$27/*cb*/);
      PL$27/*cb*/["promise"].then(PL$25/*promiseland exception catcher*/(function(PL$29){PL$16/*stat*/ = PL$29;
      PL$23.resolve(PL$16/*stat*/["isDirectory"]()); return;
      PL$23.resolve(); return;}), PL$26/*catch rejected*/);
      ;
    })();return PL$23;
    }),
    "children": (function(PL$30/*parDirName*/){
    var PL$31 = new __Promise();
    var PL$33/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$31.reject(e);
        };
      };
    };
    var PL$34/*catch rejected*/ = function(e){
      PL$31.reject(e);
    };
    var PL$27/*cb*/;
    var PL$35/*resAr*/;
    PL$33/*promiseland exception catcher*/(function(){
    
      ;
      PL$27/*cb*/ = new PL$28/*promiseland*/["CallbackErrorFirst"]();
      PL$5/*fs*/["readdir"](PL$30/*parDirName*/, PL$27/*cb*/);
      PL$27/*cb*/["promise"].then(PL$33/*promiseland exception catcher*/(function(PL$36){PL$35/*resAr*/ = PL$36;
      PL$31.resolve(PL$35/*resAr*/["map"]((function(PL$12/*parFileName*/){
      
        ;
        return ((PL$30/*parDirName*/ + PL$7/*path*/["sep"]) + PL$12/*parFileName*/);
        ;}))); return;
      PL$31.resolve(); return;}), PL$34/*catch rejected*/);
      ;
    })();return PL$31;
    }),
    "dirChildren": (function(PL$30/*parDirName*/){
    var PL$37 = new __Promise();
    var PL$39/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$37.reject(e);
        };
      };
    };
    var PL$40/*catch rejected*/ = function(e){
      PL$37.reject(e);
    };
    var PL$41/*children*/;
    var PL$35/*resAr*/;
    var PL$43/*i*/;
    PL$39/*promiseland exception catcher*/(function(){
    
      ;
      PL$11/*files*/["children"](PL$30/*parDirName*/).then(PL$39/*promiseland exception catcher*/(function(PL$42){PL$41/*children*/ = PL$42;
      PL$35/*resAr*/ = [
        
      ];
      PL$43/*i*/ = 0;
      PL$43/*i*/ = 0;var PL$45 = new __Promise();
      var PL$44 = function(){var PL$46 = new __Promise();
      if((PL$43/*i*/ < PL$41/*children*/["length"])){
      PL$11/*files*/["isDir"](PL$41/*children*/[PL$43/*i*/]).then(PL$39/*promiseland exception catcher*/(function(PL$47){if(PL$47){
        PL$35/*resAr*/["push"](PL$41/*children*/[PL$43/*i*/]);
      };
      ;
      PL$46.resolve(true); return PL$46; /* continue */
      ;}), PL$40/*catch rejected*/);
      ;}else{
      PL$46.resolve(false); return PL$46; /* break */
      
      };
      PL$46;return PL$46;
      };
      var PL$48 = function(){PL$44().then(function(contLoop){
      if (contLoop){++PL$43/*i*/;PL$48();}else{PL$45.resolve();};
      });
      };
      PL$48();
      PL$45.then(function(){;
      ;
      PL$37.resolve(PL$35/*resAr*/); return;
      PL$37.resolve(); return;});}), PL$40/*catch rejected*/);
      ;
    })();return PL$37;
    }),
    "contentTypesDef": (function(PL$49/*parFileNamesAr*/){
    
      ;
      var PL$50/*self*/ = this;
      ;
      var PL$13/*def*/ = new PL$14/*Deferred*/();
      ;
      var PL$51/*result*/ = {
        
      };
      ;
      PL$52/*mimeMagic*/(PL$49/*parFileNamesAr*/, (function(PL$15/*err*/, PL$53/*types*/){
      
        ;
        if(PL$15/*err*/){
          PL$13/*def*/["reject"](PL$15/*err*/);
          return;
        };
        ;
        var PL$54/*waitAr*/ = [
          
        ];
        ;
        var PL$18/*resultAr*/ = PL$20/*array*/["map"](PL$53/*types*/, (function(PL$55/*type*/, PL$43/*i*/){
        
          ;
          if((PL$55/*type*/ == "inode/directory")){
            return {
              "name": PL$49/*parFileNamesAr*/[PL$43/*i*/],
              "type": PL$55/*type*/
            };
          };
          ;
          var PL$56/*d*/ = new PL$14/*Deferred*/();
          ;
          PL$54/*waitAr*/["push"](PL$56/*d*/["promise"]);
          var PL$57/*res*/ = {
            "name": PL$49/*parFileNamesAr*/[PL$43/*i*/],
            "type": PL$55/*type*/
          };
          ;
          PL$5/*fs*/["stat"](PL$49/*parFileNamesAr*/[PL$43/*i*/], (function(PL$15/*err*/, PL$58/*stats*/){
          
            ;
            if(! PL$15/*err*/){
              PL$57/*res*/["stats"] = PL$58/*stats*/;
              PL$57/*res*/["type"] = PL$50/*self*/["_contentTypeCorrection"](PL$57/*res*/["name"], PL$57/*res*/["type"], PL$57/*res*/["stats"]);
            };
            ;
            PL$56/*d*/["resolve"]();
            ;}));
          return PL$57/*res*/;
          ;}));
        ;
        if(PL$54/*waitAr*/["length"]){
          PL$19/*solPromise*/["allDone"](PL$54/*waitAr*/)["then"]((function(){
          
            ;
            PL$13/*def*/["resolve"](PL$18/*resultAr*/);
            ;}));
        }else{
        PL$13/*def*/["resolve"](PL$18/*resultAr*/);
        };
        ;}));
      return PL$13/*def*/["promise"];
      ;}),
    "_contentTypeCorrection": (function(PL$12/*parFileName*/, PL$55/*type*/, PL$58/*stats*/){
    
      ;
      var PL$59/*extension*/;
      ;
      if((((PL$55/*type*/ == "text/plain") || (PL$55/*type*/ == "application/octet-stream")) || (PL$58/*stats*/["size"] === 0))){
        for(PL$59/*extension*/ in PL$9/*customExtensions*/){
          if((PL$12/*parFileName*/["substr"]((PL$12/*parFileName*/["length"] - PL$59/*extension*/["length"])) == PL$59/*extension*/)){
            return PL$9/*customExtensions*/[PL$59/*extension*/];
          };
          ;};
        ;
        return PL$60/*mime*/["lookup"](PL$12/*parFileName*/);
      }else{
      if(PL$61/*solString*/["startsWith"](PL$55/*type*/, "text/")){
        for(PL$59/*extension*/ in PL$10/*forceTextExtensions*/){
          if(PL$61/*solString*/["endsWith"](PL$12/*parFileName*/, PL$59/*extension*/)){
            return PL$10/*forceTextExtensions*/[PL$59/*extension*/];
          };
          ;};
        ;
      };
      };
      ;
      return PL$55/*type*/;
      ;}),
    "contentTypeDef": (function(PL$12/*parFileName*/){
    
      ;
      var PL$13/*def*/ = new PL$14/*Deferred*/();
      ;
      var PL$51/*result*/ = {
        
      };
      ;
      PL$52/*mimeMagic*/(PL$12/*parFileName*/, (function(PL$15/*err*/, PL$55/*type*/){
      
        ;
        if(PL$15/*err*/){
          PL$13/*def*/["reject"](PL$15/*err*/);
          return;
        };
        ;
        PL$5/*fs*/["stat"](PL$12/*parFileName*/, (function(PL$15/*err*/, PL$58/*stats*/){
        
          ;
          try
          {
            if(PL$15/*err*/){
              PL$13/*def*/["reject"](PL$15/*err*/);
              return;
            };
            ;
            var PL$62/*isEmpty*/ = false;
            ;
            if((! PL$58/*stats*/["isDirectory"]() && (PL$58/*stats*/["size"] === 0))){
              PL$62/*isEmpty*/ = true;
            };
            ;
            if((PL$55/*type*/ == "inode/x-empty")){
              PL$62/*isEmpty*/ = true;
            };
            ;
            var PL$59/*extension*/;
            ;
            if((((PL$55/*type*/ == "text/plain") || (PL$55/*type*/ == "application/octet-stream")) || PL$62/*isEmpty*/)){
              for(PL$59/*extension*/ in PL$9/*customExtensions*/){
                if((PL$12/*parFileName*/["substr"]((PL$12/*parFileName*/["length"] - PL$59/*extension*/["length"])) == PL$59/*extension*/)){
                  PL$55/*type*/ = PL$9/*customExtensions*/[PL$59/*extension*/];
                  PL$13/*def*/["resolve"](PL$55/*type*/);
                  return;
                };
                ;};
              ;
              PL$55/*type*/ = PL$60/*mime*/["lookup"](PL$12/*parFileName*/);
              PL$63/*console*/["log"](PL$55/*type*/);
            }else{
            if(PL$61/*solString*/["startsWith"](PL$55/*type*/, "text/")){
              for(PL$59/*extension*/ in PL$10/*forceTextExtensions*/){
                if(PL$61/*solString*/["endsWith"](PL$12/*parFileName*/, PL$59/*extension*/)){
                  PL$55/*type*/ = PL$10/*forceTextExtensions*/[PL$59/*extension*/];
                  PL$13/*def*/["resolve"](PL$55/*type*/);
                  return;
                };
                ;};
              ;
            };
            };
            ;
            PL$13/*def*/["resolve"](PL$55/*type*/);}catch(PL$64/*e*/){
            PL$63/*console*/["log"]("error");
            PL$63/*console*/["log"](PL$64/*e*/);};
          ;
          ;}));
        ;}));
      return PL$13/*def*/["promise"];
      ;}),
    "readTextDef": (function(PL$12/*parFileName*/){
    
      ;
      var PL$13/*def*/ = new PL$14/*Deferred*/();
      ;
      PL$5/*fs*/["readFile"](PL$12/*parFileName*/, {
        "encoding": "utf8"
      }, (function(PL$15/*err*/, PL$65/*data*/){
      
        ;
        if((typeof PL$65/*data*/ == "object")){
          PL$13/*def*/["resolve"](PL$65/*data*/["toString"]());
        }else{
        if((typeof PL$65/*data*/ == "string")){
          PL$13/*def*/["resolve"](PL$65/*data*/);
        }else{
        PL$13/*def*/["resolve"]("file could not be read");
        };
        };
        ;
        ;}));
      return PL$13/*def*/["promise"];
      ;}),
    "createFileDef": (function(PL$12/*parFileName*/){
    
      ;
      var PL$13/*def*/ = new PL$14/*Deferred*/();
      ;
      PL$5/*fs*/["open"](PL$12/*parFileName*/, "a", undefined, (function(PL$15/*err*/, PL$66/*fd*/){
      
        ;
        if(PL$15/*err*/){
          PL$63/*console*/["log"](PL$15/*err*/);
          PL$13/*def*/["reject"](PL$15/*err*/);
          return;
        };
        ;
        if(PL$66/*fd*/){
          PL$5/*fs*/["close"](PL$66/*fd*/, (function(){
          
            ;
            PL$13/*def*/["resolve"]();
            ;}));
          return;
        };
        ;
        PL$13/*def*/["resolve"]();
        ;}));
      return PL$13/*def*/["promise"];
      ;}),
    "createDirDef": (function(PL$30/*parDirName*/){
    
      ;
      var PL$13/*def*/ = new PL$14/*Deferred*/();
      ;
      PL$5/*fs*/["mkdir"](PL$30/*parDirName*/, undefined, (function(PL$15/*err*/){
      
        ;
        if(PL$15/*err*/){
          PL$13/*def*/["reject"](PL$15/*err*/);
        }else{
        PL$13/*def*/["resolve"](PL$30/*parDirName*/);
        };
        ;
        ;}));
      return PL$13/*def*/["promise"];
      ;}),
    "writeTextDef": (function(PL$12/*parFileName*/, PL$67/*parText*/){
    
      ;
      var PL$13/*def*/ = new PL$14/*Deferred*/();
      ;
      PL$5/*fs*/["writeFile"](PL$12/*parFileName*/, PL$67/*parText*/, {
        "encoding": "utf8"
      }, (function(PL$15/*err*/, PL$65/*data*/){
      
        ;
        if(PL$15/*err*/){
          PL$63/*console*/["log"](PL$15/*err*/);
          PL$63/*console*/["log"](typeof PL$15/*err*/);
          PL$13/*def*/["reject"](PL$15/*err*/);
        };
        ;
        PL$13/*def*/["resolve"]();
        ;}));
      return PL$13/*def*/["promise"];
      ;})
  };
  PL$1.resolve(PL$11/*files*/); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();