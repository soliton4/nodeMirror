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
    var promiseClass = "__Promise";
    
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

    var findPromises = function(par){
      if (!par || typeof par == "string"){
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

    
    var CodeParser = function(par){
      this.toParse = par;
      
    this.parseValue = function(parValue){
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
      
      var addCodeErrorFun = function(){
        throw {
          msg: "bad add code"
        };
      };
    
    this.variableStatement = function(element, closingFun){
      var resStr = "";
      var declarations = element.declarations;
      if (!declarations){
        parseError("missing declarations");
        return "";
      };
      
      var promising = false;
      
      var i = 0;
      var l = declarations.length;
      for (i; i < l; ++i){
        if (declarations[i].type == "VariableDeclaration"){
          resStr += "var ";
          resStr += declarations[i].name;
          if (declarations[i].value){
            var value = declarations[i].value;
            if (value.promising){
              resStr += ";\n";
              resStr += this.parseExpression(value, closingFun);
              resStr += declarations[i].name + " = " + value.promiseName + ";\n";
              
            }else{
              resStr += " = ";
              resStr += this.parseExpression(value, addCodeErrorFun);
            };
          };
          resStr += ";\n";
        }else{
          unknownType(declarations[i]);
        };
      };
      return resStr;
      
    };
      
    this.assignmentExpression = function(entry, closingFun){
      //{type: "AssignmentExpression", operator: "=", left: Object, right: Object}
      var resStr = "";
      if (entry.right.promising){
        resStr += ";\n";
        resStr += this.parseExpression(entry.right, closingFun);
        resStr += this.parseExpression(entry.left, closingFun);
        resStr += " " + entry.operator + " ";
        resStr += entry.right.promiseName + ";\n";
        
      }else{
        resStr += this.parseExpression(entry.left, closingFun);
        resStr += " " + entry.operator + " ";
        resStr += this.parseExpression(entry.right, closingFun);
        
      };
      return resStr;
    };
      
    
    this.functionCall = function(element, closingFun){
      resStr = "";
      var i = 0;
      var l;
      if (element.promising){
        if (element.name.promising){
          resStr += this.parseExpression(element.name, closingFun);
        };
        if (element.arguments){
          l = element.arguments.length;
          for (i = 0; i < l; ++i){
            if (element.arguments[i].promising){
              resStr += this.parseExpression(element.arguments[i], closingFun);
            };
          };
        };
        if (element.name.promising){
          resStr += element.name.promiseName;
        }else{
          resStr += this.parseExpression(element.name);
        };
        resStr += "(";
        if (element.arguments){
          l = element.arguments.length;
          for (i = 0; i < l; ++i){
            if (i){
              resStr += ", ";
            };
            if (element.arguments[i].promising){
              resStr += element.arguments[i].promiseName;
            }else{
              resStr += this.parseExpression(element.arguments[i]);
            };
          };
        };
      }else{
        resStr += this.parseExpression(element.name);
        resStr += "(";
        if (element.arguments){
          l = element.arguments.length;
          for (i = 0; i < l; ++i){
            if (i){
              resStr += ", ";
            };
            resStr += this.parseExpression(element.arguments[i]);
          };
        };
      };
      resStr += ")";
      return resStr;
    };
    
    this.parseFunction = function(par){
      //type: "Function", name: null, params: Array[0], elements: Array[1]}
      var resStr = "function"; 
      if (par.name){
        resStr += " " + par.name;
      };
      resStr += "("; // function start
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
      
      if (par.promising){
        resStr += "var _returnPs = new Promise();\n";
        this.promising = true;
        this.returnPromise = "_returnPs";
        resStr += "try{";
      };
      resStr += this.parseProgElements(par.elements);
      
      if (par.promising){
        resStr += "}catch(__returnError){\n";
        resStr += this.returnPromise + ".reject(__returnError);\n";
        resStr += "};\n";
        resStr += "return " + this.returnPromise + ";\n";
      };
      
      resStr += "}"; // function end
      return resStr;
    };
    
    
    this.objectLiteral = function(par){
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
    
    this.arrayLiteral = function(par){
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
    
    this.returnStatement = function(par, closingFun){
      var resStr = "";
      var promising = par.value && par.value.promising;
      if (promising){ // function and value promising
        resStr += " " + this.parseExpression(par.value, closingFun);
        resStr += this.returnPromise + ".resolve(";
        resStr += par.value.promiseName + ");\n";
        
      }else if (this.promising){ // only function promising
        resStr += this.returnPromise + ".resolve(";
        if (par.value){
          resStr += " " + this.parseExpression(par.value, closingFun);
        };
        resStr += ");\n";
        
      }else{
        resStr += "return";
        if (par.value){
          resStr += " " + this.parseExpression(par.value, closingFun);
        };
      };
      return resStr;
    };
    
      this.getUniqueName = function(){
        return "__UNIQUENAME";
      };
    
    this.parseExpression = function(value, closingFun){
      value.promiseName = "";
      var resStr = "";
      var endCode = "";
      var addEndFun = function(par){
        endCode += par;
      };
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
          resStr += this.variableStatement(value, closingFun);
          break;
          
        case "FunctionCall":
          resStr += this.functionCall(value, closingFun);
          break;
          
        case "Function":
          var cp = new CodeParser(value);
          resStr += cp.getResult();
          break;
          
        case "EmptyStatement":
          // why does this exist?
          break;
          
        case "AssignmentExpression":
          resStr += this.assignmentExpression(value, closingFun);
          break;
          
        case "ObjectLiteral":
          resStr += objectLiteral(value);
          break;
          
        case "ReturnStatement":
          resStr += this.returnStatement(value, closingFun);
          break;
          
        case "UnaryExpression":
          if (value.operator == "*"){
            var nameStr = this.getUniqueName();
            resStr += this.parseExpression(value.expression, addEndFun);
            resStr += ".then(function(" + nameStr + ")){";
            value.promiseName = nameStr;
            value.isPromise = true;
            addEndFun("});");
            closingFun(endCode);
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
    
    
    this.parseProgElements = function(elements){
      var resStr = "";
      
      var closingStatement = "";
      var addClosing = function(par){
        closingStatement += par;
      };
      
      var i = 0;
      var l = elements.length;
      var promisesPresent = false;
      var closingStatements = [];
      for (i; i < l; ++i){
        var codeStr = this.parseExpression(elements[i], addClosing);
        if (elements[i].isPromise){
          resStr += codeStr;
        }else{
          resStr += codeStr;
        };
        resStr += ";\n";
      };
      resStr += closingStatement;
      return resStr;
    };
    
    
      this.parseProgram = function(entry){
        findPromises(entry);
        resStr = "";
        if (entry.promising){
          resStr += "var _returnPs = new Promise();\n";
          this.promising = true;
          this.returnPromise = "_returnPs";
        };
        resStr += this.parseProgElements(entry.elements);
        return resStr;
      };
      
      this.getResult = function(){
        return this.result;
      };
      
      this.result = "";
      if (this.toParse){
        if (this.toParse.type == "Program"){
          this.result += this.parseProgram(this.toParse);
        }else if (this.toParse.type == "Function"){
          this.result += this.parseFunction(this.toParse);
        };
      };
      
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
          var cp;
          resStr += loaderStr();
          resStr += promiseLandRequireStr();
          if (parsedAr.length === undefined){
            if (parsedAr.type == "Program"){
              cp = new CodeParser(parsedAr);
              resStr += cp.getResult();
            }else{
              unknownType(parsedAr[i]);
            };
            
          }else{
            var i = 0;
            var l = parsedAr.length;
            for (i; i < l; ++i){
              if (parsedAr[i].type == "Program"){
                cp = new CodeParser(parsedAr[i]);
                resStr += cp.getResult();
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


