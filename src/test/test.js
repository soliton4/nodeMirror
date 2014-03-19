(function(){
  var defineFun;
  var requireFun;
  
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    requireFun = function(modulesAr, callback){
      var i = 0;
      var l = modulesAr.length;
      var args = [];
      for (i; i < l; ++i){
        args.push(require(modulesAr[i]));
      };
      callback.apply(callback, args);
    };
    defineFun = function(requireAr, callback){
      requireFun(requireAr, function(){
        module.exports = callback.apply(callback, arguments);
      });
    };
    
  }else if (typeof define == "function" && define.amd){ // AMD
    defineFun = define;
    requireFun = require;
    
  }else{ // Plain browser env
    alert("not working out!");
    
  };
  
  defineFun(["promiseland"], function(promiseLand){
var __Promise = promiseLand.Promise;
var module = new __Promise();
var x;
;
var y;
;
var z = y.then(function(_value)){;
;
var a;
;
var y = 1;
;
function funname(b, c){
var a = 1;
;
a = x.then(function(_value)){;
setTimeout(function(){
x = 2;
}, 1000);
return a;
};
;
return module.promise.then;});
})();