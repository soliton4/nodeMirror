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
    if (promiseland._hasModule({ hashStr: "ab58d97e25e76c28a82a518055416f6b" })){ return promiseland._getModule("ab58d97e25e76c28a82a518055416f6b"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "ab58d97e25e76c28a82a518055416f6b", "module": PL$1, promising: true });
var PL$34/*JSON*/;try{PL$34/*JSON*/ = JSON;}catch(e){};
var PL$35/*promiseland*/;try{PL$35/*promiseland*/ = promiseland;}catch(e){};
var PL$36/*__dirname*/;try{PL$36/*__dirname*/ = __dirname;}catch(e){};
var PL$29/*i*/;try{PL$29/*i*/ = i;}catch(e){};
var PL$45/*console*/;try{PL$45/*console*/ = console;}catch(e){};
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
var PL$5/*express*/;
var PL$7/*http*/;
var PL$9/*fs*/;
var PL$11/*socketIo*/;
var PL$13/*expressSession*/;
var PL$15/*CookieParser*/;
var PL$17/*htmlStr*/;
var PL$51/*Framework*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("express").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*express*/ = PL$6;
  __requireFun("http").then(PL$3/*promiseland exception catcher*/(function(PL$8){PL$7/*http*/ = PL$8;
  __requireFun("fs").then(PL$3/*promiseland exception catcher*/(function(PL$10){PL$9/*fs*/ = PL$10;
  __requireFun("socket.io").then(PL$3/*promiseland exception catcher*/(function(PL$12){PL$11/*socketIo*/ = PL$12;
  __requireFun("express-session").then(PL$3/*promiseland exception catcher*/(function(PL$14){PL$13/*expressSession*/ = PL$14;
  __requireFun("cookie-parser").then(PL$3/*promiseland exception catcher*/(function(PL$16){PL$15/*CookieParser*/ = PL$16;
  PL$17/*htmlStr*/ = "<html>\n  <head>\n    {{css}}\n    <!-- socket.io -->\n      <script src='/socket.io/socket.io.js'></script>\n    <!-- require -->\n      <script src='/requirejs/require.js'></script>\n    <script>\n      require.config({{requirejsconfig}});\n    </script>\n    \n    <script>\n      require(['frameworkClient/client'], function(clientPs){\n        clientPs.then(function(client){\n          {{require}};\n          client.getConnectPs().then(function(){\n            {{requireconnect}}\n          });\n        });\n      });\n    </script>\n    \n  </head>\n  <body>\n  </body>\n</html>";
  PL$51/*Framework*/ = (function(){var PL$18/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(PL$19/*parConfig*/){
    
      ;
      PL$19/*parConfig*/ = (PL$19/*parConfig*/ || {
        
      });
      this["app"] = PL$5/*express*/();
      this["http"] = PL$7/*http*/["createServer"](this["app"]);
      this["config"] = PL$19/*parConfig*/;
      var PL$20/*self*/ = this;
      ;
      var PL$21/*session*/;
      ;
      var PL$22/*store*/;
      ;
      if((this["config"]["session"] === true)){
        var PL$23/*Store*/ = PL$13/*expressSession*/["MemoryStore"];
        ;
        PL$22/*store*/ = new PL$23/*Store*/();
        PL$21/*session*/ = PL$13/*expressSession*/({
          "secret": "promiseland-webframework-secretxxx",
          "resave": false,
          "saveUninitialized": true,
          "store": PL$22/*store*/
        });
      }else{
      if(this["config"]["session"]){
        PL$21/*session*/ = this["config"]["session"];
      };
      };
      ;
      if(PL$21/*session*/){
        var PL$24/*cookieParser*/ = PL$15/*CookieParser*/();
        ;
        this["app"]["use"](PL$24/*cookieParser*/);
        this["app"]["use"](PL$21/*session*/);
      };
      ;
      this["app"]["get"]("/", (function(PL$25/*req*/, PL$26/*res*/){
      
        ;
        PL$26/*res*/["setHeader"]("Content-Type", "text/html");
        var PL$27/*s*/ = PL$17/*htmlStr*/;
        ;
        var PL$28/*cssStr*/ = "";
        ;
        if((PL$20/*self*/["config"]["css"] && PL$20/*self*/["config"]["css"]["length"])){
          if((typeof PL$20/*self*/["config"]["css"] === "string")){
            PL$28/*cssStr*/ = (("<link type = \"text/css\" rel=\"stylesheet\" href=\"" + PL$20/*self*/["config"]["css"]) + "\">");
          }else{
          var PL$29/*i*/;
          ;
          for(PL$29/*i*/ = 0;(PL$29/*i*/ < PL$20/*self*/["config"]["css"]["length"]);++PL$29/*i*/){{
            PL$28/*cssStr*/ += (("<link type = \"text/css\" rel=\"stylesheet\" href=\"" + PL$20/*self*/["config"]["css"][PL$29/*i*/]) + "\">");}};
          ;
          };
          ;
        };
        ;
        PL$27/*s*/ = PL$27/*s*/["replace"]("{{css}}", PL$28/*cssStr*/);
        var PL$30/*loadStr*/ = "";
        ;
        if((PL$20/*self*/["config"]["load"] && PL$20/*self*/["config"]["load"]["length"])){
          if((typeof PL$20/*self*/["config"]["load"] === "string")){
            PL$30/*loadStr*/ = (("require(['" + PL$20/*self*/["config"]["load"]) + "'], function(){});");
          }else{
          PL$30/*loadStr*/ = "require([";
          PL$29/*i*/;
          for(PL$29/*i*/ = 0;(PL$29/*i*/ < PL$20/*self*/["config"]["load"]["length"]);++PL$29/*i*/){{
            if(PL$29/*i*/){
              PL$30/*loadStr*/ += ", ";
            };
            ;
            PL$30/*loadStr*/ += (("'" + PL$20/*self*/["config"]["load"][PL$29/*i*/]) + "'");}};
          ;
          PL$30/*loadStr*/ += "], function(){});";
          };
          ;
        };
        ;
        PL$27/*s*/ = PL$27/*s*/["replace"]("{{require}}", PL$30/*loadStr*/);
        var PL$31/*connectLoadStr*/ = "";
        ;
        if((PL$20/*self*/["config"]["loadOnConnect"] && PL$20/*self*/["config"]["loadOnConnect"]["length"])){
          if((typeof PL$20/*self*/["config"]["loadOnConnect"] === "string")){
            PL$31/*connectLoadStr*/ = (("require(['" + PL$20/*self*/["config"]["loadOnConnect"]) + "'], function(){});");
          }else{
          PL$31/*connectLoadStr*/ = "require([";
          PL$29/*i*/;
          for(PL$29/*i*/ = 0;(PL$29/*i*/ < PL$20/*self*/["config"]["loadOnConnect"]["length"]);++PL$29/*i*/){{
            if(PL$29/*i*/){
              PL$31/*connectLoadStr*/ += ", ";
            };
            ;
            PL$31/*connectLoadStr*/ += (("'" + PL$20/*self*/["config"]["loadOnConnect"][PL$29/*i*/]) + "'");}};
          ;
          PL$31/*connectLoadStr*/ += "], function(){});";
          };
          ;
        };
        ;
        PL$27/*s*/ = PL$27/*s*/["replace"]("{{requireconnect}}", PL$31/*connectLoadStr*/);
        var PL$32/*requireConfig*/;
        ;
        if(PL$20/*self*/["config"]["requireConfig"]){
          PL$32/*requireConfig*/ = PL$20/*self*/["config"]["requireConfig"];
        };
        ;
        if(! PL$32/*requireConfig*/){
          PL$32/*requireConfig*/ = {
            
          };
        };
        ;
        if(! PL$32/*requireConfig*/["packages"]){
          PL$32/*requireConfig*/["packages"] = [
            {
              "name": "promiseland",
              "main": "promiseland",
              "location": "promiseland"
            }
          ];
        }else{
        PL$29/*i*/ = 0;
        var PL$33/*found*/ = false;
        ;
        for(PL$29/*i*/ = 0;(PL$29/*i*/ < PL$32/*requireConfig*/["packages"]["length"]);++PL$29/*i*/){{
          if((PL$32/*requireConfig*/["packages"][PL$29/*i*/]["name"] == "promiseland")){
            PL$33/*found*/ = true;
            PL$32/*requireConfig*/["packages"][PL$29/*i*/]["main"] = "promiseland";
            PL$32/*requireConfig*/["packages"][PL$29/*i*/]["location"] = "promiseland";
          };
          ;}};
        ;
        if(! PL$33/*found*/){
          PL$32/*requireConfig*/["packages"]["push"]({
            "name": "promiseland",
            "main": "promiseland",
            "location": "promiseland"
          });
        };
        ;
        };
        ;
        PL$27/*s*/ = PL$27/*s*/["replace"]("{{requirejsconfig}}", PL$34/*JSON*/["stringify"](PL$32/*requireConfig*/));
        PL$26/*res*/["end"](PL$27/*s*/);
        ;}));
      this["app"]["use"]("/promiseland", PL$5/*express*/["static"]((this["config"]["promiselandPathName"] || PL$35/*promiseland*/["getPromiselandPathName"]())));
      this["app"]["use"]("/requirejs", PL$5/*express*/["static"]((this["config"]["requirejsPathName"] || (PL$36/*__dirname*/ + "/requirejs"))));
      this["app"]["use"]("/frameworkClient", PL$5/*express*/["static"]((this["config"]["frameworkClientPathName"] || (PL$36/*__dirname*/ + "/frameworkClient"))));
      if(PL$20/*self*/["config"]["dirs"]){
        for(PL$29/*i*/ = 0;(PL$29/*i*/ < PL$20/*self*/["config"]["dirs"]["length"]);++PL$29/*i*/){{
          var PL$37/*d*/ = PL$20/*self*/["config"]["dirs"][PL$29/*i*/];
          ;
          this["app"]["use"](PL$37/*d*/["client"], PL$5/*express*/["static"](PL$37/*d*/["server"]));}};
        ;
      };
      ;
      PL$35/*promiseland*/["addLocalFrameName"]("server");
      PL$35/*promiseland*/["addLocalFrameName"]("serverNoAuth");
      var PL$38/*ClientFrame*/ = (function(){var PL$39/*inherited*/ = {};
      var res = promiseland.createClass({
        "name": "client"
      }, [PL$35/*promiseland*/["FrameBaseClass"]], PL$39/*inherited*/);
      return res; })();
      ;
      var PL$40/*clientFrame*/ = new PL$38/*ClientFrame*/();
      ;
      PL$35/*promiseland*/["addFrame"](PL$40/*clientFrame*/);
      this["clientFrame"] = PL$40/*clientFrame*/;
      var PL$41/*mainio*/ = PL$11/*socketIo*/["listen"](this["http"]);
      ;
      if(PL$21/*session*/){
        PL$41/*mainio*/["use"]((function(PL$42/*socket*/, PL$43/*next*/){
        
          ;
          var PL$25/*req*/ = PL$42/*socket*/["handshake"];
          ;
          var PL$26/*res*/ = {
            
          };
          ;
          PL$24/*cookieParser*/(PL$25/*req*/, PL$26/*res*/, (function(PL$44/*err*/){
          
            ;
            if(PL$44/*err*/){
              return PL$43/*next*/(PL$44/*err*/);
            };
            PL$21/*session*/(PL$25/*req*/, PL$26/*res*/, PL$43/*next*/);
            ;}));
          ;}));
      };
      ;
      PL$41/*mainio*/["on"]("connection", (function(PL$42/*socket*/){
      
        ;
        PL$45/*console*/["log"]("Session: ", PL$42/*socket*/["handshake"]["session"]);
        var PL$46/*connection*/ = new PL$40/*clientFrame*/["ConnectionBaseClass"]();
        ;
        if(PL$20/*self*/["config"]["requireAuth"]){
          PL$46/*connection*/["restrictLocalFrames"] = true;
        };
        ;
        PL$46/*connection*/["send"] = (function(PL$47/*data*/){
        
          ;
          PL$42/*socket*/["emit"]("pl", PL$47/*data*/);
          ;});
        PL$40/*clientFrame*/["newConnection"](PL$46/*connection*/);
        PL$42/*socket*/["on"]("disconnect", (function(){
        
          ;
          PL$46/*connection*/["disconnect"]();
          ;}));
        PL$42/*socket*/["on"]("pl", (function(PL$47/*data*/){
        
          ;
          PL$46/*connection*/["data"](PL$47/*data*/);
          ;}));
        var PL$48/*authConnection*/ = new PL$40/*clientFrame*/["ConnectionBaseClass"]();
        ;
        PL$48/*authConnection*/["restrictLocalFrames"] = true;
        PL$48/*authConnection*/["addLocalFrameAccess"]("serverNoAuth");
        PL$48/*authConnection*/["session"]["setAuth"] = (function(PL$49/*parIsAuth*/){
        
          ;
          if(PL$49/*parIsAuth*/){
            PL$46/*connection*/["addLocalFrameAccess"]("server");
          }else{
          PL$46/*connection*/["removeLocalFrameAccess"]("server");
          };
          ;
          ;});
        PL$45/*console*/["log"](PL$48/*authConnection*/["session"]);
        PL$48/*authConnection*/["send"] = (function(PL$47/*data*/){
        
          ;
          PL$42/*socket*/["emit"]("a", PL$47/*data*/);
          ;});
        PL$40/*clientFrame*/["newConnection"](PL$48/*authConnection*/);
        PL$42/*socket*/["on"]("disconnect", (function(){
        
          ;
          PL$48/*authConnection*/["disconnect"]();
          ;}));
        PL$42/*socket*/["on"]("a", (function(PL$47/*data*/){
        
          ;
          PL$48/*authConnection*/["data"](PL$47/*data*/);
          ;}));
        ;}));
      this["socketio"] = PL$41/*mainio*/;
      ;}),
    "listen": (function(PL$50/*port*/){
    
      ;
      return this["http"]["listen"](PL$50/*port*/);
      ;})
  }, [], PL$18/*inherited*/);
  return res; })();PL$51/*Framework*/;
  PL$1.resolve(PL$51/*Framework*/); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();