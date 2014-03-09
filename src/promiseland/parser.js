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
    
    var currentPromise;
    
    var unknownType = function(entry){
      throw {
        msg: "unknown type - " + entry.type
      };
    };
    
    var parseError = function(msg){
      throw {
        msg: msg
      };
    };
    
    var somethingsWrong = function(what){
      throw(what);
    };
    
    var parseValue = function(parValue){
      if (!parValue){
        somethingsWrong({
          msg: "empty value"
        });
        return "";
      };
      if (parValue.type == "NumericLiteral"){
        return "" + parValue.value;
      }else{
        somethingsWrong({
          msg: "unknown value type: " + parValue.type
        });
        return "";
      };
      
    };
    
    var variableStatement = function(element){
      var resStr = "";
      var declarations = element.declarations;
      if (!declarations){
        parseError("missing declarations");
        return "";
      };
      
      var i = 0;
      var l = declarations.length;
      for (i; i < l; ++i){
        if (declarations[i].type == "VariableDeclaration"){
          resStr += "var ";
          resStr += declarations[i].name;
          if (declarations[i].value){
            resStr += " = ";
            resStr += parseExpression(declarations[i].value);
          };
          resStr += ";\n";
        }else{
          unknownType(declarations[i]);
        };
      };
      return resStr;
      
    };
    
    var functionCall = function(element){
      resStr = "";
      resStr += parseExpression(element.name);
      resStr += "(";
      if (element.arguments){
        var i = 0;
        var l = element.arguments.length;
        for (i; i < l; ++i){
          if (i){
            resStr += ", ";
          };
          resStr += parseExpression(element.arguments[i]);
        };
      };
      resStr += ")";
      return resStr;
    };
    
    var parseFunction = function(par){
      //type: "Function", name: null, params: Array[0], elements: Array[1]}
      var resStr = "function";
      if (par.name){
        resStr += " " + par.name;
      };
      resStr += "(";
      if (par.params && par.params.length){
        var i = 0;
        var l = par.params.length;
        for (i; i < l; ++i){
          if (i){
            resStr += ", ";
          };
          resStr += par.params[i];
        };
      };
      resStr += "){\n";
      resStr += parseProgElements(par.elements);
      resStr += "}";
      return resStr;
    };
    
    var assignmentExpression = function(entry){
      //{type: "AssignmentExpression", operator: "=", left: Object, right: Object}
      var resStr = "";
      resStr += parseExpression(entry.left);
      resStr += " " + entry.operator + " ";
      resStr += parseExpression(entry.right);
      return resStr;
    };
    
    var objectLiteral = function(par){
      //{type: "ObjectLiteral", properties: Array[2]}
      var resStr = "{";
      var i = 0;
      var l = (par.properties && par.properties.length) || 0;
      for (i; i < l; ++i){
        if (i){
          resStr += ",\n";
        };
        var prop = par.properties[i];
        if (prop.type == "PropertyAssignment"){
          resStr += "\"" + prop.name + "\": " + parseExpression(prop.value);
        }else{
          somethingsWrong({
            msg: "unknown property assignment: " + prop.type
          });
        };
      };
      resStr += "}";
      return resStr;
    };
    
    var arrayLiteral = function(par){
      var resStr = "[";
      var i = 0;
      var l = (par.elements && par.elements.length) || 0;
      for (i; i < l; ++i){
        if (i){
          resStr += ", ";
        };
        resStr += parseExpression(par.elements[i]);
      };
      resStr += "]";
      return resStr;
    };
    
    var returnStatement = function(par){
      resStr = "return";
      if (par.value){
        resStr += " " + parseExpression(par.value);
      };
      return resStr;
    };

    
    var parseExpression = function(value){
      var resStr = "";
      switch(value.type){
        case "Variable":
          resStr += value.name;
          break;
          
        case "NumericLiteral":
          resStr += value.value;
          break;
          
        case "StringLiteral":
          resStr += "\"" + value.value.replace(/\"/, "\"") + "\"";
          break;
          
        case "VariableStatement":
          resStr += variableStatement(value);
          break;
          
        case "FunctionCall":
          resStr += functionCall(value);
          break;
          
        case "Function":
          resStr += parseFunction(value);
          break;
          
        case "EmptyStatement":
          // why does this exist?
          break;
          
        case "AssignmentExpression":
          resStr += assignmentExpression(value);
          break;
          
        case "ObjectLiteral":
          resStr += objectLiteral(value);
          break;
          
        case "ReturnStatement":
          resStr += returnStatement(value);
          break;
          
        case "UnaryExpression":
          if (value.operator == "*"){
            resStr += parseExpression(value.expression);
            resStr += ".then(function(_value)){";
            break;
          };
          resStr += value.operator;
          resStr += parseExpression(value.expression);
          break;
          
        case "ArrayLiteral":
          resStr += arrayLiteral(value);
          break;
          
        default:
          unknownType(value);
      };
      return resStr;
    };
    
    
    var parseProgElements = function(elements){
      var resStr = "";
      var i = 0;
      var l = elements.length;
      for (i; i < l; ++i){
        var promiseCode = {};
        var codeStr = parseExpression(elements[i], promiseCode);
        if (promiseCode.promising){
          resStr += promiseCode.declaration;
          resStr += promiseCode.name + ".then(function(" + promiseCode.name + "){";
        }else{
          resStr += codeStr;
        };
        resStr += ";\n";
      };
      return resStr;
    };
    
    var findPromises = function(par){
      if (!par){
        return false;
      };
      if (par.type == "UnaryExpression" && par.operator == "*"){
        par.promising = true;
      };
      var i;
      for (i in par){
        if (findPromises(par[i])){
          par.promising = true;
        };
      };
      if (par.promising){
        return true;
      };
      return false;
    };
    
    var parseProgram = function(entry){
      findPromises(entry);
      return parseProgElements(entry.elements);
    };
    
    var loaderStr = function(){
      return "(function(){\n\
  var defineFun;\n\
  var requireFun;\n\
  \n\
  if (typeof exports == \"object\" && typeof module == \"object\"){ // CommonJS\n\
    requireFun = function(modulesAr, callback){\n\
      var i = 0;\n\
      var l = modulesAr.length;\n\
      var args = [];\n\
      for (i; i < l; ++i){\n\
        args.push(require(modulesAr[i]));\n\
      };\n\
      callback.apply(callback, args);\n\
    };\n\
    defineFun = function(requireAr, callback){\n\
      requireFun(requireAr, function(){\n\
        module.exports = callback.apply(callback, arguments);\n\
      });\n\
    };\n\
    \n\
  }else if (typeof define == \"function\" && define.amd){ // AMD\n\
    defineFun = define;\n\
    requireFun = require;\n\
    \n\
  }else{ // Plain browser env\n\
    alert(\"not working out!\");\n\
    \n\
  };\n\
  \n\
  defineFun([\"promiseland\"], function(promiseLand){\n";
    };
    
    var promiseLandRequireStr = function(){
      return "var __Promise = promiseLand.Promise;\nvar module = new __Promise();\n";
    };
    
    var loaderEndStr = function(){
      return "return module.promise.then;});\n})();";
    };
    
    
    var parser = {
      parse: function(promiseLandCodeStr){
        var p = new promiseLand.Promise();
        console.log("2");
        promiseLand._getParser().then(function(parser){
          console.log(parser);
          var parsedAr = parser.parse(promiseLandCodeStr);
          var resStr = "";
          resStr += loaderStr();
          resStr += promiseLandRequireStr();
          if (parsedAr.length === undefined){
            if (parsedAr.type == "Program"){
              resStr += parseProgram(parsedAr);
            }else{
              unknownType(parsedAr[i]);
            };
            
          }else{
            var i = 0;
            var l = parsedAr.length;
            for (i; i < l; ++i){
              if (parsedAr[i].type == "Program"){
                resStr += parseProgram(parsedAr[i]);
              }else{
                unknownType(parsedAr[i]);
              };
            };
          };
          resStr += loaderEndStr();
          p.resolve(resStr);
        });
        console.log("returning promise");
        return p.promise;
      }
    };
    
    return parser;
    
  });
})();


