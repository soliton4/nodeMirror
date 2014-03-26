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
    
    /* error handlers */
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
    
    
    /* pre processors */
    
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
    
    var checkPromising = function(par){
      if (!par || typeof par == "string"){
        return false;
      };
      if (typeof par.isPromising == "function"){
        return par.isPromising();
      };
      return par.promising || par.isPromising;
    };
    
    
    var makeCompleteStatement = function(par){
      if (par.putItAllTogetherStr){
        return par.putItAllTogetherStr();
      };
      return par;
    };
    
    
    
    var _Result = function(par){
      this.preCodeStr = "";
      this.codeStr = "";
      this.postCodeStr = "";
      this._cp = par.cp;
      
    };
    _Result.prototype = {
      push: function(par){
        if (!par){
          return;
        };
        if (typeof par == "string"){
          if (this.hasPromiseName){
            this.promiseCodeStr += par;
          }else{
            this.codeStr += par;
          };
        }else{
          if (par.promising){
            this.makePromising();
          };
          if (par.isStatement){
            this.push(par.preCodeStr);
            if (par.hasPromiseName){
              this.push(par.promiseCodeStr);
            };
            this.push(par.codeStr);
            this.postCodeStr = par.postCodeStr + this.postCodeStr;
            
          }else{
            this.addPre(par.preCodeStr);
            if (par.hasPromiseName){
              this.addPre(par.promiseCodeStr);
            };
            this.push(par.codeStr);
            this.postCodeStr = par.postCodeStr + this.postCodeStr;
          };
        };
      }
      , makePromising: function(){
        if (this.promising){
          return;
        };
        this.promising = true;
      }
      , setPromiseName: function(par){
        this.makePromising();
        if (!this.hasPromiseName){
          this.hasPromiseName = true;
          this.promiseCodeStr = this.codeStr;
        };
        this.codeStr = par;
      }
      , getPromiseNameStr: function(par){
        if (this.promising && this.hasPromiseName){
          return this.codeStr;
        };
      }
      , isPromising: function(){
        return this.promising;
      }
      , addPre: function(par){
        if (typeof par == "string"){
          this.preCodeStr += par;
        }else{
          if (par.promising){
            this.makePromising();
          };
          this.preCodeStr = par.preCodeStr + (par.hasPromiseName ? par.promiseCodeStr : "") + this.preCodeStr; // this way we can add promise code
          this.addPre(par.codeStr);
          this.postCodeStr = this.postCodeStr + par.postCodeStr;
        };
      }
      , addPost: function(par){
        this.postCodeStr += par;
      }
      , putItAllTogetherStr: function(){
        var resStr = "";
        resStr += this.preCodeStr;
        if (this.hasPromiseName){
          resStr += this.promiseCodeStr;
        };
        resStr += this.codeStr;
        resStr += this.postCodeStr;
        return resStr;
      }
      , setStatement: function(){
        this.isStatement = true;
      }
      , addVariableDeclaration: function(par){
        this._cp._addVariableDeclaration(par);
      }
    };
    
    
    /* internal parser object */
    
    var CodeParser = function(par){
      this.toParse = par.toParse;
      
      this._start = function(){
        if (this.toParse){
          if (this.toParse.type == "Program"){
            this.result += makeCompleteStatement(this.parseProgram(this.toParse));
          }else if (this.toParse.type == "Function"){
            this.result += makeCompleteStatement(this.parseFunction(this.toParse));
          };
        };
      };
      
      if (par.uniquebasis){
        this.uniquebasis = par.uniquebasis;
      }else{
        this.uniquebasis = {
          index: 1
        };
      };
      
      this.getUniqueName = function(){
        var retStr = "__UNIQUENAME" + this.uniquebasis.index++;
        return retStr;
      };
      
      this.newInstance = function(element){
        var instance = new CodeParser({
          toParse: element
          , uniquebasis: this.uniquebasis
        });
        return instance;
      };
      

      
      this.getResult = function(){
        return this.result;
      };
      
      this.result = "";
      
      
      this.newResult = function(){
        return new _Result({
          cp: this
        });
      };
      
      
      /*
        complete program
      */
      this.parseProgram = function(entry){
        findPromises(entry);
        var res = this.newResult();
        resStr = "";
        if (entry.promising){
          res.makePromising();
          res.push("var _returnPs = new Promise();\n");
          this.promising = true;
          this.returnPromise = "_returnPs";
        };
        var elements = this.parseProgElements(entry.elements);
        var i = 0;
        for (i = 0; i < this.declarations.length; ++i){
          res.push("var " + this.declarations[i] + ";\n");
        };
        res.push(elements);
        return res;
      };
      
      
      this.declarations = [];
      this._addVariableDeclaration = function(par){
        this.declarations.push(par);
      };
      
      
      /*
        function [name]([param]){[code]}
        -> new parser instance
      */
      this.parseFunction = function(par){
        //type: "Function", name: null, params: Array[0], elements: Array[1]}
        var res = this.newResult(); 
        var i = 0;
        res.push("function");
        if (par.name){
          res.push(" " + par.name);
        };
        res.push("("); // function start
        if (par.params && par.params.length){
          i = 0;
          var l = par.params.length;
          for (i; i < l; ++i){
            if (i){
              res.push(", ");
            };
            res.push(par.params[i]);
          };
        };
        res.push("){\n");
        
        if (par.promising){
          res.push("var _returnPs = new Promise();\n");
          this.promising = true;
          this.returnPromise = "_returnPs";
          res.push("try{");
        };
        var elements = this.parseProgElements(par.elements);
        for (i = 0; i < this.declarations.length; ++i){
          res.push("var " + this.declarations[i] + ";\n");
        };
        res.push(elements);
        
        if (par.promising){
          res.addPost("}catch(__returnError){\n");
          res.addPost(this.returnPromise + ".reject(__returnError);\n");
          res.addPost("};\n");
          res.addPost("return " + this.returnPromise + ";\n");
          res.addPost("}"); // function end
        }else{
          res.push("}"); // function end
        };
        return res;
      };
      

      
      // heart of code elements
      /*
        openingcode
          precode
            expression
          postcode
          precode
            expression
          postcode
          ...
        closingcode
      */
      this.parseProgElements = function(elements){
        
        var res = this.newResult();

        var i = 0;
        var l = elements.length;
        for (i; i < l; ++i){
          var statementRes = this.newResult();
          statementRes.setStatement();
          statementRes.push(this.parseExpression(elements[i]));
          statementRes.push(";\n");
          res.push(statementRes);
        };
        
        return res;
      };
      
      
      this.parseExpression = function(value){
        
        switch(value.type){
          case "Variable":
            return value.name;
            
          case "NumericLiteral":
            return "" + value.value;
            
          case "StringLiteral":
            return "\"" + value.value.replace(/\"/, "\"") + "\"";
            
          case "VariableStatement":
            return this.variableStatement(value);
            
          case "FunctionCall":
            return this.functionCall(value);

          case "Function":
            var cp = this.newInstance(value);
            return cp.getResult();
            
          case "EmptyStatement":
            // why does this exist?
            return "";

          case "AssignmentExpression":
            return this.assignmentExpression(value);

          case "ObjectLiteral":
            return this.objectLiteral(value);

          case "ReturnStatement":
            return this.returnStatement(value);

          case "UnaryExpression":
            if (value.operator == "*"){
              return this.promiseExpression(value.expression);
            };
            var res = this.newResult();
            res.push(value.operator);
            res.push(this.parseExpression(value.expression));
            return res;
            
          case "BinaryExpression":
            return this.binaryExpression(value);
            
          case "PostfixExpression":
            return this.postfixExpression(value);

          case "ArrayLiteral":
            return this.arrayLiteral(value);
            
          case "PropertyAccess":
            return this.propertyAccess(value);
            
          case "ConditionalExpression":
            return this.conditionalExpression(value);
            
          case "IfStatement":
            return this.ifStatement(value);
            
          case "WhileStatement":
            return this.whileStatement(value);
            
          case "Block":
            return this.parseProgElements(value.statements);
            
          case "ForStatement":
            return this.forStatement(value);

          default:
            unknownType(value);
        };
        return "/*this should not happen*/";
      };
      
      
      this.postfixExpression = function(par){
        var res = this.newResult();
        //{type: "PostfixExpression", operator: "++", expression: Object}
        res.push(this.parseExpression(par.expression));
        res.push(par.operator);
        
        return res;
      };
      
      
      /*
       this expression is a promise. we return code that be treated as the resolved value
      */
      this.promiseExpression = function(parExpression){
        var res = this.newResult();
        res.makePromising();
        res.addPre(this.parseExpression(parExpression));
        res.addPre(".then(function(");
        res.setPromiseName(this.getUniqueName());
        res.addPre(res.getPromiseNameStr());
        res.addPre("){try{");
        res.addPost("}catch(__returnError){" + this.returnPromise + ".reject(__returnError);\n }; });");
        return res;
      };
      
      
      this.blockAndContinue = function(par){
        var res = this.newResult();
        res.push(this.parseProgElements(par.statements));
        res.push(this.continueStatement);
        return res;
      };
      
      
      
      this.breakOrContinuePromise = function(par){
        var res = this.newResult();
        res.makePromising();
        
        
        var promiseName = par.promiseName || this.getUniqueName();
        res.setPromiseName(promiseName);
        
        var oldBreakCode = this.breakCode;
        var oldContinueCode = this.continueCode;
        
        this.breakCode = promiseName + ".resolve(false); return;\n";
        this.continueCode = promiseName + ".resolve(true); return;\n";
        
        res.push("var " + promiseName + " = new Promise();\n");
        
        if (par.preCondition){
          res.push("if(");
          res.push(par.preCondition);
          res.push("){");
        };
        
        res.push(makeCompleteStatement(this.blockAndContinue(par.block)));
        
        if (par.preCondition){
          res.push("}else{");
          res.push(this.breakCode);
          res.push("};\n");
        };
        
        this.breakCode = oldBreakCode;
        this.continueCode = oldContinueCode;
        
        return res;
      };
      
      this.generateLoop = function(par){
        var res = this.newResult();
        
        var loopFun = this.getUniqueName();
        var loopEndPromise = this.getUniqueName();
        
        res.push("var " + loopEndPromise + " = new Promise();\n");
        
        res.push("var " + loopFun + " = function(){");
        
        var loopCode = this.breakOrContinuePromise({
          block: par.block
          , preCondition: par.preCondition
          , postCode: par.postCode
        });
        res.push(makeCompleteStatement(loopCode));
        
        loopCode.push("return ");
        loopCode.push(loopCode.getPromiseNameStr() + ";\n");
        
        res.push("};\n");
        
        var doFun = this.getUniqueName();
        
        res.push("var " + doFun + " = function(){");
        res.push(loopFun);
        res.push("().then(function(contLoop){\n");
        res.push("if (contLoop){");
        
        var doFunStatement = this.newResult();
        if (par.postCode){
          doFunStatement.push(par.postCode);
        };
        doFunStatement.push(doFun + "();");
        res.push(makeCompleteStatement(doFunStatement));
        
        res.push("}else{");
        res.push(loopEndPromise + ".resolve();");
        res.push("};\n"); // if / else
        res.push("});\n"); // promise then fun
        res.push("};\n"); // doFun
        res.push(doFun + "();\n");

        res.push(loopEndPromise);
        res.push(".then(function(){");
        res.addPost("});");
        
        return res;
      };
      
      
      this.forStatement = function(par){
        //{type: "ForStatement", initializer: Object, test: Object, counter: Object, statement: Object}
        var res = this.newResult();
        var statement;
        
        var promising = false;
        if (checkPromising(par.test) || checkPromising(par.counter) || checkPromising(par.statement)){
          promising = true;
        };
        
        if (promising){
          res.push(this.parseExpression(par.initializer));
          res.push(";");
          res.push(this.generateLoop({
            block: par.statement
            , preCondition: this.parseExpression(par.test)
            , postCode: this.parseExpression(par.counter)
          }));
          
        }else{
          res.push("for(");
          res.push(this.parseExpression(par.initializer));
          res.push(";");
          res.push(this.parseExpression(par.test));
          res.push(";");
          res.push(this.parseExpression(par.counter));
          res.push("){");
          
          statement = this.newResult();
          statement.push(this.parseProgElements(par.statement.statements));
          res.push(makeCompleteStatement(statement));
          
          res.push("}");
        };
        
        return res;
      };
      
      
      this.whileStatement = function(par){
        //{type: "WhileStatement", condition: Object, statement: Object}
        var res = this.newResult();
        if (!par.statement || par.statement.type != "Block"){
          somethingsWrong({
            msg: "unknown while statement "
          });
          return "";
        };
        
        var statements;
        var condition = this.parseExpression(par.condition);
        if (checkPromising(condition) || checkPromising(par.statement)){
          
          res.push(this.generateLoop({
            block: par.statement
            , preCondition: condition
          }));
          
        }else{
          statements = this.parseExpression(par.statement);
          res.push("while(");
          res.push(condition);
          res.push("){\n");
          res.push(makeCompleteStatement(statements));
          res.push("}");
          
        };
        return res;
      };
      
      
      this.ifStatement = function(par){
        //{type: "IfStatement", condition: Object, ifStatement: Object, elseStatement: null}
        var res = this.newResult();
        
        var promising = false;
        
        if (par.ifStatement && checkPromising(par.ifStatement)){
          promising = true;
        };
        if (par.elseStatement && checkPromising(par.elseStatement)){
          promising = true;
        };
        
        var continuePromise;
        var continueCode;
        if (promising) {
          continuePromise = this.getUniqueName();
          res.push("var " + continuePromise + " = new Promise();\n");
          continueCode = continuePromise + ".resolve();";
        };
        res.push("if(");
        res.push(this.parseExpression(par.condition));
        res.push("){\n");
        if (!par.ifStatement || par.ifStatement.type != "Block"){
            somethingsWrong({
              msg: "unknown if statement "
            });
          return "";
        };
        var statement = this.newResult();
        statement.push(this.parseProgElements(par.ifStatement.statements));
        if (promising){
          statement.push(continueCode);
        };
        res.push(makeCompleteStatement(statement));
        if (par.elseStatement){
          res.push("\n}else{\n");
          if (par.elseStatement.type != "Block"){
            somethingsWrong({
              msg: "unknown else statement "
            });
            return "";
          };
          statement = this.newResult();
          statement.push(this.parseProgElements(par.elseStatement.statements));
          if (promising){
            statement.push(continueCode);
          };
          res.push(makeCompleteStatement(statement));
        };
        res.push("}");
        if (promising){
          res.push("; " + continuePromise + ".then(function(){");
          res.addPost(")};");
        };
        return res;
      };
      
      
      this.conditionalExpression = function(par){
        // {type: "ConditionalExpression", condition: Object, trueExpression: Object, falseExpression: Object}
        var res = this.newResult();
        if (par.trueExpression.promising || par.falseExpression.promising){
          // so the right expression only needs to be evaluated if the left is false
          res.makePromising();
          var tempPromise = this.getUniqueName();
          var tempValue = this.getUniqueName();
          res.addPre("var ");
          res.addPre(tempPromise);
          res.addPre(" = new Promise();\n");
          res.addPre("if(");
          res.addPre(this.parseExpression(par.condition));
          res.addPre("){");
          var trueExtraCode = this.newResult();
          trueExtraCode.push(tempPromise);
          trueExtraCode.push(".resolve(");
          trueExtraCode.push(this.parseExpression(par.trueExpression));
          trueExtraCode.push(");\n");
          res.addPre(makeCompleteStatement(trueExtraCode));
          res.addPre("}else{");
          var falseExtraCode = this.newResult();
          falseExtraCode.push(tempPromise);
          falseExtraCode.push(".resolve(");
          falseExtraCode.push(this.parseExpression(par.falseExpression));
          falseExtraCode.push(");\n");
          res.addPre(makeCompleteStatement(falseExtraCode));
          res.addPre("};\n");
          res.addPre(tempPromise);
          res.addPre(".then(");
          res.setPromiseName(this.getUniqueName());
          res.addPre(res.getPromiseNameStr());
          res.addPre("){");
          res.addPost("});");
          
        }else{
          res.push("(");
          res.push(this.parseExpression(par.condition));
          res.push(" ? ");
          res.push(this.parseExpression(par.trueExpression));
          res.push(" : ");
          res.push(this.parseExpression(par.falseExpression));
          res.push(")");
          
        };
        return res;
        
      };
      
      
      /* 
        *x || *y -> special case
        *x && *y -> normal case
      */
      this.binaryExpression = function(par){
        var res = this.newResult();
        if (par.operator == "||" && par.right.promising){
          // so the right expression only needs to be evaluated if the left is false
          res.makePromising();
          var tempPromise = this.getUniqueName();
          var tempValue = this.getUniqueName();
          res.addPre("var ");
          res.addPre(tempPromise);
          res.addPre(" = new Promise();\n");
          res.addPre("var ");
          res.addPre(tempValue);
          res.addPre(" = ");
          res.addPre(this.parseExpression(par.left));
          res.addPre(";\n");
          res.addPre("if (");
          res.addPre(tempValue);
          res.addPre("){ ");
          res.addPre(tempPromise);
          res.addPre(".resolve(");
          res.addPre(tempValue);
          res.addPre(") }else{ ");
          var rightExtraCode = this.newResult();
          rightExtraCode.push(tempPromise);
          rightExtraCode.push(".resolve(");
          rightExtraCode.push(this.parseExpression(par.right));
          rightExtraCode.push(");\n");
          res.addPre(makeCompleteStatement(rightExtraCode));
          res.addPre("};\n");
          res.addPre(tempPromise);
          res.addPre(".then(");
          res.setPromiseName(this.getUniqueName());
          res.addPre(res.getPromiseNameStr());
          res.addPre("){");
          res.addPost("});");
          
        }else{
          res.push("(");
          res.push(this.parseExpression(par.left));
          res.push(" ");
          res.push(par.operator);
          res.push(" ");
          res.push(this.parseExpression(par.right));
          res.push(")");
          
        };
        return res;
        
      };
      
      
      this.propertyAccess = function(par){
        var res = this.newResult();
        res.push(this.parseExpression(par.base));
        res.push("[");
        if (typeof par.name == "string"){
          res.push("\"");
          res.push(par.name);
          res.push("\"");
        }else{
          res.push(this.parseExpression(par.name));
        };
        res.push("]");
        return res;
      };
      
      
      /*
        {
          ["name": value]
          [, ...]
        }
      */
      
      this.objectLiteral = function(par){
        //{type: "ObjectLiteral", properties: Array[2]}
        var res = this.newResult();
        res.push("{");
        var i = 0;
        var l = (par.properties && par.properties.length) || 0;
        for (i; i < l; ++i){
          if (i){
            res.push(",\n");
          };
          var prop = par.properties[i];
          if (prop.type == "PropertyAssignment"){
            res.push("\"" + prop.name + "\": ");
            res.push(this.parseExpression(prop.value));
          }else{
            somethingsWrong({
              msg: "unknown property assignment: " + prop.type
            });
          };
        };
        res.push("}");
        return res;
      };
      
      
      /*
        1
        1.0
        "hi world"
      */
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
      
      
      /*
        var name [= value];
      */
      this.variableStatement = function(element){
        var res = this.newResult();
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
            res.addVariableDeclaration(declarations[i].name);
            if (declarations[i].value){
              res.push(declarations[i].name);
              var value = declarations[i].value;
              res.push(" = ");
              res.push(this.parseExpression(value));
            };
          }else{
            unknownType(declarations[i]);
          };
        };
        return res;

      };
      
      /*
        something = value
        something = some.complex["expression"]
      */
      
      this.assignmentExpression = function(entry){
        //{type: "AssignmentExpression", operator: "=", left: Object, right: Object}
        var res = this.newResult();
        res.push(this.parseExpression(entry.left));
        res.push(" " + entry.operator + " ");
        res.push(this.parseExpression(entry.right));
          
        return res;
      };
      
      
      /*
        funname([par1, par2, ...]);
      */
      
      this.functionCall = function(element){
        res = this.newResult();
        var i = 0;
        var l;
        res.push(this.parseExpression(element.name));
        res.push("(");
        if (element.arguments){
          l = element.arguments.length;
          for (i = 0; i < l; ++i){
            if (i){
              res.push(", ");
            };
            res.push(this.parseExpression(element.arguments[i]));
          };
        };
        res.push(")");
        return res;
      };
    
      
      
      
      
      /*
        [[value][, ...]]
      */
      
      this.arrayLiteral = function(par){
        var res = this.newResult();
        res.push("[");
        var i = 0;
        var l = (par.elements && par.elements.length) || 0;
        for (i; i < l; ++i){
          if (i){
            res.push(", ");
          };
          res.push(this.parseExpression(par.elements[i]));
        };
        res.push("]");
        return res;
      };
      
      /*
        return [value];
      */
      
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
      
    
      
      
      this._start();
      
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
          //resStr += loaderStr();
          //resStr += promiseLandRequireStr();
          if (parsedAr.length === undefined){
            if (parsedAr.type == "Program"){
              cp = new CodeParser({toParse: parsedAr});
              resStr += cp.getResult();
            }else{
              unknownType(parsedAr[i]);
            };
            
          }else{
            var i = 0;
            var l = parsedAr.length;
            for (i; i < l; ++i){
              if (parsedAr[i].type == "Program"){
                cp = new CodeParser({toParse: parsedAr[i]});
                resStr += cp.getResult();
              }else{
                unknownType(parsedAr[i]);
              };
            };
          };
          //resStr += loaderEndStr();
          p.resolve(resStr);
        });
        console.log("returning promise");
        return p.promise;
      }
    };
    
    return parser;
    
  });
})();


