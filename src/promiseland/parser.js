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
    
    var variableStatement = function(element){
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
            resStr += parseValue(declarations[i].value);
          };
          resStr += ";\n";
        }else{
          unknownType(declarations[i]);
        };
      };
      
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
        resStr += parseExpression(elements[i]);
        resStr += ";\n";
      };
      return resStr;
    };
    
    var parseProgram = function(entry){
      return parseProgElements(entry.elements);
    };
    
    var parser = {
      parse: function(promiseLandCodeStr){
        var p = new promiseLand.Promise();
        console.log("2");
        promiseLand._getParser().then(function(parser){
          console.log(parser);
          var parsedAr = parser.parse(promiseLandCodeStr);
          
          var i = 0;
          var l = parsedAr.length;
          var resStr = "";
          for (i; i < l; ++i){
            if (parsedAr[i].type == "Program"){
              resStr += parseProgram(parsedAr[i]);
            }else{
              unknownType(parsedAr[i]);
            };
          };
          p.resolve(resStr);
          
        });
        console.log("returning promise");
        return p.promise;
      }
    };
    
    return parser;
    
  });
})();


