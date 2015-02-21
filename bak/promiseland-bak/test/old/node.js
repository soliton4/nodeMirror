/*
promiseland = require("promiseland");

  var testObj = {
    
  };
  
  
  var createTest = function(parModuleName, parFun){
    testObj[parModuleName] = false;
    var successFun = function(){
      testObj[parModuleName] = true;
    };
    try{
      var modPs = require("./" + parModuleName);
      modPs.then(function(mod){
        parFun(mod, successFun);
      });
    }catch(e){
    };
  };
  
  var funReturning4 = function(mod, success){
    mod.fun().then(function(value){
      if (value == 4){
        success();
      };
    });
  };
  
  createTest("conditional", funReturning4);
  createTest("conditional2", funReturning4);
  createTest("conditional3", funReturning4);
  
  createTest("callback", funReturning4);
  createTest("callback2", funReturning4);
  
  createTest("forloop", funReturning4);
  createTest("forloop2", funReturning4);
  
  createTest("whileloop", funReturning4);
  createTest("whileloop2", funReturning4);
  
  setTimeout(function(){
    var c = 0;
    var s = 0;
    var f = 0;
    for (var m in testObj){
      c++;
      if (testObj[m]){
        s++;
      }else{
        console.log(m + " failed!");
        f++;
      };
    };
    console.log("run " + c + " tests. " + s + " successful, " + f + " failed");
  }, 2000);
*/