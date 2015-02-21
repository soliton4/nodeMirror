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

if (promiseland._hasModule({ hashStr: "2267d37fbbc2ecb90d64c30ce93f2df0" })){ return promiseland._getModule("2267d37fbbc2ecb90d64c30ce93f2df0"); };
var PL$20/*RegExp*/;try{PL$20/*RegExp*/ = RegExp;}catch(e){};
var PL$24/*Error*/;try{PL$24/*Error*/ = Error;}catch(e){};
var PL$32/*String*/;try{PL$32/*String*/ = String;}catch(e){};
var PL$56/*code**/;try{PL$56/*code**/ = code*;}catch(e){};
var PL$71/*parseInt*/;try{PL$71/*parseInt*/ = parseInt;}catch(e){};
var PL$74/*parseFloat*/;try{PL$74/*parseFloat*/ = parseFloat;}catch(e){};
var PL$158/*Array*/;try{PL$158/*Array*/ = Array;}catch(e){};
var PL$187/*Object*/;try{PL$187/*Object*/ = Object;}catch(e){};
var PL$1 = (function(){
"use strict";
function PL$21/*assert*/(PL$22/*condition*/, PL$23/*message*/){

  ;
  if(! PL$22/*condition*/){
    throw new PL$24/*Error*/(("ASSERT: " + PL$23/*message*/));
  };
  ;};
function PL$25/*isDecimalDigit*/(PL$26/*ch*/){

  ;
  return ((PL$26/*ch*/ >= 48) && (PL$26/*ch*/ <= 57));
  ;};
function PL$27/*isHexDigit*/(PL$26/*ch*/){

  ;
  return ("0123456789abcdefABCDEF"["indexOf"](PL$26/*ch*/) >= 0);
  ;};
function PL$28/*isOctalDigit*/(PL$26/*ch*/){

  ;
  return ("01234567"["indexOf"](PL$26/*ch*/) >= 0);
  ;};
function PL$29/*isWhiteSpace*/(PL$26/*ch*/){

  ;
  return ((((((PL$26/*ch*/ === 32) || (PL$26/*ch*/ === 9)) || (PL$26/*ch*/ === 11)) || (PL$26/*ch*/ === 12)) || (PL$26/*ch*/ === 160)) || ((PL$26/*ch*/ >= 5760) && ([
    5760, 
    6158, 
    8192, 
    8193, 
    8194, 
    8195, 
    8196, 
    8197, 
    8198, 
    8199, 
    8200, 
    8201, 
    8202, 
    8239, 
    8287, 
    12288, 
    65279
  ]["indexOf"](PL$26/*ch*/) >= 0)));
  ;};
function PL$30/*isLineTerminator*/(PL$26/*ch*/){

  ;
  return ((((PL$26/*ch*/ === 10) || (PL$26/*ch*/ === 13)) || (PL$26/*ch*/ === 8232)) || (PL$26/*ch*/ === 8233));
  ;};
function PL$31/*isIdentifierStart*/(PL$26/*ch*/){

  ;
  return ((((((PL$26/*ch*/ === 36) || (PL$26/*ch*/ === 95)) || ((PL$26/*ch*/ >= 65) && (PL$26/*ch*/ <= 90))) || ((PL$26/*ch*/ >= 97) && (PL$26/*ch*/ <= 122))) || (PL$26/*ch*/ === 92)) || ((PL$26/*ch*/ >= 128) && PL$10/*Regex*/["NonAsciiIdentifierStart"]["test"](PL$32/*String*/["fromCharCode"](PL$26/*ch*/))));
  ;};
function PL$33/*isIdentifierPart*/(PL$26/*ch*/){

  ;
  return (((((((PL$26/*ch*/ === 36) || (PL$26/*ch*/ === 95)) || ((PL$26/*ch*/ >= 65) && (PL$26/*ch*/ <= 90))) || ((PL$26/*ch*/ >= 97) && (PL$26/*ch*/ <= 122))) || ((PL$26/*ch*/ >= 48) && (PL$26/*ch*/ <= 57))) || (PL$26/*ch*/ === 92)) || ((PL$26/*ch*/ >= 128) && PL$10/*Regex*/["NonAsciiIdentifierPart"]["test"](PL$32/*String*/["fromCharCode"](PL$26/*ch*/))));
  ;};
function PL$34/*isFutureReservedWord*/(PL$35/*id*/){

  ;
  switch (PL$35/*id*/){
    case "class":
      
    case "enum":
      
    case "export":
      
    case "extends":
      
    case "import":
      
    case "super":
      
      return true;
    default:
      
      return false;
    
  };
  ;};
function PL$36/*isStrictModeReservedWord*/(PL$35/*id*/){

  ;
  switch (PL$35/*id*/){
    case "implements":
      
    case "interface":
      
    case "package":
      
    case "private":
      
    case "protected":
      
    case "public":
      
    case "static":
      
    case "yield":
      
    case "let":
      
      return true;
    default:
      
      return false;
    
  };
  ;};
function PL$37/*isRestrictedWord*/(PL$35/*id*/){

  ;
  return ((PL$35/*id*/ === "eval") || (PL$35/*id*/ === "arguments"));
  ;};
function PL$38/*isKeyword*/(PL$35/*id*/){

  ;
  if((PL$12/*strict*/ && PL$36/*isStrictModeReservedWord*/(PL$35/*id*/))){
    return true;
  };
  switch (PL$35/*id*/["length"]){
    case 2:
      
      return (((PL$35/*id*/ === "if") || (PL$35/*id*/ === "in")) || (PL$35/*id*/ === "do"));
    case 3:
      
      return (((((PL$35/*id*/ === "var") || (PL$35/*id*/ === "for")) || (PL$35/*id*/ === "new")) || (PL$35/*id*/ === "try")) || (PL$35/*id*/ === "let"));
    case 4:
      
      return ((((((PL$35/*id*/ === "this") || (PL$35/*id*/ === "else")) || (PL$35/*id*/ === "case")) || (PL$35/*id*/ === "void")) || (PL$35/*id*/ === "with")) || (PL$35/*id*/ === "enum"));
    case 5:
      
      return ((((((((PL$35/*id*/ === "while") || (PL$35/*id*/ === "break")) || (PL$35/*id*/ === "catch")) || (PL$35/*id*/ === "throw")) || (PL$35/*id*/ === "const")) || (PL$35/*id*/ === "yield")) || (PL$35/*id*/ === "class")) || (PL$35/*id*/ === "super"));
    case 6:
      
      return ((((((PL$35/*id*/ === "return") || (PL$35/*id*/ === "typeof")) || (PL$35/*id*/ === "delete")) || (PL$35/*id*/ === "switch")) || (PL$35/*id*/ === "export")) || (PL$35/*id*/ === "import"));
    case 7:
      
      return (((PL$35/*id*/ === "default") || (PL$35/*id*/ === "finally")) || (PL$35/*id*/ === "extends"));
    case 8:
      
      return (((PL$35/*id*/ === "function") || (PL$35/*id*/ === "continue")) || (PL$35/*id*/ === "debugger"));
    case 10:
      
      return (PL$35/*id*/ === "instanceof");
    default:
      
      return false;
    
  };
  ;};
function PL$39/*addComment*/(PL$40/*type*/, PL$41/*value*/, PL$42/*start*/, PL$43/*end*/, PL$44/*loc*/){

  ;
  var PL$45/*comment*/;
  ;
  PL$21/*assert*/((typeof PL$42/*start*/ === "number"), "Comment must have valid position");
  if((PL$18/*state*/["lastCommentStart"] >= PL$42/*start*/)){
    return;
  };
  PL$18/*state*/["lastCommentStart"] = PL$42/*start*/;
  PL$45/*comment*/ = {
    "type": PL$40/*type*/,
    "value": PL$41/*value*/
  };
  if(PL$19/*extra*/["range"]){
    PL$45/*comment*/["range"] = [
      PL$42/*start*/, 
      PL$43/*end*/
    ];
  };
  if(PL$19/*extra*/["loc"]){
    PL$45/*comment*/["loc"] = PL$44/*loc*/;
  };
  PL$19/*extra*/["comments"]["push"](PL$45/*comment*/);
  if(PL$19/*extra*/["attachComment"]){
    PL$19/*extra*/["leadingComments"]["push"](PL$45/*comment*/);
    PL$19/*extra*/["trailingComments"]["push"](PL$45/*comment*/);
  };
  ;};
function PL$46/*skipSingleLineComment*/(PL$47/*offset*/){

  ;
  var PL$42/*start*/;
  ;
  var PL$44/*loc*/;
  ;
  var PL$26/*ch*/;
  ;
  var PL$45/*comment*/;
  ;
  PL$42/*start*/ = (PL$13/*index*/ - PL$47/*offset*/);
  PL$44/*loc*/ = {
    "start": {
      "line": PL$14/*lineNumber*/,
      "column": ((PL$13/*index*/ - PL$15/*lineStart*/) - PL$47/*offset*/)
    }
  };
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$26/*ch*/ = PL$11/*source*/["charCodeAt"](PL$13/*index*/);
    ++PL$13/*index*/;
    if(PL$30/*isLineTerminator*/(PL$26/*ch*/)){
      if(PL$19/*extra*/["comments"]){
        PL$45/*comment*/ = PL$11/*source*/["slice"]((PL$42/*start*/ + PL$47/*offset*/), (PL$13/*index*/ - 1));
        PL$44/*loc*/["end"] = {
          "line": PL$14/*lineNumber*/,
          "column": ((PL$13/*index*/ - PL$15/*lineStart*/) - 1)
        };
        PL$39/*addComment*/("Line", PL$45/*comment*/, PL$42/*start*/, (PL$13/*index*/ - 1), PL$44/*loc*/);
      };
      if(((PL$26/*ch*/ === 13) && (PL$11/*source*/["charCodeAt"](PL$13/*index*/) === 10))){
        ++PL$13/*index*/;
      };
      ++PL$14/*lineNumber*/;
      PL$15/*lineStart*/ = PL$13/*index*/;
      return;
    };}};
  if(PL$19/*extra*/["comments"]){
    PL$45/*comment*/ = PL$11/*source*/["slice"]((PL$42/*start*/ + PL$47/*offset*/), PL$13/*index*/);
    PL$44/*loc*/["end"] = {
      "line": PL$14/*lineNumber*/,
      "column": (PL$13/*index*/ - PL$15/*lineStart*/)
    };
    PL$39/*addComment*/("Line", PL$45/*comment*/, PL$42/*start*/, PL$13/*index*/, PL$44/*loc*/);
  };
  ;};
function PL$48/*skipMultiLineComment*/(){

  ;
  var PL$42/*start*/;
  ;
  var PL$44/*loc*/;
  ;
  var PL$26/*ch*/;
  ;
  var PL$45/*comment*/;
  ;
  if(PL$19/*extra*/["comments"]){
    PL$42/*start*/ = (PL$13/*index*/ - 2);
    PL$44/*loc*/ = {
      "start": {
        "line": PL$14/*lineNumber*/,
        "column": ((PL$13/*index*/ - PL$15/*lineStart*/) - 2)
      }
    };
  };
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$26/*ch*/ = PL$11/*source*/["charCodeAt"](PL$13/*index*/);
    if(PL$30/*isLineTerminator*/(PL$26/*ch*/)){
      if(((PL$26/*ch*/ === 13) && (PL$11/*source*/["charCodeAt"]((PL$13/*index*/ + 1)) === 10))){
        ++PL$13/*index*/;
      };
      ++PL$14/*lineNumber*/;
      ++PL$13/*index*/;
      PL$15/*lineStart*/ = PL$13/*index*/;
      if((PL$13/*index*/ >= PL$16/*length*/)){
        PL$49/*throwError*/({
          
        }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
      };
    }else{
    if((PL$26/*ch*/ === 42)){
      if((PL$11/*source*/["charCodeAt"]((PL$13/*index*/ + 1)) === 47)){
        ++PL$13/*index*/;
        ++PL$13/*index*/;
        if(PL$19/*extra*/["comments"]){
          PL$45/*comment*/ = PL$11/*source*/["slice"]((PL$42/*start*/ + 2), (PL$13/*index*/ - 2));
          PL$44/*loc*/["end"] = {
            "line": PL$14/*lineNumber*/,
            "column": (PL$13/*index*/ - PL$15/*lineStart*/)
          };
          PL$39/*addComment*/("Block", PL$45/*comment*/, PL$42/*start*/, PL$13/*index*/, PL$44/*loc*/);
        };
        return;
      };
      ++PL$13/*index*/;
    }else{
    ++PL$13/*index*/;
    };
    };}};
  PL$49/*throwError*/({
    
  }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
  ;};
function PL$50/*skipComment*/(){

  ;
  var PL$26/*ch*/;
  ;
  var PL$42/*start*/;
  ;
  PL$42/*start*/ = (PL$13/*index*/ === 0);
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$26/*ch*/ = PL$11/*source*/["charCodeAt"](PL$13/*index*/);
    if(PL$29/*isWhiteSpace*/(PL$26/*ch*/)){
      ++PL$13/*index*/;
    }else{
    if(PL$30/*isLineTerminator*/(PL$26/*ch*/)){
      ++PL$13/*index*/;
      if(((PL$26/*ch*/ === 13) && (PL$11/*source*/["charCodeAt"](PL$13/*index*/) === 10))){
        ++PL$13/*index*/;
      };
      ++PL$14/*lineNumber*/;
      PL$15/*lineStart*/ = PL$13/*index*/;
      PL$42/*start*/ = true;
    }else{
    if((PL$26/*ch*/ === 47)){
      PL$26/*ch*/ = PL$11/*source*/["charCodeAt"]((PL$13/*index*/ + 1));
      if((PL$26/*ch*/ === 47)){
        ++PL$13/*index*/;
        ++PL$13/*index*/;
        PL$46/*skipSingleLineComment*/(2);
        PL$42/*start*/ = true;
      }else{
      if((PL$26/*ch*/ === 42)){
        ++PL$13/*index*/;
        ++PL$13/*index*/;
        PL$48/*skipMultiLineComment*/();
      }else{
      break;;
      };
      };
    }else{
    if((PL$42/*start*/ && (PL$26/*ch*/ === 45))){
      if(((PL$11/*source*/["charCodeAt"]((PL$13/*index*/ + 1)) === 45) && (PL$11/*source*/["charCodeAt"]((PL$13/*index*/ + 2)) === 62))){
        PL$13/*index*/ += 3;
        PL$46/*skipSingleLineComment*/(3);
      }else{
      break;;
      };
    }else{
    if((PL$26/*ch*/ === 60)){
      if((PL$11/*source*/["slice"]((PL$13/*index*/ + 1), (PL$13/*index*/ + 4)) === "!--")){
        ++PL$13/*index*/;
        ++PL$13/*index*/;
        ++PL$13/*index*/;
        ++PL$13/*index*/;
        PL$46/*skipSingleLineComment*/(4);
      }else{
      break;;
      };
    }else{
    break;;
    };
    };
    };
    };
    };}};
  ;};
function PL$51/*scanHexEscape*/(PL$52/*prefix*/){

  ;
  var PL$53/*i*/;
  ;
  var PL$54/*len*/;
  ;
  var PL$26/*ch*/;
  ;
  var PL$55/*code*/ = 0;
  ;
  PL$54/*len*/ = ((PL$52/*prefix*/ === "u") ? 4 : 2);
  for(PL$53/*i*/ = 0;(PL$53/*i*/ < PL$54/*len*/);++PL$53/*i*/){{
    if(((PL$13/*index*/ < PL$16/*length*/) && PL$27/*isHexDigit*/(PL$11/*source*/[PL$13/*index*/]))){
      PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/++];
      PL$55/*code*/ = ((PL$56/*code**/ * 16) + "0123456789abcdef"["indexOf"](PL$26/*ch*/["toLowerCase"]()));
    }else{
    return "";
    };}};
  return PL$32/*String*/["fromCharCode"](PL$55/*code*/);
  ;};
function PL$57/*scanUnicodeCodePointEscape*/(){

  ;
  var PL$26/*ch*/;
  ;
  var PL$55/*code*/;
  ;
  var PL$58/*cu1*/;
  ;
  var PL$59/*cu2*/;
  ;
  PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/];
  PL$55/*code*/ = 0;
  if((PL$26/*ch*/ === "}")){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
  };
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/++];
    if(! PL$27/*isHexDigit*/(PL$26/*ch*/)){
      break;;
    };
    PL$55/*code*/ = ((PL$56/*code**/ * 16) + "0123456789abcdef"["indexOf"](PL$26/*ch*/["toLowerCase"]()));}};
  if(((PL$55/*code*/ > 1114111) || (PL$26/*ch*/ !== "}"))){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
  };
  if((PL$55/*code*/ <= 65535)){
    return PL$32/*String*/["fromCharCode"](PL$55/*code*/);
  };
  PL$58/*cu1*/ = (((PL$55/*code*/ - 65536) >> 10) + 55296);
  PL$59/*cu2*/ = (((PL$55/*code*/ - 65536) & 1023) + 56320);
  return PL$32/*String*/["fromCharCode"](PL$58/*cu1*/, PL$59/*cu2*/);
  ;};
function PL$60/*getEscapedIdentifier*/(){

  ;
  var PL$26/*ch*/;
  ;
  var PL$35/*id*/;
  ;
  PL$26/*ch*/ = PL$11/*source*/["charCodeAt"](PL$13/*index*/++);
  PL$35/*id*/ = PL$32/*String*/["fromCharCode"](PL$26/*ch*/);
  if((PL$26/*ch*/ === 92)){
    if((PL$11/*source*/["charCodeAt"](PL$13/*index*/) !== 117)){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
    };
    ++PL$13/*index*/;
    PL$26/*ch*/ = PL$51/*scanHexEscape*/("u");
    if(((! PL$26/*ch*/ || (PL$26/*ch*/ === "\\")) || ! PL$31/*isIdentifierStart*/(PL$26/*ch*/["charCodeAt"](0)))){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
    };
    PL$35/*id*/ = PL$26/*ch*/;
  };
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$26/*ch*/ = PL$11/*source*/["charCodeAt"](PL$13/*index*/);
    if(! PL$33/*isIdentifierPart*/(PL$26/*ch*/)){
      break;;
    };
    ++PL$13/*index*/;
    PL$35/*id*/ += PL$32/*String*/["fromCharCode"](PL$26/*ch*/);
    if((PL$26/*ch*/ === 92)){
      PL$35/*id*/ = PL$35/*id*/["substr"](0, (PL$35/*id*/["length"] - 1));
      if((PL$11/*source*/["charCodeAt"](PL$13/*index*/) !== 117)){
        PL$49/*throwError*/({
          
        }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
      };
      ++PL$13/*index*/;
      PL$26/*ch*/ = PL$51/*scanHexEscape*/("u");
      if(((! PL$26/*ch*/ || (PL$26/*ch*/ === "\\")) || ! PL$33/*isIdentifierPart*/(PL$26/*ch*/["charCodeAt"](0)))){
        PL$49/*throwError*/({
          
        }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
      };
      PL$35/*id*/ += PL$26/*ch*/;
    };}};
  return PL$35/*id*/;
  ;};
function PL$61/*getIdentifier*/(){

  ;
  var PL$42/*start*/;
  ;
  var PL$26/*ch*/;
  ;
  PL$42/*start*/ = PL$13/*index*/++;
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$26/*ch*/ = PL$11/*source*/["charCodeAt"](PL$13/*index*/);
    if((PL$26/*ch*/ === 92)){
      PL$13/*index*/ = PL$42/*start*/;
      return PL$60/*getEscapedIdentifier*/();
    };
    if(PL$33/*isIdentifierPart*/(PL$26/*ch*/)){
      ++PL$13/*index*/;
    }else{
    break;;
    };}};
  return PL$11/*source*/["slice"](PL$42/*start*/, PL$13/*index*/);
  ;};
function PL$62/*scanIdentifier*/(){

  ;
  var PL$42/*start*/;
  ;
  var PL$35/*id*/;
  ;
  var PL$40/*type*/;
  ;
  PL$42/*start*/ = PL$13/*index*/;
  PL$35/*id*/ = ((PL$11/*source*/["charCodeAt"](PL$13/*index*/) === 92) ? PL$60/*getEscapedIdentifier*/() : PL$61/*getIdentifier*/());
  if((PL$35/*id*/["length"] === 1)){
    PL$40/*type*/ = PL$3/*Token*/["Identifier"];
  }else{
  if(PL$38/*isKeyword*/(PL$35/*id*/)){
    PL$40/*type*/ = PL$3/*Token*/["Keyword"];
  }else{
  if((PL$35/*id*/ === "null")){
    PL$40/*type*/ = PL$3/*Token*/["NullLiteral"];
  }else{
  if(((PL$35/*id*/ === "true") || (PL$35/*id*/ === "false"))){
    PL$40/*type*/ = PL$3/*Token*/["BooleanLiteral"];
  }else{
  PL$40/*type*/ = PL$3/*Token*/["Identifier"];
  };
  };
  };
  };
  return {
    "type": PL$40/*type*/,
    "value": PL$35/*id*/,
    "lineNumber": PL$14/*lineNumber*/,
    "lineStart": PL$15/*lineStart*/,
    "start": PL$42/*start*/,
    "end": PL$13/*index*/
  };
  ;};
function PL$63/*scanPunctuator*/(){

  ;
  var PL$42/*start*/ = PL$13/*index*/;
  ;
  var PL$55/*code*/ = PL$11/*source*/["charCodeAt"](PL$13/*index*/);
  ;
  var PL$64/*code2*/;
  ;
  var PL$65/*ch1*/ = PL$11/*source*/[PL$13/*index*/];
  ;
  var PL$66/*ch2*/;
  ;
  var PL$67/*ch3*/;
  ;
  var PL$68/*ch4*/;
  ;
  switch (PL$55/*code*/){
    case 46:
      
    case 40:
      
    case 41:
      
    case 59:
      
    case 44:
      
    case 123:
      
    case 125:
      
    case 91:
      
    case 93:
      
    case 58:
      
    case 63:
      
    case 126:
      
      ++PL$13/*index*/;
      if(PL$19/*extra*/["tokenize"]){
        if((PL$55/*code*/ === 40)){
          PL$19/*extra*/["openParenToken"] = PL$19/*extra*/["tokens"]["length"];
        }else{
        if((PL$55/*code*/ === 123)){
          PL$19/*extra*/["openCurlyToken"] = PL$19/*extra*/["tokens"]["length"];
        };
        };
      };
      return {
        "type": PL$3/*Token*/["Punctuator"],
        "value": PL$32/*String*/["fromCharCode"](PL$55/*code*/),
        "lineNumber": PL$14/*lineNumber*/,
        "lineStart": PL$15/*lineStart*/,
        "start": PL$42/*start*/,
        "end": PL$13/*index*/
      };
    default:
      
      PL$64/*code2*/ = PL$11/*source*/["charCodeAt"]((PL$13/*index*/ + 1));
      if((PL$64/*code2*/ === 61)){
        switch (PL$55/*code*/){
          case 43:
            
          case 45:
            
          case 47:
            
          case 60:
            
          case 62:
            
          case 94:
            
          case 124:
            
          case 37:
            
          case 38:
            
          case 42:
            
            PL$13/*index*/ += 2;
            return {
              "type": PL$3/*Token*/["Punctuator"],
              "value": (PL$32/*String*/["fromCharCode"](PL$55/*code*/) + PL$32/*String*/["fromCharCode"](PL$64/*code2*/)),
              "lineNumber": PL$14/*lineNumber*/,
              "lineStart": PL$15/*lineStart*/,
              "start": PL$42/*start*/,
              "end": PL$13/*index*/
            };
          case 33:
            
          case 61:
            
            PL$13/*index*/ += 2;
            if((PL$11/*source*/["charCodeAt"](PL$13/*index*/) === 61)){
              ++PL$13/*index*/;
            };
            return {
              "type": PL$3/*Token*/["Punctuator"],
              "value": PL$11/*source*/["slice"](PL$42/*start*/, PL$13/*index*/),
              "lineNumber": PL$14/*lineNumber*/,
              "lineStart": PL$15/*lineStart*/,
              "start": PL$42/*start*/,
              "end": PL$13/*index*/
            };
          
        };
      };
    
  };
  PL$68/*ch4*/ = PL$11/*source*/["substr"](PL$13/*index*/, 4);
  if((PL$68/*ch4*/ === ">>>=")){
    PL$13/*index*/ += 4;
    return {
      "type": PL$3/*Token*/["Punctuator"],
      "value": PL$68/*ch4*/,
      "lineNumber": PL$14/*lineNumber*/,
      "lineStart": PL$15/*lineStart*/,
      "start": PL$42/*start*/,
      "end": PL$13/*index*/
    };
  };
  PL$67/*ch3*/ = PL$68/*ch4*/["substr"](0, 3);
  if((((PL$67/*ch3*/ === ">>>") || (PL$67/*ch3*/ === "<<=")) || (PL$67/*ch3*/ === ">>="))){
    PL$13/*index*/ += 3;
    return {
      "type": PL$3/*Token*/["Punctuator"],
      "value": PL$67/*ch3*/,
      "lineNumber": PL$14/*lineNumber*/,
      "lineStart": PL$15/*lineStart*/,
      "start": PL$42/*start*/,
      "end": PL$13/*index*/
    };
  };
  PL$66/*ch2*/ = PL$67/*ch3*/["substr"](0, 2);
  if((((PL$65/*ch1*/ === PL$66/*ch2*/[1]) && ("+-<>&|"["indexOf"](PL$65/*ch1*/) >= 0)) || (PL$66/*ch2*/ === "=>"))){
    PL$13/*index*/ += 2;
    return {
      "type": PL$3/*Token*/["Punctuator"],
      "value": PL$66/*ch2*/,
      "lineNumber": PL$14/*lineNumber*/,
      "lineStart": PL$15/*lineStart*/,
      "start": PL$42/*start*/,
      "end": PL$13/*index*/
    };
  };
  if(("<>=!+-*%&|^/"["indexOf"](PL$65/*ch1*/) >= 0)){
    ++PL$13/*index*/;
    return {
      "type": PL$3/*Token*/["Punctuator"],
      "value": PL$65/*ch1*/,
      "lineNumber": PL$14/*lineNumber*/,
      "lineStart": PL$15/*lineStart*/,
      "start": PL$42/*start*/,
      "end": PL$13/*index*/
    };
  };
  PL$49/*throwError*/({
    
  }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
  ;};
function PL$69/*scanHexLiteral*/(PL$42/*start*/){

  ;
  var PL$70/*number*/ = "";
  ;
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    if(! PL$27/*isHexDigit*/(PL$11/*source*/[PL$13/*index*/])){
      break;;
    };
    PL$70/*number*/ += PL$11/*source*/[PL$13/*index*/++];}};
  if((PL$70/*number*/["length"] === 0)){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
  };
  if(PL$31/*isIdentifierStart*/(PL$11/*source*/["charCodeAt"](PL$13/*index*/))){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
  };
  return {
    "type": PL$3/*Token*/["NumericLiteral"],
    "value": PL$71/*parseInt*/(("0x" + PL$70/*number*/), 16),
    "lineNumber": PL$14/*lineNumber*/,
    "lineStart": PL$15/*lineStart*/,
    "start": PL$42/*start*/,
    "end": PL$13/*index*/
  };
  ;};
function PL$72/*scanOctalLiteral*/(PL$42/*start*/){

  ;
  var PL$70/*number*/ = ("0" + PL$11/*source*/[PL$13/*index*/++]);
  ;
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    if(! PL$28/*isOctalDigit*/(PL$11/*source*/[PL$13/*index*/])){
      break;;
    };
    PL$70/*number*/ += PL$11/*source*/[PL$13/*index*/++];}};
  if((PL$31/*isIdentifierStart*/(PL$11/*source*/["charCodeAt"](PL$13/*index*/)) || PL$25/*isDecimalDigit*/(PL$11/*source*/["charCodeAt"](PL$13/*index*/)))){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
  };
  return {
    "type": PL$3/*Token*/["NumericLiteral"],
    "value": PL$71/*parseInt*/(PL$70/*number*/, 8),
    "octal": true,
    "lineNumber": PL$14/*lineNumber*/,
    "lineStart": PL$15/*lineStart*/,
    "start": PL$42/*start*/,
    "end": PL$13/*index*/
  };
  ;};
function PL$73/*scanNumericLiteral*/(){

  ;
  var PL$70/*number*/;
  ;
  var PL$42/*start*/;
  ;
  var PL$26/*ch*/;
  ;
  PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/];
  PL$21/*assert*/((PL$25/*isDecimalDigit*/(PL$26/*ch*/["charCodeAt"](0)) || (PL$26/*ch*/ === ".")), "Numeric literal must start with a decimal digit or a decimal point");
  PL$42/*start*/ = PL$13/*index*/;
  PL$70/*number*/ = "";
  if((PL$26/*ch*/ !== ".")){
    PL$70/*number*/ = PL$11/*source*/[PL$13/*index*/++];
    PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/];
    if((PL$70/*number*/ === "0")){
      if(((PL$26/*ch*/ === "x") || (PL$26/*ch*/ === "X"))){
        ++PL$13/*index*/;
        return PL$69/*scanHexLiteral*/(PL$42/*start*/);
      };
      if(PL$28/*isOctalDigit*/(PL$26/*ch*/)){
        return PL$72/*scanOctalLiteral*/(PL$42/*start*/);
      };
      if((PL$26/*ch*/ && PL$25/*isDecimalDigit*/(PL$26/*ch*/["charCodeAt"](0)))){
        PL$49/*throwError*/({
          
        }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
      };
    };
    while(PL$25/*isDecimalDigit*/(PL$11/*source*/["charCodeAt"](PL$13/*index*/))){
    {
      PL$70/*number*/ += PL$11/*source*/[PL$13/*index*/++];}};
    PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/];
  };
  if((PL$26/*ch*/ === ".")){
    PL$70/*number*/ += PL$11/*source*/[PL$13/*index*/++];
    while(PL$25/*isDecimalDigit*/(PL$11/*source*/["charCodeAt"](PL$13/*index*/))){
    {
      PL$70/*number*/ += PL$11/*source*/[PL$13/*index*/++];}};
    PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/];
  };
  if(((PL$26/*ch*/ === "e") || (PL$26/*ch*/ === "E"))){
    PL$70/*number*/ += PL$11/*source*/[PL$13/*index*/++];
    PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/];
    if(((PL$26/*ch*/ === "+") || (PL$26/*ch*/ === "-"))){
      PL$70/*number*/ += PL$11/*source*/[PL$13/*index*/++];
    };
    if(PL$25/*isDecimalDigit*/(PL$11/*source*/["charCodeAt"](PL$13/*index*/))){
      while(PL$25/*isDecimalDigit*/(PL$11/*source*/["charCodeAt"](PL$13/*index*/))){
      {
        PL$70/*number*/ += PL$11/*source*/[PL$13/*index*/++];}};
    }else{
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
    };
  };
  if(PL$31/*isIdentifierStart*/(PL$11/*source*/["charCodeAt"](PL$13/*index*/))){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
  };
  return {
    "type": PL$3/*Token*/["NumericLiteral"],
    "value": PL$74/*parseFloat*/(PL$70/*number*/),
    "lineNumber": PL$14/*lineNumber*/,
    "lineStart": PL$15/*lineStart*/,
    "start": PL$42/*start*/,
    "end": PL$13/*index*/
  };
  ;};
function PL$75/*scanStringLiteral*/(){

  ;
  var PL$76/*str*/ = "";
  ;
  var PL$77/*quote*/;
  ;
  var PL$42/*start*/;
  ;
  var PL$26/*ch*/;
  ;
  var PL$55/*code*/;
  ;
  var PL$78/*unescaped*/;
  ;
  var PL$79/*restore*/;
  ;
  var PL$80/*octal*/ = false;
  ;
  var PL$81/*startLineNumber*/;
  ;
  var PL$82/*startLineStart*/;
  ;
  PL$81/*startLineNumber*/ = PL$14/*lineNumber*/;
  PL$82/*startLineStart*/ = PL$15/*lineStart*/;
  PL$77/*quote*/ = PL$11/*source*/[PL$13/*index*/];
  PL$21/*assert*/(((PL$77/*quote*/ === "'") || (PL$77/*quote*/ === "\"")), "String literal must starts with a quote");
  PL$42/*start*/ = PL$13/*index*/;
  ++PL$13/*index*/;
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/++];
    if((PL$26/*ch*/ === PL$77/*quote*/)){
      PL$77/*quote*/ = "";
      break;;
    }else{
    if((PL$26/*ch*/ === "\\")){
      PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/++];
      if((! PL$26/*ch*/ || ! PL$30/*isLineTerminator*/(PL$26/*ch*/["charCodeAt"](0)))){
        switch (PL$26/*ch*/){
          case "u":
            
          case "x":
            
            if((PL$11/*source*/[PL$13/*index*/] === "{")){
              ++PL$13/*index*/;
              PL$76/*str*/ += PL$57/*scanUnicodeCodePointEscape*/();
            }else{
            PL$79/*restore*/ = PL$13/*index*/;
            PL$78/*unescaped*/ = PL$51/*scanHexEscape*/(PL$26/*ch*/);
            if(PL$78/*unescaped*/){
              PL$76/*str*/ += PL$78/*unescaped*/;
            }else{
            PL$13/*index*/ = PL$79/*restore*/;
            PL$76/*str*/ += PL$26/*ch*/;
            };
            };
            break;;
          case "n":
            
            PL$76/*str*/ += "\n";
            break;;
          case "r":
            
            PL$76/*str*/ += "\r";
            break;;
          case "t":
            
            PL$76/*str*/ += "	";
            break;;
          case "b":
            
            PL$76/*str*/ += "";
            break;;
          case "f":
            
            PL$76/*str*/ += "";
            break;;
          case "v":
            
            PL$76/*str*/ += "";
            break;;
          default:
            
            if(PL$28/*isOctalDigit*/(PL$26/*ch*/)){
              PL$55/*code*/ = "01234567"["indexOf"](PL$26/*ch*/);
              if((PL$55/*code*/ !== 0)){
                PL$80/*octal*/ = true;
              };
              if(((PL$13/*index*/ < PL$16/*length*/) && PL$28/*isOctalDigit*/(PL$11/*source*/[PL$13/*index*/]))){
                PL$80/*octal*/ = true;
                PL$55/*code*/ = ((PL$56/*code**/ * 8) + "01234567"["indexOf"](PL$11/*source*/[PL$13/*index*/++]));
                if(((("0123"["indexOf"](PL$26/*ch*/) >= 0) && (PL$13/*index*/ < PL$16/*length*/)) && PL$28/*isOctalDigit*/(PL$11/*source*/[PL$13/*index*/]))){
                  PL$55/*code*/ = ((PL$56/*code**/ * 8) + "01234567"["indexOf"](PL$11/*source*/[PL$13/*index*/++]));
                };
              };
              PL$76/*str*/ += PL$32/*String*/["fromCharCode"](PL$55/*code*/);
            }else{
            PL$76/*str*/ += PL$26/*ch*/;
            };
            break;;
          
        };
      }else{
      ++PL$14/*lineNumber*/;
      if(((PL$26/*ch*/ === "\r") && (PL$11/*source*/[PL$13/*index*/] === "\n"))){
        ++PL$13/*index*/;
      };
      PL$15/*lineStart*/ = PL$13/*index*/;
      };
    }else{
    if(PL$30/*isLineTerminator*/(PL$26/*ch*/["charCodeAt"](0))){
      break;;
    }else{
    PL$76/*str*/ += PL$26/*ch*/;
    };
    };
    };}};
  if((PL$77/*quote*/ !== "")){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
  };
  return {
    "type": PL$3/*Token*/["StringLiteral"],
    "value": PL$76/*str*/,
    "octal": PL$80/*octal*/,
    "startLineNumber": PL$81/*startLineNumber*/,
    "startLineStart": PL$82/*startLineStart*/,
    "lineNumber": PL$14/*lineNumber*/,
    "lineStart": PL$15/*lineStart*/,
    "start": PL$42/*start*/,
    "end": PL$13/*index*/
  };
  ;};
function PL$83/*testRegExp*/(PL$84/*pattern*/, PL$85/*flags*/){

  ;
  var PL$86/*tmp*/ = PL$84/*pattern*/;
  ;
  var PL$41/*value*/;
  ;
  if((PL$85/*flags*/["indexOf"]("u") >= 0)){
    PL$86/*tmp*/ = PL$86/*tmp*/["replace"](/\\u\{([0-9a-fA-F]+)\}/g, (function(PL$87/*$0*/, PL$88/*$1*/){
    
      ;
      if((PL$71/*parseInt*/(PL$88/*$1*/, 16) <= 1114111)){
        return "x";
      };
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["InvalidRegExp"]);
      ;}))["replace"](/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
  };
  try
  {
    PL$41/*value*/ = new PL$20/*RegExp*/(PL$86/*tmp*/);}catch(PL$89/*e*/){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["InvalidRegExp"]);};
  try
  {
    return new PL$20/*RegExp*/(PL$84/*pattern*/, PL$85/*flags*/);}catch(PL$90/*exception*/){
    return null;};
  ;};
function PL$91/*scanRegExpBody*/(){

  ;
  var PL$26/*ch*/;
  ;
  var PL$76/*str*/;
  ;
  var PL$92/*classMarker*/;
  ;
  var PL$93/*terminated*/;
  ;
  var PL$94/*body*/;
  ;
  PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/];
  PL$21/*assert*/((PL$26/*ch*/ === "/"), "Regular expression literal must start with a slash");
  PL$76/*str*/ = PL$11/*source*/[PL$13/*index*/++];
  PL$92/*classMarker*/ = false;
  PL$93/*terminated*/ = false;
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/++];
    PL$76/*str*/ += PL$26/*ch*/;
    if((PL$26/*ch*/ === "\\")){
      PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/++];
      if(PL$30/*isLineTerminator*/(PL$26/*ch*/["charCodeAt"](0))){
        PL$49/*throwError*/({
          
        }, PL$9/*Messages*/["UnterminatedRegExp"]);
      };
      PL$76/*str*/ += PL$26/*ch*/;
    }else{
    if(PL$30/*isLineTerminator*/(PL$26/*ch*/["charCodeAt"](0))){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["UnterminatedRegExp"]);
    }else{
    if(PL$92/*classMarker*/){
      if((PL$26/*ch*/ === "]")){
        PL$92/*classMarker*/ = false;
      };
    }else{
    if((PL$26/*ch*/ === "/")){
      PL$93/*terminated*/ = true;
      break;;
    }else{
    if((PL$26/*ch*/ === "[")){
      PL$92/*classMarker*/ = true;
    };
    };
    };
    };
    };}};
  if(! PL$93/*terminated*/){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["UnterminatedRegExp"]);
  };
  PL$94/*body*/ = PL$76/*str*/["substr"](1, (PL$76/*str*/["length"] - 2));
  return {
    "value": PL$94/*body*/,
    "literal": PL$76/*str*/
  };
  ;};
function PL$95/*scanRegExpFlags*/(){

  ;
  var PL$26/*ch*/;
  ;
  var PL$76/*str*/;
  ;
  var PL$85/*flags*/;
  ;
  var PL$79/*restore*/;
  ;
  PL$76/*str*/ = "";
  PL$85/*flags*/ = "";
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/];
    if(! PL$33/*isIdentifierPart*/(PL$26/*ch*/["charCodeAt"](0))){
      break;;
    };
    ++PL$13/*index*/;
    if(((PL$26/*ch*/ === "\\") && (PL$13/*index*/ < PL$16/*length*/))){
      PL$26/*ch*/ = PL$11/*source*/[PL$13/*index*/];
      if((PL$26/*ch*/ === "u")){
        ++PL$13/*index*/;
        PL$79/*restore*/ = PL$13/*index*/;
        PL$26/*ch*/ = PL$51/*scanHexEscape*/("u");
        if(PL$26/*ch*/){
          PL$85/*flags*/ += PL$26/*ch*/;
          for(PL$76/*str*/ += "\\u";(PL$79/*restore*/ < PL$13/*index*/);++PL$79/*restore*/){{
            PL$76/*str*/ += PL$11/*source*/[PL$79/*restore*/];}};
        }else{
        PL$13/*index*/ = PL$79/*restore*/;
        PL$85/*flags*/ += "u";
        PL$76/*str*/ += "\\u";
        };
        PL$96/*throwErrorTolerant*/({
          
        }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
      }else{
      PL$76/*str*/ += "\\";
      PL$96/*throwErrorTolerant*/({
        
      }, PL$9/*Messages*/["UnexpectedToken"], "ILLEGAL");
      };
    }else{
    PL$85/*flags*/ += PL$26/*ch*/;
    PL$76/*str*/ += PL$26/*ch*/;
    };}};
  return {
    "value": PL$85/*flags*/,
    "literal": PL$76/*str*/
  };
  ;};
function PL$97/*scanRegExp*/(){

  ;
  var PL$42/*start*/;
  ;
  var PL$94/*body*/;
  ;
  var PL$85/*flags*/;
  ;
  var PL$41/*value*/;
  ;
  PL$17/*lookahead*/ = null;
  PL$50/*skipComment*/();
  PL$42/*start*/ = PL$13/*index*/;
  PL$94/*body*/ = PL$91/*scanRegExpBody*/();
  PL$85/*flags*/ = PL$95/*scanRegExpFlags*/();
  PL$41/*value*/ = PL$83/*testRegExp*/(PL$94/*body*/["value"], PL$85/*flags*/["value"]);
  if(PL$19/*extra*/["tokenize"]){
    return {
      "type": PL$3/*Token*/["RegularExpression"],
      "value": PL$41/*value*/,
      "regex": {
        "pattern": PL$94/*body*/["value"],
        "flags": PL$85/*flags*/["value"]
      },
      "lineNumber": PL$14/*lineNumber*/,
      "lineStart": PL$15/*lineStart*/,
      "start": PL$42/*start*/,
      "end": PL$13/*index*/
    };
  };
  return {
    "literal": (PL$94/*body*/["literal"] + PL$85/*flags*/["literal"]),
    "value": PL$41/*value*/,
    "regex": {
      "pattern": PL$94/*body*/["value"],
      "flags": PL$85/*flags*/["value"]
    },
    "start": PL$42/*start*/,
    "end": PL$13/*index*/
  };
  ;};
function PL$98/*collectRegex*/(){

  ;
  var PL$99/*pos*/;
  ;
  var PL$44/*loc*/;
  ;
  var PL$100/*regex*/;
  ;
  var PL$101/*token*/;
  ;
  PL$50/*skipComment*/();
  PL$99/*pos*/ = PL$13/*index*/;
  PL$44/*loc*/ = {
    "start": {
      "line": PL$14/*lineNumber*/,
      "column": (PL$13/*index*/ - PL$15/*lineStart*/)
    }
  };
  PL$100/*regex*/ = PL$97/*scanRegExp*/();
  PL$44/*loc*/["end"] = {
    "line": PL$14/*lineNumber*/,
    "column": (PL$13/*index*/ - PL$15/*lineStart*/)
  };
  if(! PL$19/*extra*/["tokenize"]){
    if((PL$19/*extra*/["tokens"]["length"] > 0)){
      PL$101/*token*/ = PL$19/*extra*/["tokens"][(PL$19/*extra*/["tokens"]["length"] - 1)];
      if(((PL$101/*token*/["range"][0] === PL$99/*pos*/) && (PL$101/*token*/["type"] === "Punctuator"))){
        if(((PL$101/*token*/["value"] === "/") || (PL$101/*token*/["value"] === "/="))){
          PL$19/*extra*/["tokens"]["pop"]();
        };
      };
    };
    PL$19/*extra*/["tokens"]["push"]({
      "type": "RegularExpression",
      "value": PL$100/*regex*/["literal"],
      "regex": PL$100/*regex*/["regex"],
      "range": [
        PL$99/*pos*/, 
        PL$13/*index*/
      ],
      "loc": PL$44/*loc*/
    });
  };
  return PL$100/*regex*/;
  ;};
function PL$102/*isIdentifierName*/(PL$101/*token*/){

  ;
  return ((((PL$101/*token*/["type"] === PL$3/*Token*/["Identifier"]) || (PL$101/*token*/["type"] === PL$3/*Token*/["Keyword"])) || (PL$101/*token*/["type"] === PL$3/*Token*/["BooleanLiteral"])) || (PL$101/*token*/["type"] === PL$3/*Token*/["NullLiteral"]));
  ;};
function PL$103/*advanceSlash*/(){

  ;
  var PL$104/*prevToken*/;
  ;
  var PL$105/*checkToken*/;
  ;
  PL$104/*prevToken*/ = PL$19/*extra*/["tokens"][(PL$19/*extra*/["tokens"]["length"] - 1)];
  if(! PL$104/*prevToken*/){
    return PL$98/*collectRegex*/();
  };
  if((PL$104/*prevToken*/["type"] === "Punctuator")){
    if((PL$104/*prevToken*/["value"] === "]")){
      return PL$63/*scanPunctuator*/();
    };
    if((PL$104/*prevToken*/["value"] === ")")){
      PL$105/*checkToken*/ = PL$19/*extra*/["tokens"][(PL$19/*extra*/["openParenToken"] - 1)];
      if(((PL$105/*checkToken*/ && (PL$105/*checkToken*/["type"] === "Keyword")) && ((((PL$105/*checkToken*/["value"] === "if") || (PL$105/*checkToken*/["value"] === "while")) || (PL$105/*checkToken*/["value"] === "for")) || (PL$105/*checkToken*/["value"] === "with")))){
        return PL$98/*collectRegex*/();
      };
      return PL$63/*scanPunctuator*/();
    };
    if((PL$104/*prevToken*/["value"] === "}")){
      if((PL$19/*extra*/["tokens"][(PL$19/*extra*/["openCurlyToken"] - 3)] && (PL$19/*extra*/["tokens"][(PL$19/*extra*/["openCurlyToken"] - 3)]["type"] === "Keyword"))){
        PL$105/*checkToken*/ = PL$19/*extra*/["tokens"][(PL$19/*extra*/["openCurlyToken"] - 4)];
        if(! PL$105/*checkToken*/){
          return PL$63/*scanPunctuator*/();
        };
      }else{
      if((PL$19/*extra*/["tokens"][(PL$19/*extra*/["openCurlyToken"] - 4)] && (PL$19/*extra*/["tokens"][(PL$19/*extra*/["openCurlyToken"] - 4)]["type"] === "Keyword"))){
        PL$105/*checkToken*/ = PL$19/*extra*/["tokens"][(PL$19/*extra*/["openCurlyToken"] - 5)];
        if(! PL$105/*checkToken*/){
          return PL$98/*collectRegex*/();
        };
      }else{
      return PL$63/*scanPunctuator*/();
      };
      };
      if((PL$5/*FnExprTokens*/["indexOf"](PL$105/*checkToken*/["value"]) >= 0)){
        return PL$63/*scanPunctuator*/();
      };
      return PL$98/*collectRegex*/();
    };
    return PL$98/*collectRegex*/();
  };
  if((PL$104/*prevToken*/["type"] === "Keyword")){
    return PL$98/*collectRegex*/();
  };
  return PL$63/*scanPunctuator*/();
  ;};
function PL$106/*advance*/(){

  ;
  var PL$26/*ch*/;
  ;
  PL$50/*skipComment*/();
  if((PL$13/*index*/ >= PL$16/*length*/)){
    return {
      "type": PL$3/*Token*/["EOF"],
      "lineNumber": PL$14/*lineNumber*/,
      "lineStart": PL$15/*lineStart*/,
      "start": PL$13/*index*/,
      "end": PL$13/*index*/
    };
  };
  PL$26/*ch*/ = PL$11/*source*/["charCodeAt"](PL$13/*index*/);
  if(PL$31/*isIdentifierStart*/(PL$26/*ch*/)){
    return PL$62/*scanIdentifier*/();
  };
  if((((PL$26/*ch*/ === 40) || (PL$26/*ch*/ === 41)) || (PL$26/*ch*/ === 59))){
    return PL$63/*scanPunctuator*/();
  };
  if(((PL$26/*ch*/ === 39) || (PL$26/*ch*/ === 34))){
    return PL$75/*scanStringLiteral*/();
  };
  if((PL$26/*ch*/ === 46)){
    if(PL$25/*isDecimalDigit*/(PL$11/*source*/["charCodeAt"]((PL$13/*index*/ + 1)))){
      return PL$73/*scanNumericLiteral*/();
    };
    return PL$63/*scanPunctuator*/();
  };
  if(PL$25/*isDecimalDigit*/(PL$26/*ch*/)){
    return PL$73/*scanNumericLiteral*/();
  };
  if((PL$19/*extra*/["tokenize"] && (PL$26/*ch*/ === 47))){
    return PL$103/*advanceSlash*/();
  };
  return PL$63/*scanPunctuator*/();
  ;};
function PL$107/*collectToken*/(){

  ;
  var PL$44/*loc*/;
  ;
  var PL$101/*token*/;
  ;
  var PL$41/*value*/;
  ;
  var PL$108/*entry*/;
  ;
  PL$50/*skipComment*/();
  PL$44/*loc*/ = {
    "start": {
      "line": PL$14/*lineNumber*/,
      "column": (PL$13/*index*/ - PL$15/*lineStart*/)
    }
  };
  PL$101/*token*/ = PL$106/*advance*/();
  PL$44/*loc*/["end"] = {
    "line": PL$14/*lineNumber*/,
    "column": (PL$13/*index*/ - PL$15/*lineStart*/)
  };
  if((PL$101/*token*/["type"] !== PL$3/*Token*/["EOF"])){
    PL$41/*value*/ = PL$11/*source*/["slice"](PL$101/*token*/["start"], PL$101/*token*/["end"]);
    PL$108/*entry*/ = {
      "type": PL$4/*TokenName*/[PL$101/*token*/["type"]],
      "value": PL$41/*value*/,
      "range": [
        PL$101/*token*/["start"], 
        PL$101/*token*/["end"]
      ],
      "loc": PL$44/*loc*/
    };
    if(PL$101/*token*/["regex"]){
      PL$108/*entry*/["regex"] = {
        "pattern": PL$101/*token*/["regex"]["pattern"],
        "flags": PL$101/*token*/["regex"]["flags"]
      };
    };
    PL$19/*extra*/["tokens"]["push"](PL$108/*entry*/);
  };
  return PL$101/*token*/;
  ;};
function PL$109/*lex*/(){

  ;
  var PL$101/*token*/;
  ;
  PL$101/*token*/ = PL$17/*lookahead*/;
  PL$13/*index*/ = PL$101/*token*/["end"];
  PL$14/*lineNumber*/ = PL$101/*token*/["lineNumber"];
  PL$15/*lineStart*/ = PL$101/*token*/["lineStart"];
  PL$17/*lookahead*/ = ((typeof PL$19/*extra*/["tokens"] !== "undefined") ? PL$107/*collectToken*/() : PL$106/*advance*/());
  PL$13/*index*/ = PL$101/*token*/["end"];
  PL$14/*lineNumber*/ = PL$101/*token*/["lineNumber"];
  PL$15/*lineStart*/ = PL$101/*token*/["lineStart"];
  return PL$101/*token*/;
  ;};
function PL$110/*peek*/(){

  ;
  var PL$99/*pos*/;
  ;
  var PL$111/*line*/;
  ;
  var PL$42/*start*/;
  ;
  PL$99/*pos*/ = PL$13/*index*/;
  PL$111/*line*/ = PL$14/*lineNumber*/;
  PL$42/*start*/ = PL$15/*lineStart*/;
  PL$17/*lookahead*/ = ((typeof PL$19/*extra*/["tokens"] !== "undefined") ? PL$107/*collectToken*/() : PL$106/*advance*/());
  PL$13/*index*/ = PL$99/*pos*/;
  PL$14/*lineNumber*/ = PL$111/*line*/;
  PL$15/*lineStart*/ = PL$42/*start*/;
  ;};
function PL$112/*Position*/(){

  ;
  this["line"] = PL$14/*lineNumber*/;
  this["column"] = (PL$13/*index*/ - PL$15/*lineStart*/);
  ;};
function PL$113/*SourceLocation*/(){

  ;
  this["start"] = new PL$112/*Position*/();
  this["end"] = null;
  ;};
function PL$114/*WrappingSourceLocation*/(PL$115/*startToken*/){

  ;
  if((PL$115/*startToken*/["type"] === PL$3/*Token*/["StringLiteral"])){
    this["start"] = {
      "line": PL$115/*startToken*/["startLineNumber"],
      "column": (PL$115/*startToken*/["start"] - PL$115/*startToken*/["startLineStart"])
    };
  }else{
  this["start"] = {
    "line": PL$115/*startToken*/["lineNumber"],
    "column": (PL$115/*startToken*/["start"] - PL$115/*startToken*/["lineStart"])
  };
  };
  this["end"] = null;
  ;};
function PL$116/*Node*/(){

  ;
  PL$13/*index*/ = PL$17/*lookahead*/["start"];
  if((PL$17/*lookahead*/["type"] === PL$3/*Token*/["StringLiteral"])){
    PL$14/*lineNumber*/ = PL$17/*lookahead*/["startLineNumber"];
    PL$15/*lineStart*/ = PL$17/*lookahead*/["startLineStart"];
  }else{
  PL$14/*lineNumber*/ = PL$17/*lookahead*/["lineNumber"];
  PL$15/*lineStart*/ = PL$17/*lookahead*/["lineStart"];
  };
  if(PL$19/*extra*/["range"]){
    this["range"] = [
      PL$13/*index*/, 
      0
    ];
  };
  if(PL$19/*extra*/["loc"]){
    this["loc"] = new PL$113/*SourceLocation*/();
  };
  ;};
function PL$117/*WrappingNode*/(PL$115/*startToken*/){

  ;
  if(PL$19/*extra*/["range"]){
    this["range"] = [
      PL$115/*startToken*/["start"], 
      0
    ];
  };
  if(PL$19/*extra*/["loc"]){
    this["loc"] = new PL$114/*WrappingSourceLocation*/(PL$115/*startToken*/);
  };
  ;};
function PL$154/*peekLineTerminator*/(){

  ;
  var PL$99/*pos*/;
  ;
  var PL$111/*line*/;
  ;
  var PL$42/*start*/;
  ;
  var PL$155/*found*/;
  ;
  PL$99/*pos*/ = PL$13/*index*/;
  PL$111/*line*/ = PL$14/*lineNumber*/;
  PL$42/*start*/ = PL$15/*lineStart*/;
  PL$50/*skipComment*/();
  PL$155/*found*/ = (PL$14/*lineNumber*/ !== PL$111/*line*/);
  PL$13/*index*/ = PL$99/*pos*/;
  PL$14/*lineNumber*/ = PL$111/*line*/;
  PL$15/*lineStart*/ = PL$42/*start*/;
  return PL$155/*found*/;
  ;};
function PL$49/*throwError*/(PL$101/*token*/, PL$156/*messageFormat*/){
var PL$159/*arguments*/ = arguments;

  ;
  var PL$157/*error*/;
  ;
  var PL$131/*args*/ = PL$158/*Array*/["prototype"]["slice"]["call"](PL$159/*arguments*/, 2);
  ;
  var PL$160/*msg*/ = PL$156/*messageFormat*/["replace"](/%(\d)/g, (function(PL$161/*whole*/, PL$13/*index*/){
  
    ;
    PL$21/*assert*/((PL$13/*index*/ < PL$131/*args*/["length"]), "Message reference must be in range");
    return PL$131/*args*/[PL$13/*index*/];
    ;}));
  ;
  if((typeof PL$101/*token*/["lineNumber"] === "number")){
    PL$157/*error*/ = new PL$24/*Error*/(((("Line " + PL$101/*token*/["lineNumber"]) + ": ") + PL$160/*msg*/));
    PL$157/*error*/["index"] = PL$101/*token*/["start"];
    PL$157/*error*/["lineNumber"] = PL$101/*token*/["lineNumber"];
    PL$157/*error*/["column"] = ((PL$101/*token*/["start"] - PL$15/*lineStart*/) + 1);
  }else{
  PL$157/*error*/ = new PL$24/*Error*/(((("Line " + PL$14/*lineNumber*/) + ": ") + PL$160/*msg*/));
  PL$157/*error*/["index"] = PL$13/*index*/;
  PL$157/*error*/["lineNumber"] = PL$14/*lineNumber*/;
  PL$157/*error*/["column"] = ((PL$13/*index*/ - PL$15/*lineStart*/) + 1);
  };
  PL$157/*error*/["description"] = PL$160/*msg*/;
  throw PL$157/*error*/;
  ;};
function PL$96/*throwErrorTolerant*/(){
var PL$159/*arguments*/ = arguments;

  ;
  try
  {
    PL$49/*throwError*/["apply"](null, PL$159/*arguments*/);}catch(PL$89/*e*/){
    if(PL$19/*extra*/["errors"]){
      PL$19/*extra*/["errors"]["push"](PL$89/*e*/);
    }else{
    throw PL$89/*e*/;
    };};
  ;};
function PL$162/*throwUnexpected*/(PL$101/*token*/){

  ;
  if((PL$101/*token*/["type"] === PL$3/*Token*/["EOF"])){
    PL$49/*throwError*/(PL$101/*token*/, PL$9/*Messages*/["UnexpectedEOS"]);
  };
  if((PL$101/*token*/["type"] === PL$3/*Token*/["NumericLiteral"])){
    PL$49/*throwError*/(PL$101/*token*/, PL$9/*Messages*/["UnexpectedNumber"]);
  };
  if((PL$101/*token*/["type"] === PL$3/*Token*/["StringLiteral"])){
    PL$49/*throwError*/(PL$101/*token*/, PL$9/*Messages*/["UnexpectedString"]);
  };
  if((PL$101/*token*/["type"] === PL$3/*Token*/["Identifier"])){
    PL$49/*throwError*/(PL$101/*token*/, PL$9/*Messages*/["UnexpectedIdentifier"]);
  };
  if((PL$101/*token*/["type"] === PL$3/*Token*/["Keyword"])){
    if(PL$34/*isFutureReservedWord*/(PL$101/*token*/["value"])){
      PL$49/*throwError*/(PL$101/*token*/, PL$9/*Messages*/["UnexpectedReserved"]);
    }else{
    if((PL$12/*strict*/ && PL$36/*isStrictModeReservedWord*/(PL$101/*token*/["value"]))){
      PL$96/*throwErrorTolerant*/(PL$101/*token*/, PL$9/*Messages*/["StrictReservedWord"]);
      return;
    };
    };
    PL$49/*throwError*/(PL$101/*token*/, PL$9/*Messages*/["UnexpectedToken"], PL$101/*token*/["value"]);
  };
  PL$49/*throwError*/(PL$101/*token*/, PL$9/*Messages*/["UnexpectedToken"], PL$101/*token*/["value"]);
  ;};
function PL$163/*expect*/(PL$41/*value*/){

  ;
  var PL$101/*token*/ = PL$109/*lex*/();
  ;
  if(((PL$101/*token*/["type"] !== PL$3/*Token*/["Punctuator"]) || (PL$101/*token*/["value"] !== PL$41/*value*/))){
    PL$162/*throwUnexpected*/(PL$101/*token*/);
  };
  ;};
function PL$164/*expectTolerant*/(PL$41/*value*/){

  ;
  if(PL$19/*extra*/["errors"]){
    var PL$101/*token*/ = PL$17/*lookahead*/;
    ;
    if(((PL$101/*token*/["type"] !== PL$3/*Token*/["Punctuator"]) && (PL$101/*token*/["value"] !== PL$41/*value*/))){
      PL$96/*throwErrorTolerant*/(PL$101/*token*/, PL$9/*Messages*/["UnexpectedToken"], PL$101/*token*/["value"]);
    }else{
    PL$109/*lex*/();
    };
  }else{
  PL$163/*expect*/(PL$41/*value*/);
  };
  ;};
function PL$165/*expectKeyword*/(PL$166/*keyword*/){

  ;
  var PL$101/*token*/ = PL$109/*lex*/();
  ;
  if(((PL$101/*token*/["type"] !== PL$3/*Token*/["Keyword"]) || (PL$101/*token*/["value"] !== PL$166/*keyword*/))){
    PL$162/*throwUnexpected*/(PL$101/*token*/);
  };
  ;};
function PL$167/*match*/(PL$41/*value*/){

  ;
  return ((PL$17/*lookahead*/["type"] === PL$3/*Token*/["Punctuator"]) && (PL$17/*lookahead*/["value"] === PL$41/*value*/));
  ;};
function PL$168/*matchKeyword*/(PL$166/*keyword*/){

  ;
  return ((PL$17/*lookahead*/["type"] === PL$3/*Token*/["Keyword"]) && (PL$17/*lookahead*/["value"] === PL$166/*keyword*/));
  ;};
function PL$169/*matchAssign*/(){

  ;
  var PL$170/*op*/;
  ;
  if((PL$17/*lookahead*/["type"] !== PL$3/*Token*/["Punctuator"])){
    return false;
  };
  PL$170/*op*/ = PL$17/*lookahead*/["value"];
  return ((((((((((((PL$170/*op*/ === "=") || (PL$170/*op*/ === "*=")) || (PL$170/*op*/ === "/=")) || (PL$170/*op*/ === "%=")) || (PL$170/*op*/ === "+=")) || (PL$170/*op*/ === "-=")) || (PL$170/*op*/ === "<<=")) || (PL$170/*op*/ === ">>=")) || (PL$170/*op*/ === ">>>=")) || (PL$170/*op*/ === "&=")) || (PL$170/*op*/ === "^=")) || (PL$170/*op*/ === "|="));
  ;};
function PL$171/*consumeSemicolon*/(){

  ;
  var PL$111/*line*/;
  ;
  if(((PL$11/*source*/["charCodeAt"](PL$13/*index*/) === 59) || PL$167/*match*/(";"))){
    PL$109/*lex*/();
    return;
  };
  PL$111/*line*/ = PL$14/*lineNumber*/;
  PL$50/*skipComment*/();
  if((PL$14/*lineNumber*/ !== PL$111/*line*/)){
    return;
  };
  if(((PL$17/*lookahead*/["type"] !== PL$3/*Token*/["EOF"]) && ! PL$167/*match*/("}"))){
    PL$162/*throwUnexpected*/(PL$17/*lookahead*/);
  };
  ;};
function PL$172/*isLeftHandSide*/(PL$173/*expr*/){

  ;
  return ((PL$173/*expr*/["type"] === PL$6/*Syntax*/["Identifier"]) || (PL$173/*expr*/["type"] === PL$6/*Syntax*/["MemberExpression"]));
  ;};
function PL$174/*parseArrayInitialiser*/(){

  ;
  var PL$122/*elements*/ = [
    
  ];
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$163/*expect*/("[");
  while(! PL$167/*match*/("]")){
  {
    if(PL$167/*match*/(",")){
      PL$109/*lex*/();
      PL$122/*elements*/["push"](null);
    }else{
    PL$122/*elements*/["push"](PL$176/*parseAssignmentExpression*/());
    if(! PL$167/*match*/("]")){
      PL$163/*expect*/(",");
    };
    };}};
  PL$109/*lex*/();
  return PL$175/*node*/["finishArrayExpression"](PL$122/*elements*/);
  ;};
function PL$177/*parsePropertyFunction*/(PL$132/*param*/, PL$178/*first*/){

  ;
  var PL$179/*previousStrict*/;
  ;
  var PL$94/*body*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$179/*previousStrict*/ = PL$12/*strict*/;
  PL$94/*body*/ = PL$180/*parseFunctionSourceElements*/();
  if(((PL$178/*first*/ && PL$12/*strict*/) && PL$37/*isRestrictedWord*/(PL$132/*param*/[0]["name"]))){
    PL$96/*throwErrorTolerant*/(PL$178/*first*/, PL$9/*Messages*/["StrictParamName"]);
  };
  PL$12/*strict*/ = PL$179/*previousStrict*/;
  return PL$175/*node*/["finishFunctionExpression"](null, PL$132/*param*/, [
    
  ], PL$94/*body*/);
  ;};
function PL$181/*parseObjectPropertyKey*/(){

  ;
  var PL$101/*token*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$101/*token*/ = PL$109/*lex*/();
  if(((PL$101/*token*/["type"] === PL$3/*Token*/["StringLiteral"]) || (PL$101/*token*/["type"] === PL$3/*Token*/["NumericLiteral"]))){
    if((PL$12/*strict*/ && PL$101/*token*/["octal"])){
      PL$96/*throwErrorTolerant*/(PL$101/*token*/, PL$9/*Messages*/["StrictOctalLiteral"]);
    };
    return PL$175/*node*/["finishLiteral"](PL$101/*token*/);
  };
  return PL$175/*node*/["finishIdentifier"](PL$101/*token*/["value"]);
  ;};
function PL$182/*parseObjectProperty*/(){

  ;
  var PL$101/*token*/;
  ;
  var PL$145/*key*/;
  ;
  var PL$35/*id*/;
  ;
  var PL$41/*value*/;
  ;
  var PL$132/*param*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$101/*token*/ = PL$17/*lookahead*/;
  if((PL$101/*token*/["type"] === PL$3/*Token*/["Identifier"])){
    PL$35/*id*/ = PL$181/*parseObjectPropertyKey*/();
    if(((PL$101/*token*/["value"] === "get") && ! PL$167/*match*/(":"))){
      PL$145/*key*/ = PL$181/*parseObjectPropertyKey*/();
      PL$163/*expect*/("(");
      PL$163/*expect*/(")");
      PL$41/*value*/ = PL$177/*parsePropertyFunction*/([
        
      ]);
      return PL$175/*node*/["finishProperty"]("get", PL$145/*key*/, PL$41/*value*/);
    };
    if(((PL$101/*token*/["value"] === "set") && ! PL$167/*match*/(":"))){
      PL$145/*key*/ = PL$181/*parseObjectPropertyKey*/();
      PL$163/*expect*/("(");
      PL$101/*token*/ = PL$17/*lookahead*/;
      if((PL$101/*token*/["type"] !== PL$3/*Token*/["Identifier"])){
        PL$163/*expect*/(")");
        PL$96/*throwErrorTolerant*/(PL$101/*token*/, PL$9/*Messages*/["UnexpectedToken"], PL$101/*token*/["value"]);
        PL$41/*value*/ = PL$177/*parsePropertyFunction*/([
          
        ]);
      }else{
      PL$132/*param*/ = [
        PL$183/*parseVariableIdentifier*/()
      ];
      PL$163/*expect*/(")");
      PL$41/*value*/ = PL$177/*parsePropertyFunction*/(PL$132/*param*/, PL$101/*token*/);
      };
      return PL$175/*node*/["finishProperty"]("set", PL$145/*key*/, PL$41/*value*/);
    };
    PL$163/*expect*/(":");
    PL$41/*value*/ = PL$176/*parseAssignmentExpression*/();
    return PL$175/*node*/["finishProperty"]("init", PL$35/*id*/, PL$41/*value*/);
  };
  if(((PL$101/*token*/["type"] === PL$3/*Token*/["EOF"]) || (PL$101/*token*/["type"] === PL$3/*Token*/["Punctuator"]))){
    PL$162/*throwUnexpected*/(PL$101/*token*/);
  }else{
  PL$145/*key*/ = PL$181/*parseObjectPropertyKey*/();
  PL$163/*expect*/(":");
  PL$41/*value*/ = PL$176/*parseAssignmentExpression*/();
  return PL$175/*node*/["finishProperty"]("init", PL$145/*key*/, PL$41/*value*/);
  };
  ;};
function PL$184/*parseObjectInitialiser*/(){

  ;
  var PL$142/*properties*/ = [
    
  ];
  ;
  var PL$101/*token*/;
  ;
  var PL$141/*property*/;
  ;
  var PL$138/*name*/;
  ;
  var PL$145/*key*/;
  ;
  var PL$144/*kind*/;
  ;
  var PL$185/*map*/ = {
    
  };
  ;
  var PL$186/*toString*/ = PL$32/*String*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$163/*expect*/("{");
  while(! PL$167/*match*/("}")){
  {
    PL$141/*property*/ = PL$182/*parseObjectProperty*/();
    if((PL$141/*property*/["key"]["type"] === PL$6/*Syntax*/["Identifier"])){
      PL$138/*name*/ = PL$141/*property*/["key"]["name"];
    }else{
    PL$138/*name*/ = PL$186/*toString*/(PL$141/*property*/["key"]["value"]);
    };
    PL$144/*kind*/ = ((PL$141/*property*/["kind"] === "init") ? PL$8/*PropertyKind*/["Data"] : ((PL$141/*property*/["kind"] === "get") ? PL$8/*PropertyKind*/["Get"] : PL$8/*PropertyKind*/["Set"]));
    PL$145/*key*/ = ("$" + PL$138/*name*/);
    if(PL$187/*Object*/["prototype"]["hasOwnProperty"]["call"](PL$185/*map*/, PL$145/*key*/)){
      if((PL$185/*map*/[PL$145/*key*/] === PL$8/*PropertyKind*/["Data"])){
        if((PL$12/*strict*/ && (PL$144/*kind*/ === PL$8/*PropertyKind*/["Data"]))){
          PL$96/*throwErrorTolerant*/({
            
          }, PL$9/*Messages*/["StrictDuplicateProperty"]);
        }else{
        if((PL$144/*kind*/ !== PL$8/*PropertyKind*/["Data"])){
          PL$96/*throwErrorTolerant*/({
            
          }, PL$9/*Messages*/["AccessorDataProperty"]);
        };
        };
      }else{
      if((PL$144/*kind*/ === PL$8/*PropertyKind*/["Data"])){
        PL$96/*throwErrorTolerant*/({
          
        }, PL$9/*Messages*/["AccessorDataProperty"]);
      }else{
      if((PL$185/*map*/[PL$145/*key*/] & PL$144/*kind*/)){
        PL$96/*throwErrorTolerant*/({
          
        }, PL$9/*Messages*/["AccessorGetSet"]);
      };
      };
      };
      PL$185/*map*/[PL$145/*key*/] |= PL$144/*kind*/;
    }else{
    PL$185/*map*/[PL$145/*key*/] = PL$144/*kind*/;
    };
    PL$142/*properties*/["push"](PL$141/*property*/);
    if(! PL$167/*match*/("}")){
      PL$164/*expectTolerant*/(",");
    };}};
  PL$163/*expect*/("}");
  return PL$175/*node*/["finishObjectExpression"](PL$142/*properties*/);
  ;};
function PL$188/*parseGroupExpression*/(){

  ;
  var PL$173/*expr*/;
  ;
  PL$163/*expect*/("(");
  if(PL$167/*match*/(")")){
    PL$109/*lex*/();
    return PL$7/*PlaceHolders*/["ArrowParameterPlaceHolder"];
  };
  ++PL$18/*state*/["parenthesisCount"];
  PL$173/*expr*/ = PL$189/*parseExpression*/();
  PL$163/*expect*/(")");
  return PL$173/*expr*/;
  ;};
function PL$190/*parsePrimaryExpression*/(){

  ;
  var PL$40/*type*/;
  ;
  var PL$101/*token*/;
  ;
  var PL$173/*expr*/;
  ;
  var PL$175/*node*/;
  ;
  if(PL$167/*match*/("(")){
    return PL$188/*parseGroupExpression*/();
  };
  if(PL$167/*match*/("[")){
    return PL$174/*parseArrayInitialiser*/();
  };
  if(PL$167/*match*/("{")){
    return PL$184/*parseObjectInitialiser*/();
  };
  PL$40/*type*/ = PL$17/*lookahead*/["type"];
  PL$175/*node*/ = new PL$116/*Node*/();
  if((PL$40/*type*/ === PL$3/*Token*/["Identifier"])){
    PL$173/*expr*/ = PL$175/*node*/["finishIdentifier"](PL$109/*lex*/()["value"]);
  }else{
  if(((PL$40/*type*/ === PL$3/*Token*/["StringLiteral"]) || (PL$40/*type*/ === PL$3/*Token*/["NumericLiteral"]))){
    if((PL$12/*strict*/ && PL$17/*lookahead*/["octal"])){
      PL$96/*throwErrorTolerant*/(PL$17/*lookahead*/, PL$9/*Messages*/["StrictOctalLiteral"]);
    };
    PL$173/*expr*/ = PL$175/*node*/["finishLiteral"](PL$109/*lex*/());
  }else{
  if((PL$40/*type*/ === PL$3/*Token*/["Keyword"])){
    if(PL$168/*matchKeyword*/("function")){
      return PL$191/*parseFunctionExpression*/();
    };
    if(PL$168/*matchKeyword*/("this")){
      PL$109/*lex*/();
      PL$173/*expr*/ = PL$175/*node*/["finishThisExpression"]();
    }else{
    PL$162/*throwUnexpected*/(PL$109/*lex*/());
    };
  }else{
  if((PL$40/*type*/ === PL$3/*Token*/["BooleanLiteral"])){
    PL$101/*token*/ = PL$109/*lex*/();
    PL$101/*token*/["value"] = (PL$101/*token*/["value"] === "true");
    PL$173/*expr*/ = PL$175/*node*/["finishLiteral"](PL$101/*token*/);
  }else{
  if((PL$40/*type*/ === PL$3/*Token*/["NullLiteral"])){
    PL$101/*token*/ = PL$109/*lex*/();
    PL$101/*token*/["value"] = null;
    PL$173/*expr*/ = PL$175/*node*/["finishLiteral"](PL$101/*token*/);
  }else{
  if((PL$167/*match*/("/") || PL$167/*match*/("/="))){
    if((typeof PL$19/*extra*/["tokens"] !== "undefined")){
      PL$173/*expr*/ = PL$175/*node*/["finishLiteral"](PL$98/*collectRegex*/());
    }else{
    PL$173/*expr*/ = PL$175/*node*/["finishLiteral"](PL$97/*scanRegExp*/());
    };
    PL$110/*peek*/();
  }else{
  PL$162/*throwUnexpected*/(PL$109/*lex*/());
  };
  };
  };
  };
  };
  };
  return PL$173/*expr*/;
  ;};
function PL$192/*parseArguments*/(){

  ;
  var PL$131/*args*/ = [
    
  ];
  ;
  PL$163/*expect*/("(");
  if(! PL$167/*match*/(")")){
    while((PL$13/*index*/ < PL$16/*length*/)){
    {
      PL$131/*args*/["push"](PL$176/*parseAssignmentExpression*/());
      if(PL$167/*match*/(")")){
        break;;
      };
      PL$164/*expectTolerant*/(",");}};
  };
  PL$163/*expect*/(")");
  return PL$131/*args*/;
  ;};
function PL$193/*parseNonComputedProperty*/(){

  ;
  var PL$101/*token*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$101/*token*/ = PL$109/*lex*/();
  if(! PL$102/*isIdentifierName*/(PL$101/*token*/)){
    PL$162/*throwUnexpected*/(PL$101/*token*/);
  };
  return PL$175/*node*/["finishIdentifier"](PL$101/*token*/["value"]);
  ;};
function PL$194/*parseNonComputedMember*/(){

  ;
  PL$163/*expect*/(".");
  return PL$193/*parseNonComputedProperty*/();
  ;};
function PL$195/*parseComputedMember*/(){

  ;
  var PL$173/*expr*/;
  ;
  PL$163/*expect*/("[");
  PL$173/*expr*/ = PL$189/*parseExpression*/();
  PL$163/*expect*/("]");
  return PL$173/*expr*/;
  ;};
function PL$196/*parseNewExpression*/(){

  ;
  var PL$130/*callee*/;
  ;
  var PL$131/*args*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$165/*expectKeyword*/("new");
  PL$130/*callee*/ = PL$197/*parseLeftHandSideExpression*/();
  PL$131/*args*/ = (PL$167/*match*/("(") ? PL$192/*parseArguments*/() : [
    
  ]);
  return PL$175/*node*/["finishNewExpression"](PL$130/*callee*/, PL$131/*args*/);
  ;};
function PL$198/*parseLeftHandSideExpressionAllowCall*/(){

  ;
  var PL$173/*expr*/;
  ;
  var PL$131/*args*/;
  ;
  var PL$141/*property*/;
  ;
  var PL$115/*startToken*/;
  ;
  var PL$199/*previousAllowIn*/ = PL$18/*state*/["allowIn"];
  ;
  PL$115/*startToken*/ = PL$17/*lookahead*/;
  PL$18/*state*/["allowIn"] = true;
  PL$173/*expr*/ = (PL$168/*matchKeyword*/("new") ? PL$196/*parseNewExpression*/() : PL$190/*parsePrimaryExpression*/());
  for(;;){{
    if(PL$167/*match*/(".")){
      PL$141/*property*/ = PL$194/*parseNonComputedMember*/();
      PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishMemberExpression"](".", PL$173/*expr*/, PL$141/*property*/);
    }else{
    if(PL$167/*match*/("(")){
      PL$131/*args*/ = PL$192/*parseArguments*/();
      PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishCallExpression"](PL$173/*expr*/, PL$131/*args*/);
    }else{
    if(PL$167/*match*/("[")){
      PL$141/*property*/ = PL$195/*parseComputedMember*/();
      PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishMemberExpression"]("[", PL$173/*expr*/, PL$141/*property*/);
    }else{
    break;;
    };
    };
    };}};
  PL$18/*state*/["allowIn"] = PL$199/*previousAllowIn*/;
  return PL$173/*expr*/;
  ;};
function PL$197/*parseLeftHandSideExpression*/(){

  ;
  var PL$173/*expr*/;
  ;
  var PL$141/*property*/;
  ;
  var PL$115/*startToken*/;
  ;
  PL$21/*assert*/(PL$18/*state*/["allowIn"], "callee of new expression always allow in keyword.");
  PL$115/*startToken*/ = PL$17/*lookahead*/;
  PL$173/*expr*/ = (PL$168/*matchKeyword*/("new") ? PL$196/*parseNewExpression*/() : PL$190/*parsePrimaryExpression*/());
  for(;;){{
    if(PL$167/*match*/("[")){
      PL$141/*property*/ = PL$195/*parseComputedMember*/();
      PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishMemberExpression"]("[", PL$173/*expr*/, PL$141/*property*/);
    }else{
    if(PL$167/*match*/(".")){
      PL$141/*property*/ = PL$194/*parseNonComputedMember*/();
      PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishMemberExpression"](".", PL$173/*expr*/, PL$141/*property*/);
    }else{
    break;;
    };
    };}};
  return PL$173/*expr*/;
  ;};
function PL$200/*parsePostfixExpression*/(){

  ;
  var PL$173/*expr*/;
  ;
  var PL$101/*token*/;
  ;
  var PL$115/*startToken*/ = PL$17/*lookahead*/;
  ;
  PL$173/*expr*/ = PL$198/*parseLeftHandSideExpressionAllowCall*/();
  if((PL$17/*lookahead*/["type"] === PL$3/*Token*/["Punctuator"])){
    if(((PL$167/*match*/("++") || PL$167/*match*/("--")) && ! PL$154/*peekLineTerminator*/())){
      if(((PL$12/*strict*/ && (PL$173/*expr*/["type"] === PL$6/*Syntax*/["Identifier"])) && PL$37/*isRestrictedWord*/(PL$173/*expr*/["name"]))){
        PL$96/*throwErrorTolerant*/({
          
        }, PL$9/*Messages*/["StrictLHSPostfix"]);
      };
      if(! PL$172/*isLeftHandSide*/(PL$173/*expr*/)){
        PL$96/*throwErrorTolerant*/({
          
        }, PL$9/*Messages*/["InvalidLHSInAssignment"]);
      };
      PL$101/*token*/ = PL$109/*lex*/();
      PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishPostfixExpression"](PL$101/*token*/["value"], PL$173/*expr*/);
    };
  };
  return PL$173/*expr*/;
  ;};
function PL$201/*parseUnaryExpression*/(){

  ;
  var PL$101/*token*/;
  ;
  var PL$173/*expr*/;
  ;
  var PL$115/*startToken*/;
  ;
  if(((PL$17/*lookahead*/["type"] !== PL$3/*Token*/["Punctuator"]) && (PL$17/*lookahead*/["type"] !== PL$3/*Token*/["Keyword"]))){
    PL$173/*expr*/ = PL$200/*parsePostfixExpression*/();
  }else{
  if((PL$167/*match*/("++") || PL$167/*match*/("--"))){
    PL$115/*startToken*/ = PL$17/*lookahead*/;
    PL$101/*token*/ = PL$109/*lex*/();
    PL$173/*expr*/ = PL$201/*parseUnaryExpression*/();
    if(((PL$12/*strict*/ && (PL$173/*expr*/["type"] === PL$6/*Syntax*/["Identifier"])) && PL$37/*isRestrictedWord*/(PL$173/*expr*/["name"]))){
      PL$96/*throwErrorTolerant*/({
        
      }, PL$9/*Messages*/["StrictLHSPrefix"]);
    };
    if(! PL$172/*isLeftHandSide*/(PL$173/*expr*/)){
      PL$96/*throwErrorTolerant*/({
        
      }, PL$9/*Messages*/["InvalidLHSInAssignment"]);
    };
    PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishUnaryExpression"](PL$101/*token*/["value"], PL$173/*expr*/);
  }else{
  if((((PL$167/*match*/("+") || PL$167/*match*/("-")) || PL$167/*match*/("~")) || PL$167/*match*/("!"))){
    PL$115/*startToken*/ = PL$17/*lookahead*/;
    PL$101/*token*/ = PL$109/*lex*/();
    PL$173/*expr*/ = PL$201/*parseUnaryExpression*/();
    PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishUnaryExpression"](PL$101/*token*/["value"], PL$173/*expr*/);
  }else{
  if(((PL$168/*matchKeyword*/("delete") || PL$168/*matchKeyword*/("void")) || PL$168/*matchKeyword*/("typeof"))){
    PL$115/*startToken*/ = PL$17/*lookahead*/;
    PL$101/*token*/ = PL$109/*lex*/();
    PL$173/*expr*/ = PL$201/*parseUnaryExpression*/();
    PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishUnaryExpression"](PL$101/*token*/["value"], PL$173/*expr*/);
    if(((PL$12/*strict*/ && (PL$173/*expr*/["operator"] === "delete")) && (PL$173/*expr*/["argument"]["type"] === PL$6/*Syntax*/["Identifier"]))){
      PL$96/*throwErrorTolerant*/({
        
      }, PL$9/*Messages*/["StrictDelete"]);
    };
  }else{
  PL$173/*expr*/ = PL$200/*parsePostfixExpression*/();
  };
  };
  };
  };
  return PL$173/*expr*/;
  ;};
function PL$202/*binaryPrecedence*/(PL$101/*token*/, PL$203/*allowIn*/){

  ;
  var PL$204/*prec*/ = 0;
  ;
  if(((PL$101/*token*/["type"] !== PL$3/*Token*/["Punctuator"]) && (PL$101/*token*/["type"] !== PL$3/*Token*/["Keyword"]))){
    return 0;
  };
  switch (PL$101/*token*/["value"]){
    case "||":
      
      PL$204/*prec*/ = 1;
      break;;
    case "&&":
      
      PL$204/*prec*/ = 2;
      break;;
    case "|":
      
      PL$204/*prec*/ = 3;
      break;;
    case "^":
      
      PL$204/*prec*/ = 4;
      break;;
    case "&":
      
      PL$204/*prec*/ = 5;
      break;;
    case "==":
      
    case "!=":
      
    case "===":
      
    case "!==":
      
      PL$204/*prec*/ = 6;
      break;;
    case "<":
      
    case ">":
      
    case "<=":
      
    case ">=":
      
    case "instanceof":
      
      PL$204/*prec*/ = 7;
      break;;
    case "in":
      
      PL$204/*prec*/ = (PL$203/*allowIn*/ ? 7 : 0);
      break;;
    case "<<":
      
    case ">>":
      
    case ">>>":
      
      PL$204/*prec*/ = 8;
      break;;
    case "+":
      
    case "-":
      
      PL$204/*prec*/ = 9;
      break;;
    case "*":
      
    case "/":
      
    case "%":
      
      PL$204/*prec*/ = 11;
      break;;
    default:
      
      break;;
    
  };
  return PL$204/*prec*/;
  ;};
function PL$205/*parseBinaryExpression*/(){

  ;
  var PL$206/*marker*/;
  ;
  var PL$207/*markers*/;
  ;
  var PL$173/*expr*/;
  ;
  var PL$101/*token*/;
  ;
  var PL$204/*prec*/;
  ;
  var PL$208/*stack*/;
  ;
  var PL$128/*right*/;
  ;
  var PL$126/*operator*/;
  ;
  var PL$127/*left*/;
  ;
  var PL$53/*i*/;
  ;
  PL$206/*marker*/ = PL$17/*lookahead*/;
  PL$127/*left*/ = PL$201/*parseUnaryExpression*/();
  if((PL$127/*left*/ === PL$7/*PlaceHolders*/["ArrowParameterPlaceHolder"])){
    return PL$127/*left*/;
  };
  PL$101/*token*/ = PL$17/*lookahead*/;
  PL$204/*prec*/ = PL$202/*binaryPrecedence*/(PL$101/*token*/, PL$18/*state*/["allowIn"]);
  if((PL$204/*prec*/ === 0)){
    return PL$127/*left*/;
  };
  PL$101/*token*/["prec"] = PL$204/*prec*/;
  PL$109/*lex*/();
  PL$207/*markers*/ = [
    PL$206/*marker*/, 
    PL$17/*lookahead*/
  ];
  PL$128/*right*/ = PL$201/*parseUnaryExpression*/();
  PL$208/*stack*/ = [
    PL$127/*left*/, 
    PL$101/*token*/, 
    PL$128/*right*/
  ];
  while((PL$204/*prec*/ = PL$202/*binaryPrecedence*/(PL$17/*lookahead*/, PL$18/*state*/["allowIn"]) > 0)){
  {
    while(((PL$208/*stack*/["length"] > 2) && (PL$204/*prec*/ <= PL$208/*stack*/[(PL$208/*stack*/["length"] - 2)]["prec"]))){
    {
      PL$128/*right*/ = PL$208/*stack*/["pop"]();
      PL$126/*operator*/ = PL$208/*stack*/["pop"]()["value"];
      PL$127/*left*/ = PL$208/*stack*/["pop"]();
      PL$207/*markers*/["pop"]();
      PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$207/*markers*/[(PL$207/*markers*/["length"] - 1)])["finishBinaryExpression"](PL$126/*operator*/, PL$127/*left*/, PL$128/*right*/);
      PL$208/*stack*/["push"](PL$173/*expr*/);}};
    PL$101/*token*/ = PL$109/*lex*/();
    PL$101/*token*/["prec"] = PL$204/*prec*/;
    PL$208/*stack*/["push"](PL$101/*token*/);
    PL$207/*markers*/["push"](PL$17/*lookahead*/);
    PL$173/*expr*/ = PL$201/*parseUnaryExpression*/();
    PL$208/*stack*/["push"](PL$173/*expr*/);}};
  PL$53/*i*/ = (PL$208/*stack*/["length"] - 1);
  PL$173/*expr*/ = PL$208/*stack*/[PL$53/*i*/];
  PL$207/*markers*/["pop"]();
  while((PL$53/*i*/ > 1)){
  {
    PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$207/*markers*/["pop"]())["finishBinaryExpression"](PL$208/*stack*/[(PL$53/*i*/ - 1)]["value"], PL$208/*stack*/[(PL$53/*i*/ - 2)], PL$173/*expr*/);
    PL$53/*i*/ -= 2;}};
  return PL$173/*expr*/;
  ;};
function PL$209/*parseConditionalExpression*/(){

  ;
  var PL$173/*expr*/;
  ;
  var PL$199/*previousAllowIn*/;
  ;
  var PL$134/*consequent*/;
  ;
  var PL$135/*alternate*/;
  ;
  var PL$115/*startToken*/;
  ;
  PL$115/*startToken*/ = PL$17/*lookahead*/;
  PL$173/*expr*/ = PL$205/*parseBinaryExpression*/();
  if((PL$173/*expr*/ === PL$7/*PlaceHolders*/["ArrowParameterPlaceHolder"])){
    return PL$173/*expr*/;
  };
  if(PL$167/*match*/("?")){
    PL$109/*lex*/();
    PL$199/*previousAllowIn*/ = PL$18/*state*/["allowIn"];
    PL$18/*state*/["allowIn"] = true;
    PL$134/*consequent*/ = PL$176/*parseAssignmentExpression*/();
    PL$18/*state*/["allowIn"] = PL$199/*previousAllowIn*/;
    PL$163/*expect*/(":");
    PL$135/*alternate*/ = PL$176/*parseAssignmentExpression*/();
    PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishConditionalExpression"](PL$173/*expr*/, PL$134/*consequent*/, PL$135/*alternate*/);
  };
  return PL$173/*expr*/;
  ;};
function PL$210/*parseConciseBody*/(){

  ;
  if(PL$167/*match*/("{")){
    return PL$180/*parseFunctionSourceElements*/();
  };
  return PL$176/*parseAssignmentExpression*/();
  ;};
function PL$211/*reinterpretAsCoverFormalsList*/(PL$146/*expressions*/){

  ;
  var PL$53/*i*/;
  ;
  var PL$54/*len*/;
  ;
  var PL$132/*param*/;
  ;
  var PL$123/*params*/;
  ;
  var PL$124/*defaults*/;
  ;
  var PL$212/*defaultCount*/;
  ;
  var PL$213/*options*/;
  ;
  var PL$214/*rest*/;
  ;
  PL$123/*params*/ = [
    
  ];
  PL$124/*defaults*/ = [
    
  ];
  PL$212/*defaultCount*/ = 0;
  PL$214/*rest*/ = null;
  PL$213/*options*/ = {
    "paramSet": {
      
    }
  };
  for(PL$53/*i*/ = 0,PL$54/*len*/ = PL$146/*expressions*/["length"];(PL$53/*i*/ < PL$54/*len*/);PL$53/*i*/ += 1){{
    PL$132/*param*/ = PL$146/*expressions*/[PL$53/*i*/];
    if((PL$132/*param*/["type"] === PL$6/*Syntax*/["Identifier"])){
      PL$123/*params*/["push"](PL$132/*param*/);
      PL$124/*defaults*/["push"](null);
      PL$215/*validateParam*/(PL$213/*options*/, PL$132/*param*/, PL$132/*param*/["name"]);
    }else{
    if((PL$132/*param*/["type"] === PL$6/*Syntax*/["AssignmentExpression"])){
      PL$123/*params*/["push"](PL$132/*param*/["left"]);
      PL$124/*defaults*/["push"](PL$132/*param*/["right"]);
      ++PL$212/*defaultCount*/;
      PL$215/*validateParam*/(PL$213/*options*/, PL$132/*param*/["left"], PL$132/*param*/["left"]["name"]);
    }else{
    return null;
    };
    };}};
  if((PL$213/*options*/["message"] === PL$9/*Messages*/["StrictParamDupe"])){
    PL$49/*throwError*/((PL$12/*strict*/ ? PL$213/*options*/["stricted"] : PL$213/*options*/["firstRestricted"]), PL$213/*options*/["message"]);
  };
  if((PL$212/*defaultCount*/ === 0)){
    PL$124/*defaults*/ = [
      
    ];
  };
  return {
    "params": PL$123/*params*/,
    "defaults": PL$124/*defaults*/,
    "rest": PL$214/*rest*/,
    "stricted": PL$213/*options*/["stricted"],
    "firstRestricted": PL$213/*options*/["firstRestricted"],
    "message": PL$213/*options*/["message"]
  };
  ;};
function PL$216/*parseArrowFunctionExpression*/(PL$213/*options*/, PL$175/*node*/){

  ;
  var PL$179/*previousStrict*/;
  ;
  var PL$94/*body*/;
  ;
  PL$163/*expect*/("=>");
  PL$179/*previousStrict*/ = PL$12/*strict*/;
  PL$94/*body*/ = PL$210/*parseConciseBody*/();
  if((PL$12/*strict*/ && PL$213/*options*/["firstRestricted"])){
    PL$49/*throwError*/(PL$213/*options*/["firstRestricted"], PL$213/*options*/["message"]);
  };
  if((PL$12/*strict*/ && PL$213/*options*/["stricted"])){
    PL$96/*throwErrorTolerant*/(PL$213/*options*/["stricted"], PL$213/*options*/["message"]);
  };
  PL$12/*strict*/ = PL$179/*previousStrict*/;
  return PL$175/*node*/["finishArrowFunctionExpression"](PL$213/*options*/["params"], PL$213/*options*/["defaults"], PL$94/*body*/, (PL$94/*body*/["type"] !== PL$6/*Syntax*/["BlockStatement"]));
  ;};
function PL$176/*parseAssignmentExpression*/(){

  ;
  var PL$217/*oldParenthesisCount*/;
  ;
  var PL$101/*token*/;
  ;
  var PL$173/*expr*/;
  ;
  var PL$128/*right*/;
  ;
  var PL$218/*list*/;
  ;
  var PL$115/*startToken*/;
  ;
  PL$217/*oldParenthesisCount*/ = PL$18/*state*/["parenthesisCount"];
  PL$115/*startToken*/ = PL$17/*lookahead*/;
  PL$101/*token*/ = PL$17/*lookahead*/;
  PL$173/*expr*/ = PL$209/*parseConditionalExpression*/();
  if(((PL$173/*expr*/ === PL$7/*PlaceHolders*/["ArrowParameterPlaceHolder"]) || PL$167/*match*/("=>"))){
    if(((PL$18/*state*/["parenthesisCount"] === PL$217/*oldParenthesisCount*/) || (PL$18/*state*/["parenthesisCount"] === (PL$217/*oldParenthesisCount*/ + 1)))){
      if((PL$173/*expr*/["type"] === PL$6/*Syntax*/["Identifier"])){
        PL$218/*list*/ = PL$211/*reinterpretAsCoverFormalsList*/([
          PL$173/*expr*/
        ]);
      }else{
      if((PL$173/*expr*/["type"] === PL$6/*Syntax*/["AssignmentExpression"])){
        PL$218/*list*/ = PL$211/*reinterpretAsCoverFormalsList*/([
          PL$173/*expr*/
        ]);
      }else{
      if((PL$173/*expr*/["type"] === PL$6/*Syntax*/["SequenceExpression"])){
        PL$218/*list*/ = PL$211/*reinterpretAsCoverFormalsList*/(PL$173/*expr*/["expressions"]);
      }else{
      if((PL$173/*expr*/ === PL$7/*PlaceHolders*/["ArrowParameterPlaceHolder"])){
        PL$218/*list*/ = PL$211/*reinterpretAsCoverFormalsList*/([
          
        ]);
      };
      };
      };
      };
      if(PL$218/*list*/){
        return PL$216/*parseArrowFunctionExpression*/(PL$218/*list*/, new PL$117/*WrappingNode*/(PL$115/*startToken*/));
      };
    };
  };
  if(PL$169/*matchAssign*/()){
    if(! PL$172/*isLeftHandSide*/(PL$173/*expr*/)){
      PL$96/*throwErrorTolerant*/({
        
      }, PL$9/*Messages*/["InvalidLHSInAssignment"]);
    };
    if(((PL$12/*strict*/ && (PL$173/*expr*/["type"] === PL$6/*Syntax*/["Identifier"])) && PL$37/*isRestrictedWord*/(PL$173/*expr*/["name"]))){
      PL$96/*throwErrorTolerant*/(PL$101/*token*/, PL$9/*Messages*/["StrictLHSAssignment"]);
    };
    PL$101/*token*/ = PL$109/*lex*/();
    PL$128/*right*/ = PL$176/*parseAssignmentExpression*/();
    PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishAssignmentExpression"](PL$101/*token*/["value"], PL$173/*expr*/, PL$128/*right*/);
  };
  return PL$173/*expr*/;
  ;};
function PL$189/*parseExpression*/(){

  ;
  var PL$173/*expr*/;
  ;
  var PL$115/*startToken*/ = PL$17/*lookahead*/;
  ;
  var PL$146/*expressions*/;
  ;
  PL$173/*expr*/ = PL$176/*parseAssignmentExpression*/();
  if(PL$167/*match*/(",")){
    PL$146/*expressions*/ = [
      PL$173/*expr*/
    ];
    while((PL$13/*index*/ < PL$16/*length*/)){
    {
      if(! PL$167/*match*/(",")){
        break;;
      };
      PL$109/*lex*/();
      PL$146/*expressions*/["push"](PL$176/*parseAssignmentExpression*/());}};
    PL$173/*expr*/ = new PL$117/*WrappingNode*/(PL$115/*startToken*/)["finishSequenceExpression"](PL$146/*expressions*/);
  };
  return PL$173/*expr*/;
  ;};
function PL$219/*parseStatementList*/(){

  ;
  var PL$218/*list*/ = [
    
  ];
  ;
  var PL$220/*statement*/;
  ;
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    if(PL$167/*match*/("}")){
      break;;
    };
    PL$220/*statement*/ = PL$221/*parseSourceElement*/();
    if((typeof PL$220/*statement*/ === "undefined")){
      break;;
    };
    PL$218/*list*/["push"](PL$220/*statement*/);}};
  return PL$218/*list*/;
  ;};
function PL$222/*parseBlock*/(){

  ;
  var PL$149/*block*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$163/*expect*/("{");
  PL$149/*block*/ = PL$219/*parseStatementList*/();
  PL$163/*expect*/("}");
  return PL$175/*node*/["finishBlockStatement"](PL$149/*block*/);
  ;};
function PL$183/*parseVariableIdentifier*/(){

  ;
  var PL$101/*token*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$101/*token*/ = PL$109/*lex*/();
  if((PL$101/*token*/["type"] !== PL$3/*Token*/["Identifier"])){
    PL$162/*throwUnexpected*/(PL$101/*token*/);
  };
  return PL$175/*node*/["finishIdentifier"](PL$101/*token*/["value"]);
  ;};
function PL$223/*parseVariableDeclaration*/(PL$144/*kind*/){

  ;
  var PL$136/*init*/ = null;
  ;
  var PL$35/*id*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$35/*id*/ = PL$183/*parseVariableIdentifier*/();
  if((PL$12/*strict*/ && PL$37/*isRestrictedWord*/(PL$35/*id*/["name"]))){
    PL$96/*throwErrorTolerant*/({
      
    }, PL$9/*Messages*/["StrictVarName"]);
  };
  if((PL$144/*kind*/ === "const")){
    PL$163/*expect*/("=");
    PL$136/*init*/ = PL$176/*parseAssignmentExpression*/();
  }else{
  if(PL$167/*match*/("=")){
    PL$109/*lex*/();
    PL$136/*init*/ = PL$176/*parseAssignmentExpression*/();
  };
  };
  return PL$175/*node*/["finishVariableDeclarator"](PL$35/*id*/, PL$136/*init*/);
  ;};
function PL$224/*parseVariableDeclarationList*/(PL$144/*kind*/){

  ;
  var PL$218/*list*/ = [
    
  ];
  ;
  do{
  {
    PL$218/*list*/["push"](PL$223/*parseVariableDeclaration*/(PL$144/*kind*/));
    if(! PL$167/*match*/(",")){
      break;;
    };
    PL$109/*lex*/();}} while ((PL$13/*index*/ < PL$16/*length*/));
  return PL$218/*list*/;
  ;};
function PL$225/*parseVariableStatement*/(PL$175/*node*/){

  ;
  var PL$153/*declarations*/;
  ;
  PL$165/*expectKeyword*/("var");
  PL$153/*declarations*/ = PL$224/*parseVariableDeclarationList*/();
  PL$171/*consumeSemicolon*/();
  return PL$175/*node*/["finishVariableDeclaration"](PL$153/*declarations*/, "var");
  ;};
function PL$226/*parseConstLetDeclaration*/(PL$144/*kind*/){

  ;
  var PL$153/*declarations*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$165/*expectKeyword*/(PL$144/*kind*/);
  PL$153/*declarations*/ = PL$224/*parseVariableDeclarationList*/(PL$144/*kind*/);
  PL$171/*consumeSemicolon*/();
  return PL$175/*node*/["finishVariableDeclaration"](PL$153/*declarations*/, PL$144/*kind*/);
  ;};
function PL$227/*parseEmptyStatement*/(){

  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$163/*expect*/(";");
  return PL$175/*node*/["finishEmptyStatement"]();
  ;};
function PL$228/*parseExpressionStatement*/(PL$175/*node*/){

  ;
  var PL$173/*expr*/ = PL$189/*parseExpression*/();
  ;
  PL$171/*consumeSemicolon*/();
  return PL$175/*node*/["finishExpressionStatement"](PL$173/*expr*/);
  ;};
function PL$229/*parseIfStatement*/(PL$175/*node*/){

  ;
  var PL$133/*test*/;
  ;
  var PL$134/*consequent*/;
  ;
  var PL$135/*alternate*/;
  ;
  PL$165/*expectKeyword*/("if");
  PL$163/*expect*/("(");
  PL$133/*test*/ = PL$189/*parseExpression*/();
  PL$163/*expect*/(")");
  PL$134/*consequent*/ = PL$230/*parseStatement*/();
  if(PL$168/*matchKeyword*/("else")){
    PL$109/*lex*/();
    PL$135/*alternate*/ = PL$230/*parseStatement*/();
  }else{
  PL$135/*alternate*/ = null;
  };
  return PL$175/*node*/["finishIfStatement"](PL$133/*test*/, PL$134/*consequent*/, PL$135/*alternate*/);
  ;};
function PL$231/*parseDoWhileStatement*/(PL$175/*node*/){

  ;
  var PL$94/*body*/;
  ;
  var PL$133/*test*/;
  ;
  var PL$232/*oldInIteration*/;
  ;
  PL$165/*expectKeyword*/("do");
  PL$232/*oldInIteration*/ = PL$18/*state*/["inIteration"];
  PL$18/*state*/["inIteration"] = true;
  PL$94/*body*/ = PL$230/*parseStatement*/();
  PL$18/*state*/["inIteration"] = PL$232/*oldInIteration*/;
  PL$165/*expectKeyword*/("while");
  PL$163/*expect*/("(");
  PL$133/*test*/ = PL$189/*parseExpression*/();
  PL$163/*expect*/(")");
  if(PL$167/*match*/(";")){
    PL$109/*lex*/();
  };
  return PL$175/*node*/["finishDoWhileStatement"](PL$94/*body*/, PL$133/*test*/);
  ;};
function PL$233/*parseWhileStatement*/(PL$175/*node*/){

  ;
  var PL$133/*test*/;
  ;
  var PL$94/*body*/;
  ;
  var PL$232/*oldInIteration*/;
  ;
  PL$165/*expectKeyword*/("while");
  PL$163/*expect*/("(");
  PL$133/*test*/ = PL$189/*parseExpression*/();
  PL$163/*expect*/(")");
  PL$232/*oldInIteration*/ = PL$18/*state*/["inIteration"];
  PL$18/*state*/["inIteration"] = true;
  PL$94/*body*/ = PL$230/*parseStatement*/();
  PL$18/*state*/["inIteration"] = PL$232/*oldInIteration*/;
  return PL$175/*node*/["finishWhileStatement"](PL$133/*test*/, PL$94/*body*/);
  ;};
function PL$234/*parseForVariableDeclaration*/(){

  ;
  var PL$101/*token*/;
  ;
  var PL$153/*declarations*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$101/*token*/ = PL$109/*lex*/();
  PL$153/*declarations*/ = PL$224/*parseVariableDeclarationList*/();
  return PL$175/*node*/["finishVariableDeclaration"](PL$153/*declarations*/, PL$101/*token*/["value"]);
  ;};
function PL$235/*parseForStatement*/(PL$175/*node*/){

  ;
  var PL$136/*init*/;
  ;
  var PL$133/*test*/;
  ;
  var PL$137/*update*/;
  ;
  var PL$127/*left*/;
  ;
  var PL$128/*right*/;
  ;
  var PL$94/*body*/;
  ;
  var PL$232/*oldInIteration*/;
  ;
  var PL$199/*previousAllowIn*/ = PL$18/*state*/["allowIn"];
  ;
  PL$136/*init*/ = PL$133/*test*/ = PL$137/*update*/ = null;
  PL$165/*expectKeyword*/("for");
  PL$163/*expect*/("(");
  if(PL$167/*match*/(";")){
    PL$109/*lex*/();
  }else{
  if((PL$168/*matchKeyword*/("var") || PL$168/*matchKeyword*/("let"))){
    PL$18/*state*/["allowIn"] = false;
    PL$136/*init*/ = PL$234/*parseForVariableDeclaration*/();
    PL$18/*state*/["allowIn"] = PL$199/*previousAllowIn*/;
    if(((PL$136/*init*/["declarations"]["length"] === 1) && PL$168/*matchKeyword*/("in"))){
      PL$109/*lex*/();
      PL$127/*left*/ = PL$136/*init*/;
      PL$128/*right*/ = PL$189/*parseExpression*/();
      PL$136/*init*/ = null;
    };
  }else{
  PL$18/*state*/["allowIn"] = false;
  PL$136/*init*/ = PL$189/*parseExpression*/();
  PL$18/*state*/["allowIn"] = PL$199/*previousAllowIn*/;
  if(PL$168/*matchKeyword*/("in")){
    if(! PL$172/*isLeftHandSide*/(PL$136/*init*/)){
      PL$96/*throwErrorTolerant*/({
        
      }, PL$9/*Messages*/["InvalidLHSInForIn"]);
    };
    PL$109/*lex*/();
    PL$127/*left*/ = PL$136/*init*/;
    PL$128/*right*/ = PL$189/*parseExpression*/();
    PL$136/*init*/ = null;
  };
  };
  if((typeof PL$127/*left*/ === "undefined")){
    PL$163/*expect*/(";");
  };
  };
  if((typeof PL$127/*left*/ === "undefined")){
    if(! PL$167/*match*/(";")){
      PL$133/*test*/ = PL$189/*parseExpression*/();
    };
    PL$163/*expect*/(";");
    if(! PL$167/*match*/(")")){
      PL$137/*update*/ = PL$189/*parseExpression*/();
    };
  };
  PL$163/*expect*/(")");
  PL$232/*oldInIteration*/ = PL$18/*state*/["inIteration"];
  PL$18/*state*/["inIteration"] = true;
  PL$94/*body*/ = PL$230/*parseStatement*/();
  PL$18/*state*/["inIteration"] = PL$232/*oldInIteration*/;
  return ((typeof PL$127/*left*/ === "undefined") ? PL$175/*node*/["finishForStatement"](PL$136/*init*/, PL$133/*test*/, PL$137/*update*/, PL$94/*body*/) : PL$175/*node*/["finishForInStatement"](PL$127/*left*/, PL$128/*right*/, PL$94/*body*/));
  ;};
function PL$236/*parseContinueStatement*/(PL$175/*node*/){

  ;
  var PL$129/*label*/ = null;
  ;
  var PL$145/*key*/;
  ;
  PL$165/*expectKeyword*/("continue");
  if((PL$11/*source*/["charCodeAt"](PL$13/*index*/) === 59)){
    PL$109/*lex*/();
    if(! PL$18/*state*/["inIteration"]){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["IllegalContinue"]);
    };
    return PL$175/*node*/["finishContinueStatement"](null);
  };
  if(PL$154/*peekLineTerminator*/()){
    if(! PL$18/*state*/["inIteration"]){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["IllegalContinue"]);
    };
    return PL$175/*node*/["finishContinueStatement"](null);
  };
  if((PL$17/*lookahead*/["type"] === PL$3/*Token*/["Identifier"])){
    PL$129/*label*/ = PL$183/*parseVariableIdentifier*/();
    PL$145/*key*/ = ("$" + PL$129/*label*/["name"]);
    if(! PL$187/*Object*/["prototype"]["hasOwnProperty"]["call"](PL$18/*state*/["labelSet"], PL$145/*key*/)){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["UnknownLabel"], PL$129/*label*/["name"]);
    };
  };
  PL$171/*consumeSemicolon*/();
  if(((PL$129/*label*/ === null) && ! PL$18/*state*/["inIteration"])){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["IllegalContinue"]);
  };
  return PL$175/*node*/["finishContinueStatement"](PL$129/*label*/);
  ;};
function PL$237/*parseBreakStatement*/(PL$175/*node*/){

  ;
  var PL$129/*label*/ = null;
  ;
  var PL$145/*key*/;
  ;
  PL$165/*expectKeyword*/("break");
  if((PL$11/*source*/["charCodeAt"](PL$13/*index*/) === 59)){
    PL$109/*lex*/();
    if(! (PL$18/*state*/["inIteration"] || PL$18/*state*/["inSwitch"])){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["IllegalBreak"]);
    };
    return PL$175/*node*/["finishBreakStatement"](null);
  };
  if(PL$154/*peekLineTerminator*/()){
    if(! (PL$18/*state*/["inIteration"] || PL$18/*state*/["inSwitch"])){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["IllegalBreak"]);
    };
    return PL$175/*node*/["finishBreakStatement"](null);
  };
  if((PL$17/*lookahead*/["type"] === PL$3/*Token*/["Identifier"])){
    PL$129/*label*/ = PL$183/*parseVariableIdentifier*/();
    PL$145/*key*/ = ("$" + PL$129/*label*/["name"]);
    if(! PL$187/*Object*/["prototype"]["hasOwnProperty"]["call"](PL$18/*state*/["labelSet"], PL$145/*key*/)){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["UnknownLabel"], PL$129/*label*/["name"]);
    };
  };
  PL$171/*consumeSemicolon*/();
  if(((PL$129/*label*/ === null) && ! (PL$18/*state*/["inIteration"] || PL$18/*state*/["inSwitch"]))){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["IllegalBreak"]);
  };
  return PL$175/*node*/["finishBreakStatement"](PL$129/*label*/);
  ;};
function PL$238/*parseReturnStatement*/(PL$175/*node*/){

  ;
  var PL$143/*argument*/ = null;
  ;
  PL$165/*expectKeyword*/("return");
  if(! PL$18/*state*/["inFunctionBody"]){
    PL$96/*throwErrorTolerant*/({
      
    }, PL$9/*Messages*/["IllegalReturn"]);
  };
  if((PL$11/*source*/["charCodeAt"](PL$13/*index*/) === 32)){
    if(PL$31/*isIdentifierStart*/(PL$11/*source*/["charCodeAt"]((PL$13/*index*/ + 1)))){
      PL$143/*argument*/ = PL$189/*parseExpression*/();
      PL$171/*consumeSemicolon*/();
      return PL$175/*node*/["finishReturnStatement"](PL$143/*argument*/);
    };
  };
  if(PL$154/*peekLineTerminator*/()){
    return PL$175/*node*/["finishReturnStatement"](null);
  };
  if(! PL$167/*match*/(";")){
    if((! PL$167/*match*/("}") && (PL$17/*lookahead*/["type"] !== PL$3/*Token*/["EOF"]))){
      PL$143/*argument*/ = PL$189/*parseExpression*/();
    };
  };
  PL$171/*consumeSemicolon*/();
  return PL$175/*node*/["finishReturnStatement"](PL$143/*argument*/);
  ;};
function PL$239/*parseWithStatement*/(PL$175/*node*/){

  ;
  var PL$140/*object*/;
  ;
  var PL$94/*body*/;
  ;
  if(PL$12/*strict*/){
    PL$50/*skipComment*/();
    PL$96/*throwErrorTolerant*/({
      
    }, PL$9/*Messages*/["StrictModeWith"]);
  };
  PL$165/*expectKeyword*/("with");
  PL$163/*expect*/("(");
  PL$140/*object*/ = PL$189/*parseExpression*/();
  PL$163/*expect*/(")");
  PL$94/*body*/ = PL$230/*parseStatement*/();
  return PL$175/*node*/["finishWithStatement"](PL$140/*object*/, PL$94/*body*/);
  ;};
function PL$240/*parseSwitchCase*/(){

  ;
  var PL$133/*test*/;
  ;
  var PL$134/*consequent*/ = [
    
  ];
  ;
  var PL$220/*statement*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  if(PL$168/*matchKeyword*/("default")){
    PL$109/*lex*/();
    PL$133/*test*/ = null;
  }else{
  PL$165/*expectKeyword*/("case");
  PL$133/*test*/ = PL$189/*parseExpression*/();
  };
  PL$163/*expect*/(":");
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    if(((PL$167/*match*/("}") || PL$168/*matchKeyword*/("default")) || PL$168/*matchKeyword*/("case"))){
      break;;
    };
    PL$220/*statement*/ = PL$230/*parseStatement*/();
    PL$134/*consequent*/["push"](PL$220/*statement*/);}};
  return PL$175/*node*/["finishSwitchCase"](PL$133/*test*/, PL$134/*consequent*/);
  ;};
function PL$241/*parseSwitchStatement*/(PL$175/*node*/){

  ;
  var PL$147/*discriminant*/;
  ;
  var PL$148/*cases*/;
  ;
  var PL$242/*clause*/;
  ;
  var PL$243/*oldInSwitch*/;
  ;
  var PL$244/*defaultFound*/;
  ;
  PL$165/*expectKeyword*/("switch");
  PL$163/*expect*/("(");
  PL$147/*discriminant*/ = PL$189/*parseExpression*/();
  PL$163/*expect*/(")");
  PL$163/*expect*/("{");
  PL$148/*cases*/ = [
    
  ];
  if(PL$167/*match*/("}")){
    PL$109/*lex*/();
    return PL$175/*node*/["finishSwitchStatement"](PL$147/*discriminant*/, PL$148/*cases*/);
  };
  PL$243/*oldInSwitch*/ = PL$18/*state*/["inSwitch"];
  PL$18/*state*/["inSwitch"] = true;
  PL$244/*defaultFound*/ = false;
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    if(PL$167/*match*/("}")){
      break;;
    };
    PL$242/*clause*/ = PL$240/*parseSwitchCase*/();
    if((PL$242/*clause*/["test"] === null)){
      if(PL$244/*defaultFound*/){
        PL$49/*throwError*/({
          
        }, PL$9/*Messages*/["MultipleDefaultsInSwitch"]);
      };
      PL$244/*defaultFound*/ = true;
    };
    PL$148/*cases*/["push"](PL$242/*clause*/);}};
  PL$18/*state*/["inSwitch"] = PL$243/*oldInSwitch*/;
  PL$163/*expect*/("}");
  return PL$175/*node*/["finishSwitchStatement"](PL$147/*discriminant*/, PL$148/*cases*/);
  ;};
function PL$245/*parseThrowStatement*/(PL$175/*node*/){

  ;
  var PL$143/*argument*/;
  ;
  PL$165/*expectKeyword*/("throw");
  if(PL$154/*peekLineTerminator*/()){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["NewlineAfterThrow"]);
  };
  PL$143/*argument*/ = PL$189/*parseExpression*/();
  PL$171/*consumeSemicolon*/();
  return PL$175/*node*/["finishThrowStatement"](PL$143/*argument*/);
  ;};
function PL$246/*parseCatchClause*/(){

  ;
  var PL$132/*param*/;
  ;
  var PL$94/*body*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$165/*expectKeyword*/("catch");
  PL$163/*expect*/("(");
  if(PL$167/*match*/(")")){
    PL$162/*throwUnexpected*/(PL$17/*lookahead*/);
  };
  PL$132/*param*/ = PL$183/*parseVariableIdentifier*/();
  if((PL$12/*strict*/ && PL$37/*isRestrictedWord*/(PL$132/*param*/["name"]))){
    PL$96/*throwErrorTolerant*/({
      
    }, PL$9/*Messages*/["StrictCatchVariable"]);
  };
  PL$163/*expect*/(")");
  PL$94/*body*/ = PL$222/*parseBlock*/();
  return PL$175/*node*/["finishCatchClause"](PL$132/*param*/, PL$94/*body*/);
  ;};
function PL$247/*parseTryStatement*/(PL$175/*node*/){

  ;
  var PL$149/*block*/;
  ;
  var PL$151/*handlers*/ = [
    
  ];
  ;
  var PL$152/*finalizer*/ = null;
  ;
  PL$165/*expectKeyword*/("try");
  PL$149/*block*/ = PL$222/*parseBlock*/();
  if(PL$168/*matchKeyword*/("catch")){
    PL$151/*handlers*/["push"](PL$246/*parseCatchClause*/());
  };
  if(PL$168/*matchKeyword*/("finally")){
    PL$109/*lex*/();
    PL$152/*finalizer*/ = PL$222/*parseBlock*/();
  };
  if(((PL$151/*handlers*/["length"] === 0) && ! PL$152/*finalizer*/)){
    PL$49/*throwError*/({
      
    }, PL$9/*Messages*/["NoCatchOrFinally"]);
  };
  return PL$175/*node*/["finishTryStatement"](PL$149/*block*/, [
    
  ], PL$151/*handlers*/, PL$152/*finalizer*/);
  ;};
function PL$248/*parseDebuggerStatement*/(PL$175/*node*/){

  ;
  PL$165/*expectKeyword*/("debugger");
  PL$171/*consumeSemicolon*/();
  return PL$175/*node*/["finishDebuggerStatement"]();
  ;};
function PL$230/*parseStatement*/(){

  ;
  var PL$40/*type*/ = PL$17/*lookahead*/["type"];
  ;
  var PL$173/*expr*/;
  ;
  var PL$249/*labeledBody*/;
  ;
  var PL$145/*key*/;
  ;
  var PL$175/*node*/;
  ;
  if((PL$40/*type*/ === PL$3/*Token*/["EOF"])){
    PL$162/*throwUnexpected*/(PL$17/*lookahead*/);
  };
  if(((PL$40/*type*/ === PL$3/*Token*/["Punctuator"]) && (PL$17/*lookahead*/["value"] === "{"))){
    return PL$222/*parseBlock*/();
  };
  PL$175/*node*/ = new PL$116/*Node*/();
  if((PL$40/*type*/ === PL$3/*Token*/["Punctuator"])){
    switch (PL$17/*lookahead*/["value"]){
      case ";":
        
        return PL$227/*parseEmptyStatement*/(PL$175/*node*/);
      case "(":
        
        return PL$228/*parseExpressionStatement*/(PL$175/*node*/);
      default:
        
        break;;
      
    };
  }else{
  if((PL$40/*type*/ === PL$3/*Token*/["Keyword"])){
    switch (PL$17/*lookahead*/["value"]){
      case "break":
        
        return PL$237/*parseBreakStatement*/(PL$175/*node*/);
      case "continue":
        
        return PL$236/*parseContinueStatement*/(PL$175/*node*/);
      case "debugger":
        
        return PL$248/*parseDebuggerStatement*/(PL$175/*node*/);
      case "do":
        
        return PL$231/*parseDoWhileStatement*/(PL$175/*node*/);
      case "for":
        
        return PL$235/*parseForStatement*/(PL$175/*node*/);
      case "function":
        
        return PL$250/*parseFunctionDeclaration*/(PL$175/*node*/);
      case "if":
        
        return PL$229/*parseIfStatement*/(PL$175/*node*/);
      case "return":
        
        return PL$238/*parseReturnStatement*/(PL$175/*node*/);
      case "switch":
        
        return PL$241/*parseSwitchStatement*/(PL$175/*node*/);
      case "throw":
        
        return PL$245/*parseThrowStatement*/(PL$175/*node*/);
      case "try":
        
        return PL$247/*parseTryStatement*/(PL$175/*node*/);
      case "var":
        
        return PL$225/*parseVariableStatement*/(PL$175/*node*/);
      case "while":
        
        return PL$233/*parseWhileStatement*/(PL$175/*node*/);
      case "with":
        
        return PL$239/*parseWithStatement*/(PL$175/*node*/);
      default:
        
        break;;
      
    };
  };
  };
  PL$173/*expr*/ = PL$189/*parseExpression*/();
  if(((PL$173/*expr*/["type"] === PL$6/*Syntax*/["Identifier"]) && PL$167/*match*/(":"))){
    PL$109/*lex*/();
    PL$145/*key*/ = ("$" + PL$173/*expr*/["name"]);
    if(PL$187/*Object*/["prototype"]["hasOwnProperty"]["call"](PL$18/*state*/["labelSet"], PL$145/*key*/)){
      PL$49/*throwError*/({
        
      }, PL$9/*Messages*/["Redeclaration"], "Label", PL$173/*expr*/["name"]);
    };
    PL$18/*state*/["labelSet"][PL$145/*key*/] = true;
    PL$249/*labeledBody*/ = PL$230/*parseStatement*/();
    delete PL$18/*state*/["labelSet"][PL$145/*key*/];
    return PL$175/*node*/["finishLabeledStatement"](PL$173/*expr*/, PL$249/*labeledBody*/);
  };
  PL$171/*consumeSemicolon*/();
  return PL$175/*node*/["finishExpressionStatement"](PL$173/*expr*/);
  ;};
function PL$180/*parseFunctionSourceElements*/(){

  ;
  var PL$251/*sourceElement*/;
  ;
  var PL$252/*sourceElements*/ = [
    
  ];
  ;
  var PL$101/*token*/;
  ;
  var PL$253/*directive*/;
  ;
  var PL$254/*firstRestricted*/;
  ;
  var PL$255/*oldLabelSet*/;
  ;
  var PL$232/*oldInIteration*/;
  ;
  var PL$243/*oldInSwitch*/;
  ;
  var PL$256/*oldInFunctionBody*/;
  ;
  var PL$217/*oldParenthesisCount*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$163/*expect*/("{");
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    if((PL$17/*lookahead*/["type"] !== PL$3/*Token*/["StringLiteral"])){
      break;;
    };
    PL$101/*token*/ = PL$17/*lookahead*/;
    PL$251/*sourceElement*/ = PL$221/*parseSourceElement*/();
    PL$252/*sourceElements*/["push"](PL$251/*sourceElement*/);
    if((PL$251/*sourceElement*/["expression"]["type"] !== PL$6/*Syntax*/["Literal"])){
      break;;
    };
    PL$253/*directive*/ = PL$11/*source*/["slice"]((PL$101/*token*/["start"] + 1), (PL$101/*token*/["end"] - 1));
    if((PL$253/*directive*/ === "use strict")){
      PL$12/*strict*/ = true;
      if(PL$254/*firstRestricted*/){
        PL$96/*throwErrorTolerant*/(PL$254/*firstRestricted*/, PL$9/*Messages*/["StrictOctalLiteral"]);
      };
    }else{
    if((! PL$254/*firstRestricted*/ && PL$101/*token*/["octal"])){
      PL$254/*firstRestricted*/ = PL$101/*token*/;
    };
    };}};
  PL$255/*oldLabelSet*/ = PL$18/*state*/["labelSet"];
  PL$232/*oldInIteration*/ = PL$18/*state*/["inIteration"];
  PL$243/*oldInSwitch*/ = PL$18/*state*/["inSwitch"];
  PL$256/*oldInFunctionBody*/ = PL$18/*state*/["inFunctionBody"];
  PL$217/*oldParenthesisCount*/ = PL$18/*state*/["parenthesizedCount"];
  PL$18/*state*/["labelSet"] = {
    
  };
  PL$18/*state*/["inIteration"] = false;
  PL$18/*state*/["inSwitch"] = false;
  PL$18/*state*/["inFunctionBody"] = true;
  PL$18/*state*/["parenthesizedCount"] = 0;
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    if(PL$167/*match*/("}")){
      break;;
    };
    PL$251/*sourceElement*/ = PL$221/*parseSourceElement*/();
    if((typeof PL$251/*sourceElement*/ === "undefined")){
      break;;
    };
    PL$252/*sourceElements*/["push"](PL$251/*sourceElement*/);}};
  PL$163/*expect*/("}");
  PL$18/*state*/["labelSet"] = PL$255/*oldLabelSet*/;
  PL$18/*state*/["inIteration"] = PL$232/*oldInIteration*/;
  PL$18/*state*/["inSwitch"] = PL$243/*oldInSwitch*/;
  PL$18/*state*/["inFunctionBody"] = PL$256/*oldInFunctionBody*/;
  PL$18/*state*/["parenthesizedCount"] = PL$217/*oldParenthesisCount*/;
  return PL$175/*node*/["finishBlockStatement"](PL$252/*sourceElements*/);
  ;};
function PL$215/*validateParam*/(PL$213/*options*/, PL$132/*param*/, PL$138/*name*/){

  ;
  var PL$145/*key*/ = ("$" + PL$138/*name*/);
  ;
  if(PL$12/*strict*/){
    if(PL$37/*isRestrictedWord*/(PL$138/*name*/)){
      PL$213/*options*/["stricted"] = PL$132/*param*/;
      PL$213/*options*/["message"] = PL$9/*Messages*/["StrictParamName"];
    };
    if(PL$187/*Object*/["prototype"]["hasOwnProperty"]["call"](PL$213/*options*/["paramSet"], PL$145/*key*/)){
      PL$213/*options*/["stricted"] = PL$132/*param*/;
      PL$213/*options*/["message"] = PL$9/*Messages*/["StrictParamDupe"];
    };
  }else{
  if(! PL$213/*options*/["firstRestricted"]){
    if(PL$37/*isRestrictedWord*/(PL$138/*name*/)){
      PL$213/*options*/["firstRestricted"] = PL$132/*param*/;
      PL$213/*options*/["message"] = PL$9/*Messages*/["StrictParamName"];
    }else{
    if(PL$36/*isStrictModeReservedWord*/(PL$138/*name*/)){
      PL$213/*options*/["firstRestricted"] = PL$132/*param*/;
      PL$213/*options*/["message"] = PL$9/*Messages*/["StrictReservedWord"];
    }else{
    if(PL$187/*Object*/["prototype"]["hasOwnProperty"]["call"](PL$213/*options*/["paramSet"], PL$145/*key*/)){
      PL$213/*options*/["firstRestricted"] = PL$132/*param*/;
      PL$213/*options*/["message"] = PL$9/*Messages*/["StrictParamDupe"];
    };
    };
    };
  };
  };
  PL$213/*options*/["paramSet"][PL$145/*key*/] = true;
  ;};
function PL$257/*parseParam*/(PL$213/*options*/){

  ;
  var PL$101/*token*/;
  ;
  var PL$132/*param*/;
  ;
  var PL$258/*def*/;
  ;
  PL$101/*token*/ = PL$17/*lookahead*/;
  PL$132/*param*/ = PL$183/*parseVariableIdentifier*/();
  PL$215/*validateParam*/(PL$213/*options*/, PL$101/*token*/, PL$101/*token*/["value"]);
  if(PL$167/*match*/("=")){
    PL$109/*lex*/();
    PL$258/*def*/ = PL$176/*parseAssignmentExpression*/();
    ++PL$213/*options*/["defaultCount"];
  };
  PL$213/*options*/["params"]["push"](PL$132/*param*/);
  PL$213/*options*/["defaults"]["push"](PL$258/*def*/);
  return ! PL$167/*match*/(")");
  ;};
function PL$259/*parseParams*/(PL$254/*firstRestricted*/){

  ;
  var PL$213/*options*/;
  ;
  PL$213/*options*/ = {
    "params": [
      
    ],
    "defaultCount": 0,
    "defaults": [
      
    ],
    "firstRestricted": PL$254/*firstRestricted*/
  };
  PL$163/*expect*/("(");
  if(! PL$167/*match*/(")")){
    PL$213/*options*/["paramSet"] = {
      
    };
    while((PL$13/*index*/ < PL$16/*length*/)){
    {
      if(! PL$257/*parseParam*/(PL$213/*options*/)){
        break;;
      };
      PL$163/*expect*/(",");}};
  };
  PL$163/*expect*/(")");
  if((PL$213/*options*/["defaultCount"] === 0)){
    PL$213/*options*/["defaults"] = [
      
    ];
  };
  return {
    "params": PL$213/*options*/["params"],
    "defaults": PL$213/*options*/["defaults"],
    "stricted": PL$213/*options*/["stricted"],
    "firstRestricted": PL$213/*options*/["firstRestricted"],
    "message": PL$213/*options*/["message"]
  };
  ;};
function PL$250/*parseFunctionDeclaration*/(){

  ;
  var PL$35/*id*/;
  ;
  var PL$123/*params*/ = [
    
  ];
  ;
  var PL$124/*defaults*/ = [
    
  ];
  ;
  var PL$94/*body*/;
  ;
  var PL$101/*token*/;
  ;
  var PL$260/*stricted*/;
  ;
  var PL$86/*tmp*/;
  ;
  var PL$254/*firstRestricted*/;
  ;
  var PL$23/*message*/;
  ;
  var PL$179/*previousStrict*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$165/*expectKeyword*/("function");
  PL$101/*token*/ = PL$17/*lookahead*/;
  PL$35/*id*/ = PL$183/*parseVariableIdentifier*/();
  if(PL$12/*strict*/){
    if(PL$37/*isRestrictedWord*/(PL$101/*token*/["value"])){
      PL$96/*throwErrorTolerant*/(PL$101/*token*/, PL$9/*Messages*/["StrictFunctionName"]);
    };
  }else{
  if(PL$37/*isRestrictedWord*/(PL$101/*token*/["value"])){
    PL$254/*firstRestricted*/ = PL$101/*token*/;
    PL$23/*message*/ = PL$9/*Messages*/["StrictFunctionName"];
  }else{
  if(PL$36/*isStrictModeReservedWord*/(PL$101/*token*/["value"])){
    PL$254/*firstRestricted*/ = PL$101/*token*/;
    PL$23/*message*/ = PL$9/*Messages*/["StrictReservedWord"];
  };
  };
  };
  PL$86/*tmp*/ = PL$259/*parseParams*/(PL$254/*firstRestricted*/);
  PL$123/*params*/ = PL$86/*tmp*/["params"];
  PL$124/*defaults*/ = PL$86/*tmp*/["defaults"];
  PL$260/*stricted*/ = PL$86/*tmp*/["stricted"];
  PL$254/*firstRestricted*/ = PL$86/*tmp*/["firstRestricted"];
  if(PL$86/*tmp*/["message"]){
    PL$23/*message*/ = PL$86/*tmp*/["message"];
  };
  PL$179/*previousStrict*/ = PL$12/*strict*/;
  PL$94/*body*/ = PL$180/*parseFunctionSourceElements*/();
  if((PL$12/*strict*/ && PL$254/*firstRestricted*/)){
    PL$49/*throwError*/(PL$254/*firstRestricted*/, PL$23/*message*/);
  };
  if((PL$12/*strict*/ && PL$260/*stricted*/)){
    PL$96/*throwErrorTolerant*/(PL$260/*stricted*/, PL$23/*message*/);
  };
  PL$12/*strict*/ = PL$179/*previousStrict*/;
  return PL$175/*node*/["finishFunctionDeclaration"](PL$35/*id*/, PL$123/*params*/, PL$124/*defaults*/, PL$94/*body*/);
  ;};
function PL$191/*parseFunctionExpression*/(){

  ;
  var PL$101/*token*/;
  ;
  var PL$35/*id*/ = null;
  ;
  var PL$260/*stricted*/;
  ;
  var PL$254/*firstRestricted*/;
  ;
  var PL$23/*message*/;
  ;
  var PL$86/*tmp*/;
  ;
  var PL$123/*params*/ = [
    
  ];
  ;
  var PL$124/*defaults*/ = [
    
  ];
  ;
  var PL$94/*body*/;
  ;
  var PL$179/*previousStrict*/;
  ;
  var PL$175/*node*/ = new PL$116/*Node*/();
  ;
  PL$165/*expectKeyword*/("function");
  if(! PL$167/*match*/("(")){
    PL$101/*token*/ = PL$17/*lookahead*/;
    PL$35/*id*/ = PL$183/*parseVariableIdentifier*/();
    if(PL$12/*strict*/){
      if(PL$37/*isRestrictedWord*/(PL$101/*token*/["value"])){
        PL$96/*throwErrorTolerant*/(PL$101/*token*/, PL$9/*Messages*/["StrictFunctionName"]);
      };
    }else{
    if(PL$37/*isRestrictedWord*/(PL$101/*token*/["value"])){
      PL$254/*firstRestricted*/ = PL$101/*token*/;
      PL$23/*message*/ = PL$9/*Messages*/["StrictFunctionName"];
    }else{
    if(PL$36/*isStrictModeReservedWord*/(PL$101/*token*/["value"])){
      PL$254/*firstRestricted*/ = PL$101/*token*/;
      PL$23/*message*/ = PL$9/*Messages*/["StrictReservedWord"];
    };
    };
    };
  };
  PL$86/*tmp*/ = PL$259/*parseParams*/(PL$254/*firstRestricted*/);
  PL$123/*params*/ = PL$86/*tmp*/["params"];
  PL$124/*defaults*/ = PL$86/*tmp*/["defaults"];
  PL$260/*stricted*/ = PL$86/*tmp*/["stricted"];
  PL$254/*firstRestricted*/ = PL$86/*tmp*/["firstRestricted"];
  if(PL$86/*tmp*/["message"]){
    PL$23/*message*/ = PL$86/*tmp*/["message"];
  };
  PL$179/*previousStrict*/ = PL$12/*strict*/;
  PL$94/*body*/ = PL$180/*parseFunctionSourceElements*/();
  if((PL$12/*strict*/ && PL$254/*firstRestricted*/)){
    PL$49/*throwError*/(PL$254/*firstRestricted*/, PL$23/*message*/);
  };
  if((PL$12/*strict*/ && PL$260/*stricted*/)){
    PL$96/*throwErrorTolerant*/(PL$260/*stricted*/, PL$23/*message*/);
  };
  PL$12/*strict*/ = PL$179/*previousStrict*/;
  return PL$175/*node*/["finishFunctionExpression"](PL$35/*id*/, PL$123/*params*/, PL$124/*defaults*/, PL$94/*body*/);
  ;};
function PL$221/*parseSourceElement*/(){

  ;
  if((PL$17/*lookahead*/["type"] === PL$3/*Token*/["Keyword"])){
    switch (PL$17/*lookahead*/["value"]){
      case "const":
        
      case "let":
        
        return PL$226/*parseConstLetDeclaration*/(PL$17/*lookahead*/["value"]);
      case "function":
        
        return PL$250/*parseFunctionDeclaration*/();
      default:
        
        return PL$230/*parseStatement*/();
      
    };
  };
  if((PL$17/*lookahead*/["type"] !== PL$3/*Token*/["EOF"])){
    return PL$230/*parseStatement*/();
  };
  ;};
function PL$261/*parseSourceElements*/(){

  ;
  var PL$251/*sourceElement*/;
  ;
  var PL$252/*sourceElements*/ = [
    
  ];
  ;
  var PL$101/*token*/;
  ;
  var PL$253/*directive*/;
  ;
  var PL$254/*firstRestricted*/;
  ;
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$101/*token*/ = PL$17/*lookahead*/;
    if((PL$101/*token*/["type"] !== PL$3/*Token*/["StringLiteral"])){
      break;;
    };
    PL$251/*sourceElement*/ = PL$221/*parseSourceElement*/();
    PL$252/*sourceElements*/["push"](PL$251/*sourceElement*/);
    if((PL$251/*sourceElement*/["expression"]["type"] !== PL$6/*Syntax*/["Literal"])){
      break;;
    };
    PL$253/*directive*/ = PL$11/*source*/["slice"]((PL$101/*token*/["start"] + 1), (PL$101/*token*/["end"] - 1));
    if((PL$253/*directive*/ === "use strict")){
      PL$12/*strict*/ = true;
      if(PL$254/*firstRestricted*/){
        PL$96/*throwErrorTolerant*/(PL$254/*firstRestricted*/, PL$9/*Messages*/["StrictOctalLiteral"]);
      };
    }else{
    if((! PL$254/*firstRestricted*/ && PL$101/*token*/["octal"])){
      PL$254/*firstRestricted*/ = PL$101/*token*/;
    };
    };}};
  while((PL$13/*index*/ < PL$16/*length*/)){
  {
    PL$251/*sourceElement*/ = PL$221/*parseSourceElement*/();
    if((typeof PL$251/*sourceElement*/ === "undefined")){
      break;;
    };
    PL$252/*sourceElements*/["push"](PL$251/*sourceElement*/);}};
  return PL$252/*sourceElements*/;
  ;};
function PL$262/*parseProgram*/(){

  ;
  var PL$94/*body*/;
  ;
  var PL$175/*node*/;
  ;
  PL$50/*skipComment*/();
  PL$110/*peek*/();
  PL$175/*node*/ = new PL$116/*Node*/();
  PL$12/*strict*/ = false;
  PL$94/*body*/ = PL$261/*parseSourceElements*/();
  return PL$175/*node*/["finishProgram"](PL$94/*body*/);
  ;};
function PL$263/*filterTokenLocation*/(){

  ;
  var PL$53/*i*/;
  ;
  var PL$108/*entry*/;
  ;
  var PL$101/*token*/;
  ;
  var PL$264/*tokens*/ = [
    
  ];
  ;
  for(PL$53/*i*/ = 0;(PL$53/*i*/ < PL$19/*extra*/["tokens"]["length"]);++PL$53/*i*/){{
    PL$108/*entry*/ = PL$19/*extra*/["tokens"][PL$53/*i*/];
    PL$101/*token*/ = {
      "type": PL$108/*entry*/["type"],
      "value": PL$108/*entry*/["value"]
    };
    if(PL$108/*entry*/["regex"]){
      PL$101/*token*/["regex"] = {
        "pattern": PL$108/*entry*/["regex"]["pattern"],
        "flags": PL$108/*entry*/["regex"]["flags"]
      };
    };
    if(PL$19/*extra*/["range"]){
      PL$101/*token*/["range"] = PL$108/*entry*/["range"];
    };
    if(PL$19/*extra*/["loc"]){
      PL$101/*token*/["loc"] = PL$108/*entry*/["loc"];
    };
    PL$264/*tokens*/["push"](PL$101/*token*/);}};
  PL$19/*extra*/["tokens"] = PL$264/*tokens*/;
  ;};
function PL$265/*tokenize*/(PL$55/*code*/, PL$213/*options*/){

  ;
  var PL$186/*toString*/;
  ;
  var PL$264/*tokens*/;
  ;
  PL$186/*toString*/ = PL$32/*String*/;
  if(((typeof PL$55/*code*/ !== "string") && ! (PL$55/*code*/ instanceof PL$32/*String*/))){
    PL$55/*code*/ = PL$186/*toString*/(PL$55/*code*/);
  };
  PL$11/*source*/ = PL$55/*code*/;
  PL$13/*index*/ = 0;
  PL$14/*lineNumber*/ = ((PL$11/*source*/["length"] > 0) ? 1 : 0);
  PL$15/*lineStart*/ = 0;
  PL$16/*length*/ = PL$11/*source*/["length"];
  PL$17/*lookahead*/ = null;
  PL$18/*state*/ = {
    "allowIn": true,
    "labelSet": {
      
    },
    "inFunctionBody": false,
    "inIteration": false,
    "inSwitch": false,
    "lastCommentStart": - 1
  };
  PL$19/*extra*/ = {
    
  };
  PL$213/*options*/ = (PL$213/*options*/ || {
    
  });
  PL$213/*options*/["tokens"] = true;
  PL$19/*extra*/["tokens"] = [
    
  ];
  PL$19/*extra*/["tokenize"] = true;
  PL$19/*extra*/["openParenToken"] = - 1;
  PL$19/*extra*/["openCurlyToken"] = - 1;
  PL$19/*extra*/["range"] = ((typeof PL$213/*options*/["range"] === "boolean") && PL$213/*options*/["range"]);
  PL$19/*extra*/["loc"] = ((typeof PL$213/*options*/["loc"] === "boolean") && PL$213/*options*/["loc"]);
  if(((typeof PL$213/*options*/["comment"] === "boolean") && PL$213/*options*/["comment"])){
    PL$19/*extra*/["comments"] = [
      
    ];
  };
  if(((typeof PL$213/*options*/["tolerant"] === "boolean") && PL$213/*options*/["tolerant"])){
    PL$19/*extra*/["errors"] = [
      
    ];
  };
  try
  {
    PL$110/*peek*/();
    if((PL$17/*lookahead*/["type"] === PL$3/*Token*/["EOF"])){
      return PL$19/*extra*/["tokens"];
    };
    PL$109/*lex*/();
    while((PL$17/*lookahead*/["type"] !== PL$3/*Token*/["EOF"])){
    {
      try
      {
        PL$109/*lex*/();}catch(PL$266/*lexError*/){
        if(PL$19/*extra*/["errors"]){
          PL$19/*extra*/["errors"]["push"](PL$266/*lexError*/);
          break;;
        }else{
        throw PL$266/*lexError*/;
        };};}};
    PL$263/*filterTokenLocation*/();
    PL$264/*tokens*/ = PL$19/*extra*/["tokens"];
    if((typeof PL$19/*extra*/["comments"] !== "undefined")){
      PL$264/*tokens*/["comments"] = PL$19/*extra*/["comments"];
    };
    if((typeof PL$19/*extra*/["errors"] !== "undefined")){
      PL$264/*tokens*/["errors"] = PL$19/*extra*/["errors"];
    };}catch(PL$89/*e*/){
    throw PL$89/*e*/;};
  return PL$264/*tokens*/;
  ;};
function PL$267/*parse*/(PL$55/*code*/, PL$213/*options*/){

  ;
  var PL$268/*program*/;
  ;
  var PL$186/*toString*/;
  ;
  PL$186/*toString*/ = PL$32/*String*/;
  if(((typeof PL$55/*code*/ !== "string") && ! (PL$55/*code*/ instanceof PL$32/*String*/))){
    PL$55/*code*/ = PL$186/*toString*/(PL$55/*code*/);
  };
  PL$11/*source*/ = PL$55/*code*/;
  PL$13/*index*/ = 0;
  PL$14/*lineNumber*/ = ((PL$11/*source*/["length"] > 0) ? 1 : 0);
  PL$15/*lineStart*/ = 0;
  PL$16/*length*/ = PL$11/*source*/["length"];
  PL$17/*lookahead*/ = null;
  PL$18/*state*/ = {
    "allowIn": true,
    "labelSet": {
      
    },
    "parenthesisCount": 0,
    "inFunctionBody": false,
    "inIteration": false,
    "inSwitch": false,
    "lastCommentStart": - 1
  };
  PL$19/*extra*/ = {
    
  };
  if((typeof PL$213/*options*/ !== "undefined")){
    PL$19/*extra*/["range"] = ((typeof PL$213/*options*/["range"] === "boolean") && PL$213/*options*/["range"]);
    PL$19/*extra*/["loc"] = ((typeof PL$213/*options*/["loc"] === "boolean") && PL$213/*options*/["loc"]);
    PL$19/*extra*/["attachComment"] = ((typeof PL$213/*options*/["attachComment"] === "boolean") && PL$213/*options*/["attachComment"]);
    if(((PL$19/*extra*/["loc"] && (PL$213/*options*/["source"] !== null)) && (PL$213/*options*/["source"] !== undefined))){
      PL$19/*extra*/["source"] = PL$186/*toString*/(PL$213/*options*/["source"]);
    };
    if(((typeof PL$213/*options*/["tokens"] === "boolean") && PL$213/*options*/["tokens"])){
      PL$19/*extra*/["tokens"] = [
        
      ];
    };
    if(((typeof PL$213/*options*/["comment"] === "boolean") && PL$213/*options*/["comment"])){
      PL$19/*extra*/["comments"] = [
        
      ];
    };
    if(((typeof PL$213/*options*/["tolerant"] === "boolean") && PL$213/*options*/["tolerant"])){
      PL$19/*extra*/["errors"] = [
        
      ];
    };
    if(PL$19/*extra*/["attachComment"]){
      PL$19/*extra*/["range"] = true;
      PL$19/*extra*/["comments"] = [
        
      ];
      PL$19/*extra*/["bottomRightStack"] = [
        
      ];
      PL$19/*extra*/["trailingComments"] = [
        
      ];
      PL$19/*extra*/["leadingComments"] = [
        
      ];
    };
  };
  try
  {
    PL$268/*program*/ = PL$262/*parseProgram*/();
    if((typeof PL$19/*extra*/["comments"] !== "undefined")){
      PL$268/*program*/["comments"] = PL$19/*extra*/["comments"];
    };
    if((typeof PL$19/*extra*/["tokens"] !== "undefined")){
      PL$263/*filterTokenLocation*/();
      PL$268/*program*/["tokens"] = PL$19/*extra*/["tokens"];
    };
    if((typeof PL$19/*extra*/["errors"] !== "undefined")){
      PL$268/*program*/["errors"] = PL$19/*extra*/["errors"];
    };}catch(PL$89/*e*/){
    throw PL$89/*e*/;};
  return PL$268/*program*/;
  ;};

  ;
  var PL$2/*exports*/ = {
    
  };
  ;
  var PL$3/*Token*/;
  ;
  var PL$4/*TokenName*/;
  ;
  var PL$5/*FnExprTokens*/;
  ;
  var PL$6/*Syntax*/;
  ;
  var PL$7/*PlaceHolders*/;
  ;
  var PL$8/*PropertyKind*/;
  ;
  var PL$9/*Messages*/;
  ;
  var PL$10/*Regex*/;
  ;
  var PL$11/*source*/;
  ;
  var PL$12/*strict*/;
  ;
  var PL$13/*index*/;
  ;
  var PL$14/*lineNumber*/;
  ;
  var PL$15/*lineStart*/;
  ;
  var PL$16/*length*/;
  ;
  var PL$17/*lookahead*/;
  ;
  var PL$18/*state*/;
  ;
  var PL$19/*extra*/;
  ;
  PL$3/*Token*/ = {
    "BooleanLiteral": 1,
    "EOF": 2,
    "Identifier": 3,
    "Keyword": 4,
    "NullLiteral": 5,
    "NumericLiteral": 6,
    "Punctuator": 7,
    "StringLiteral": 8,
    "RegularExpression": 9
  };
  PL$4/*TokenName*/ = {
    
  };
  PL$4/*TokenName*/[PL$3/*Token*/["BooleanLiteral"]] = "Boolean";
  PL$4/*TokenName*/[PL$3/*Token*/["EOF"]] = "<end>";
  PL$4/*TokenName*/[PL$3/*Token*/["Identifier"]] = "Identifier";
  PL$4/*TokenName*/[PL$3/*Token*/["Keyword"]] = "Keyword";
  PL$4/*TokenName*/[PL$3/*Token*/["NullLiteral"]] = "Null";
  PL$4/*TokenName*/[PL$3/*Token*/["NumericLiteral"]] = "Numeric";
  PL$4/*TokenName*/[PL$3/*Token*/["Punctuator"]] = "Punctuator";
  PL$4/*TokenName*/[PL$3/*Token*/["StringLiteral"]] = "String";
  PL$4/*TokenName*/[PL$3/*Token*/["RegularExpression"]] = "RegularExpression";
  PL$5/*FnExprTokens*/ = [
    "(", 
    "{", 
    "[", 
    "in", 
    "typeof", 
    "instanceof", 
    "new", 
    "return", 
    "case", 
    "delete", 
    "throw", 
    "void", 
    "=", 
    "+=", 
    "-=", 
    "*=", 
    "/=", 
    "%=", 
    "<<=", 
    ">>=", 
    ">>>=", 
    "&=", 
    "|=", 
    "^=", 
    ",", 
    "+", 
    "-", 
    "*", 
    "/", 
    "%", 
    "++", 
    "--", 
    "<<", 
    ">>", 
    ">>>", 
    "&", 
    "|", 
    "^", 
    "!", 
    "~", 
    "&&", 
    "||", 
    "?", 
    ":", 
    "===", 
    "==", 
    ">=", 
    "<=", 
    "<", 
    ">", 
    "!=", 
    "!=="
  ];
  PL$6/*Syntax*/ = {
    "AssignmentExpression": "AssignmentExpression",
    "ArrayExpression": "ArrayExpression",
    "ArrowFunctionExpression": "ArrowFunctionExpression",
    "BlockStatement": "BlockStatement",
    "BinaryExpression": "BinaryExpression",
    "BreakStatement": "BreakStatement",
    "CallExpression": "CallExpression",
    "CatchClause": "CatchClause",
    "ConditionalExpression": "ConditionalExpression",
    "ContinueStatement": "ContinueStatement",
    "DoWhileStatement": "DoWhileStatement",
    "DebuggerStatement": "DebuggerStatement",
    "EmptyStatement": "EmptyStatement",
    "ExpressionStatement": "ExpressionStatement",
    "ForStatement": "ForStatement",
    "ForInStatement": "ForInStatement",
    "FunctionDeclaration": "FunctionDeclaration",
    "FunctionExpression": "FunctionExpression",
    "Identifier": "Identifier",
    "IfStatement": "IfStatement",
    "Literal": "Literal",
    "LabeledStatement": "LabeledStatement",
    "LogicalExpression": "LogicalExpression",
    "MemberExpression": "MemberExpression",
    "NewExpression": "NewExpression",
    "ObjectExpression": "ObjectExpression",
    "Program": "Program",
    "Property": "Property",
    "ReturnStatement": "ReturnStatement",
    "SequenceExpression": "SequenceExpression",
    "SwitchStatement": "SwitchStatement",
    "SwitchCase": "SwitchCase",
    "ThisExpression": "ThisExpression",
    "ThrowStatement": "ThrowStatement",
    "TryStatement": "TryStatement",
    "UnaryExpression": "UnaryExpression",
    "UpdateExpression": "UpdateExpression",
    "VariableDeclaration": "VariableDeclaration",
    "VariableDeclarator": "VariableDeclarator",
    "WhileStatement": "WhileStatement",
    "WithStatement": "WithStatement"
  };
  PL$7/*PlaceHolders*/ = {
    "ArrowParameterPlaceHolder": {
      "type": "ArrowParameterPlaceHolder"
    }
  };
  PL$8/*PropertyKind*/ = {
    "Data": 1,
    "Get": 2,
    "Set": 4
  };
  PL$9/*Messages*/ = {
    "UnexpectedToken": "Unexpected token %0",
    "UnexpectedNumber": "Unexpected number",
    "UnexpectedString": "Unexpected string",
    "UnexpectedIdentifier": "Unexpected identifier",
    "UnexpectedReserved": "Unexpected reserved word",
    "UnexpectedEOS": "Unexpected end of input",
    "NewlineAfterThrow": "Illegal newline after throw",
    "InvalidRegExp": "Invalid regular expression",
    "UnterminatedRegExp": "Invalid regular expression: missing /",
    "InvalidLHSInAssignment": "Invalid left-hand side in assignment",
    "InvalidLHSInForIn": "Invalid left-hand side in for-in",
    "MultipleDefaultsInSwitch": "More than one default clause in switch statement",
    "NoCatchOrFinally": "Missing catch or finally after try",
    "UnknownLabel": "Undefined label '%0'",
    "Redeclaration": "%0 '%1' has already been declared",
    "IllegalContinue": "Illegal continue statement",
    "IllegalBreak": "Illegal break statement",
    "IllegalReturn": "Illegal return statement",
    "StrictModeWith": "Strict mode code may not include a with statement",
    "StrictCatchVariable": "Catch variable may not be eval or arguments in strict mode",
    "StrictVarName": "Variable name may not be eval or arguments in strict mode",
    "StrictParamName": "Parameter name eval or arguments is not allowed in strict mode",
    "StrictParamDupe": "Strict mode function may not have duplicate parameter names",
    "StrictFunctionName": "Function name may not be eval or arguments in strict mode",
    "StrictOctalLiteral": "Octal literals are not allowed in strict mode.",
    "StrictDelete": "Delete of an unqualified identifier in strict mode.",
    "StrictDuplicateProperty": "Duplicate data property in object literal not allowed in strict mode",
    "AccessorDataProperty": "Object literal may not have data and accessor property with the same name",
    "AccessorGetSet": "Object literal may not have multiple get/set accessors with the same name",
    "StrictLHSAssignment": "Assignment to eval or arguments is not allowed in strict mode",
    "StrictLHSPostfix": "Postfix increment/decrement may not have eval or arguments operand in strict mode",
    "StrictLHSPrefix": "Prefix increment/decrement may not have eval or arguments operand in strict mode",
    "StrictReservedWord": "Use of future reserved word in strict mode"
  };
  PL$10/*Regex*/ = {
    "NonAsciiIdentifierStart": new PL$20/*RegExp*/("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),
    "NonAsciiIdentifierPart": new PL$20/*RegExp*/("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԯԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠ-ࢲࣤ-ॣ०-९ॱ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఀ-ఃఅ-ఌఎ-ఐఒ-నప-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಁ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲഁ-ഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟ෦-෯ෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤞᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧ᪰-᪽ᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶ᳸᳹ᴀ-᷵᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚝꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꧠ-ꧾꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︭︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")
  };
  /* function assert (){} - hoisted */;
  /* function isDecimalDigit (){} - hoisted */;
  /* function isHexDigit (){} - hoisted */;
  /* function isOctalDigit (){} - hoisted */;
  /* function isWhiteSpace (){} - hoisted */;
  /* function isLineTerminator (){} - hoisted */;
  /* function isIdentifierStart (){} - hoisted */;
  /* function isIdentifierPart (){} - hoisted */;
  /* function isFutureReservedWord (){} - hoisted */;
  /* function isStrictModeReservedWord (){} - hoisted */;
  /* function isRestrictedWord (){} - hoisted */;
  /* function isKeyword (){} - hoisted */;
  /* function addComment (){} - hoisted */;
  /* function skipSingleLineComment (){} - hoisted */;
  /* function skipMultiLineComment (){} - hoisted */;
  /* function skipComment (){} - hoisted */;
  /* function scanHexEscape (){} - hoisted */;
  /* function scanUnicodeCodePointEscape (){} - hoisted */;
  /* function getEscapedIdentifier (){} - hoisted */;
  /* function getIdentifier (){} - hoisted */;
  /* function scanIdentifier (){} - hoisted */;
  /* function scanPunctuator (){} - hoisted */;
  /* function scanHexLiteral (){} - hoisted */;
  /* function scanOctalLiteral (){} - hoisted */;
  /* function scanNumericLiteral (){} - hoisted */;
  /* function scanStringLiteral (){} - hoisted */;
  /* function testRegExp (){} - hoisted */;
  /* function scanRegExpBody (){} - hoisted */;
  /* function scanRegExpFlags (){} - hoisted */;
  /* function scanRegExp (){} - hoisted */;
  /* function collectRegex (){} - hoisted */;
  /* function isIdentifierName (){} - hoisted */;
  /* function advanceSlash (){} - hoisted */;
  /* function advance (){} - hoisted */;
  /* function collectToken (){} - hoisted */;
  /* function lex (){} - hoisted */;
  /* function peek (){} - hoisted */;
  /* function Position (){} - hoisted */;
  /* function SourceLocation (){} - hoisted */;
  /* function WrappingSourceLocation (){} - hoisted */;
  /* function Node (){} - hoisted */;
  /* function WrappingNode (){} - hoisted */;
  PL$117/*WrappingNode*/["prototype"] = PL$116/*Node*/["prototype"] = {
    "processComment": (function(){
    
      ;
      var PL$118/*lastChild*/;
      ;
      var PL$119/*trailingComments*/;
      ;
      var PL$120/*bottomRight*/ = PL$19/*extra*/["bottomRightStack"];
      ;
      var PL$121/*last*/ = PL$120/*bottomRight*/[(PL$120/*bottomRight*/["length"] - 1)];
      ;
      if((this["type"] === PL$6/*Syntax*/["Program"])){
        if((this["body"]["length"] > 0)){
          return;
        };
      };
      if((PL$19/*extra*/["trailingComments"]["length"] > 0)){
        if((PL$19/*extra*/["trailingComments"][0]["range"][0] >= this["range"][1])){
          PL$119/*trailingComments*/ = PL$19/*extra*/["trailingComments"];
          PL$19/*extra*/["trailingComments"] = [
            
          ];
        }else{
        PL$19/*extra*/["trailingComments"]["length"] = 0;
        };
      }else{
      if(((PL$121/*last*/ && PL$121/*last*/["trailingComments"]) && (PL$121/*last*/["trailingComments"][0]["range"][0] >= this["range"][1]))){
        PL$119/*trailingComments*/ = PL$121/*last*/["trailingComments"];
        delete PL$121/*last*/["trailingComments"];
      };
      };
      if(PL$121/*last*/){
        while((PL$121/*last*/ && (PL$121/*last*/["range"][0] >= this["range"][0]))){
        {
          PL$118/*lastChild*/ = PL$121/*last*/;
          PL$121/*last*/ = PL$120/*bottomRight*/["pop"]();}};
      };
      if(PL$118/*lastChild*/){
        if((PL$118/*lastChild*/["leadingComments"] && (PL$118/*lastChild*/["leadingComments"][(PL$118/*lastChild*/["leadingComments"]["length"] - 1)]["range"][1] <= this["range"][0]))){
          this["leadingComments"] = PL$118/*lastChild*/["leadingComments"];
          PL$118/*lastChild*/["leadingComments"] = undefined;
        };
      }else{
      if(((PL$19/*extra*/["leadingComments"]["length"] > 0) && (PL$19/*extra*/["leadingComments"][(PL$19/*extra*/["leadingComments"]["length"] - 1)]["range"][1] <= this["range"][0]))){
        this["leadingComments"] = PL$19/*extra*/["leadingComments"];
        PL$19/*extra*/["leadingComments"] = [
          
        ];
      };
      };
      if(PL$119/*trailingComments*/){
        this["trailingComments"] = PL$119/*trailingComments*/;
      };
      PL$120/*bottomRight*/["push"](this);
      ;}),
    "finish": (function(){
    
      ;
      if(PL$19/*extra*/["range"]){
        this["range"][1] = PL$13/*index*/;
      };
      if(PL$19/*extra*/["loc"]){
        this["loc"]["end"] = new PL$112/*Position*/();
        if(PL$19/*extra*/["source"]){
          this["loc"]["source"] = PL$19/*extra*/["source"];
        };
      };
      if(PL$19/*extra*/["attachComment"]){
        this["processComment"]();
      };
      ;}),
    "finishArrayExpression": (function(PL$122/*elements*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ArrayExpression"];
      this["elements"] = PL$122/*elements*/;
      this["finish"]();
      return this;
      ;}),
    "finishArrowFunctionExpression": (function(PL$123/*params*/, PL$124/*defaults*/, PL$94/*body*/, PL$125/*expression*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ArrowFunctionExpression"];
      this["id"] = null;
      this["params"] = PL$123/*params*/;
      this["defaults"] = PL$124/*defaults*/;
      this["body"] = PL$94/*body*/;
      this["rest"] = null;
      this["generator"] = false;
      this["expression"] = PL$125/*expression*/;
      this["finish"]();
      return this;
      ;}),
    "finishAssignmentExpression": (function(PL$126/*operator*/, PL$127/*left*/, PL$128/*right*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["AssignmentExpression"];
      this["operator"] = PL$126/*operator*/;
      this["left"] = PL$127/*left*/;
      this["right"] = PL$128/*right*/;
      this["finish"]();
      return this;
      ;}),
    "finishBinaryExpression": (function(PL$126/*operator*/, PL$127/*left*/, PL$128/*right*/){
    
      ;
      this["type"] = (((PL$126/*operator*/ === "||") || (PL$126/*operator*/ === "&&")) ? PL$6/*Syntax*/["LogicalExpression"] : PL$6/*Syntax*/["BinaryExpression"]);
      this["operator"] = PL$126/*operator*/;
      this["left"] = PL$127/*left*/;
      this["right"] = PL$128/*right*/;
      this["finish"]();
      return this;
      ;}),
    "finishBlockStatement": (function(PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["BlockStatement"];
      this["body"] = PL$94/*body*/;
      this["finish"]();
      return this;
      ;}),
    "finishBreakStatement": (function(PL$129/*label*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["BreakStatement"];
      this["label"] = PL$129/*label*/;
      this["finish"]();
      return this;
      ;}),
    "finishCallExpression": (function(PL$130/*callee*/, PL$131/*args*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["CallExpression"];
      this["callee"] = PL$130/*callee*/;
      this["arguments"] = PL$131/*args*/;
      this["finish"]();
      return this;
      ;}),
    "finishCatchClause": (function(PL$132/*param*/, PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["CatchClause"];
      this["param"] = PL$132/*param*/;
      this["body"] = PL$94/*body*/;
      this["finish"]();
      return this;
      ;}),
    "finishConditionalExpression": (function(PL$133/*test*/, PL$134/*consequent*/, PL$135/*alternate*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ConditionalExpression"];
      this["test"] = PL$133/*test*/;
      this["consequent"] = PL$134/*consequent*/;
      this["alternate"] = PL$135/*alternate*/;
      this["finish"]();
      return this;
      ;}),
    "finishContinueStatement": (function(PL$129/*label*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ContinueStatement"];
      this["label"] = PL$129/*label*/;
      this["finish"]();
      return this;
      ;}),
    "finishDebuggerStatement": (function(){
    
      ;
      this["type"] = PL$6/*Syntax*/["DebuggerStatement"];
      this["finish"]();
      return this;
      ;}),
    "finishDoWhileStatement": (function(PL$94/*body*/, PL$133/*test*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["DoWhileStatement"];
      this["body"] = PL$94/*body*/;
      this["test"] = PL$133/*test*/;
      this["finish"]();
      return this;
      ;}),
    "finishEmptyStatement": (function(){
    
      ;
      this["type"] = PL$6/*Syntax*/["EmptyStatement"];
      this["finish"]();
      return this;
      ;}),
    "finishExpressionStatement": (function(PL$125/*expression*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ExpressionStatement"];
      this["expression"] = PL$125/*expression*/;
      this["finish"]();
      return this;
      ;}),
    "finishForStatement": (function(PL$136/*init*/, PL$133/*test*/, PL$137/*update*/, PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ForStatement"];
      this["init"] = PL$136/*init*/;
      this["test"] = PL$133/*test*/;
      this["update"] = PL$137/*update*/;
      this["body"] = PL$94/*body*/;
      this["finish"]();
      return this;
      ;}),
    "finishForInStatement": (function(PL$127/*left*/, PL$128/*right*/, PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ForInStatement"];
      this["left"] = PL$127/*left*/;
      this["right"] = PL$128/*right*/;
      this["body"] = PL$94/*body*/;
      this["each"] = false;
      this["finish"]();
      return this;
      ;}),
    "finishFunctionDeclaration": (function(PL$35/*id*/, PL$123/*params*/, PL$124/*defaults*/, PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["FunctionDeclaration"];
      this["id"] = PL$35/*id*/;
      this["params"] = PL$123/*params*/;
      this["defaults"] = PL$124/*defaults*/;
      this["body"] = PL$94/*body*/;
      this["rest"] = null;
      this["generator"] = false;
      this["expression"] = false;
      this["finish"]();
      return this;
      ;}),
    "finishFunctionExpression": (function(PL$35/*id*/, PL$123/*params*/, PL$124/*defaults*/, PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["FunctionExpression"];
      this["id"] = PL$35/*id*/;
      this["params"] = PL$123/*params*/;
      this["defaults"] = PL$124/*defaults*/;
      this["body"] = PL$94/*body*/;
      this["rest"] = null;
      this["generator"] = false;
      this["expression"] = false;
      this["finish"]();
      return this;
      ;}),
    "finishIdentifier": (function(PL$138/*name*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["Identifier"];
      this["name"] = PL$138/*name*/;
      this["finish"]();
      return this;
      ;}),
    "finishIfStatement": (function(PL$133/*test*/, PL$134/*consequent*/, PL$135/*alternate*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["IfStatement"];
      this["test"] = PL$133/*test*/;
      this["consequent"] = PL$134/*consequent*/;
      this["alternate"] = PL$135/*alternate*/;
      this["finish"]();
      return this;
      ;}),
    "finishLabeledStatement": (function(PL$129/*label*/, PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["LabeledStatement"];
      this["label"] = PL$129/*label*/;
      this["body"] = PL$94/*body*/;
      this["finish"]();
      return this;
      ;}),
    "finishLiteral": (function(PL$101/*token*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["Literal"];
      this["value"] = PL$101/*token*/["value"];
      this["raw"] = PL$11/*source*/["slice"](PL$101/*token*/["start"], PL$101/*token*/["end"]);
      if(PL$101/*token*/["regex"]){
        this["regex"] = PL$101/*token*/["regex"];
      };
      this["finish"]();
      return this;
      ;}),
    "finishMemberExpression": (function(PL$139/*accessor*/, PL$140/*object*/, PL$141/*property*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["MemberExpression"];
      this["computed"] = (PL$139/*accessor*/ === "[");
      this["object"] = PL$140/*object*/;
      this["property"] = PL$141/*property*/;
      this["finish"]();
      return this;
      ;}),
    "finishNewExpression": (function(PL$130/*callee*/, PL$131/*args*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["NewExpression"];
      this["callee"] = PL$130/*callee*/;
      this["arguments"] = PL$131/*args*/;
      this["finish"]();
      return this;
      ;}),
    "finishObjectExpression": (function(PL$142/*properties*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ObjectExpression"];
      this["properties"] = PL$142/*properties*/;
      this["finish"]();
      return this;
      ;}),
    "finishPostfixExpression": (function(PL$126/*operator*/, PL$143/*argument*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["UpdateExpression"];
      this["operator"] = PL$126/*operator*/;
      this["argument"] = PL$143/*argument*/;
      this["prefix"] = false;
      this["finish"]();
      return this;
      ;}),
    "finishProgram": (function(PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["Program"];
      this["body"] = PL$94/*body*/;
      this["finish"]();
      return this;
      ;}),
    "finishProperty": (function(PL$144/*kind*/, PL$145/*key*/, PL$41/*value*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["Property"];
      this["key"] = PL$145/*key*/;
      this["value"] = PL$41/*value*/;
      this["kind"] = PL$144/*kind*/;
      this["finish"]();
      return this;
      ;}),
    "finishReturnStatement": (function(PL$143/*argument*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ReturnStatement"];
      this["argument"] = PL$143/*argument*/;
      this["finish"]();
      return this;
      ;}),
    "finishSequenceExpression": (function(PL$146/*expressions*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["SequenceExpression"];
      this["expressions"] = PL$146/*expressions*/;
      this["finish"]();
      return this;
      ;}),
    "finishSwitchCase": (function(PL$133/*test*/, PL$134/*consequent*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["SwitchCase"];
      this["test"] = PL$133/*test*/;
      this["consequent"] = PL$134/*consequent*/;
      this["finish"]();
      return this;
      ;}),
    "finishSwitchStatement": (function(PL$147/*discriminant*/, PL$148/*cases*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["SwitchStatement"];
      this["discriminant"] = PL$147/*discriminant*/;
      this["cases"] = PL$148/*cases*/;
      this["finish"]();
      return this;
      ;}),
    "finishThisExpression": (function(){
    
      ;
      this["type"] = PL$6/*Syntax*/["ThisExpression"];
      this["finish"]();
      return this;
      ;}),
    "finishThrowStatement": (function(PL$143/*argument*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["ThrowStatement"];
      this["argument"] = PL$143/*argument*/;
      this["finish"]();
      return this;
      ;}),
    "finishTryStatement": (function(PL$149/*block*/, PL$150/*guardedHandlers*/, PL$151/*handlers*/, PL$152/*finalizer*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["TryStatement"];
      this["block"] = PL$149/*block*/;
      this["guardedHandlers"] = PL$150/*guardedHandlers*/;
      this["handlers"] = PL$151/*handlers*/;
      this["finalizer"] = PL$152/*finalizer*/;
      this["finish"]();
      return this;
      ;}),
    "finishUnaryExpression": (function(PL$126/*operator*/, PL$143/*argument*/){
    
      ;
      this["type"] = (((PL$126/*operator*/ === "++") || (PL$126/*operator*/ === "--")) ? PL$6/*Syntax*/["UpdateExpression"] : PL$6/*Syntax*/["UnaryExpression"]);
      this["operator"] = PL$126/*operator*/;
      this["argument"] = PL$143/*argument*/;
      this["prefix"] = true;
      this["finish"]();
      return this;
      ;}),
    "finishVariableDeclaration": (function(PL$153/*declarations*/, PL$144/*kind*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["VariableDeclaration"];
      this["declarations"] = PL$153/*declarations*/;
      this["kind"] = PL$144/*kind*/;
      this["finish"]();
      return this;
      ;}),
    "finishVariableDeclarator": (function(PL$35/*id*/, PL$136/*init*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["VariableDeclarator"];
      this["id"] = PL$35/*id*/;
      this["init"] = PL$136/*init*/;
      this["finish"]();
      return this;
      ;}),
    "finishWhileStatement": (function(PL$133/*test*/, PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["WhileStatement"];
      this["test"] = PL$133/*test*/;
      this["body"] = PL$94/*body*/;
      this["finish"]();
      return this;
      ;}),
    "finishWithStatement": (function(PL$140/*object*/, PL$94/*body*/){
    
      ;
      this["type"] = PL$6/*Syntax*/["WithStatement"];
      this["object"] = PL$140/*object*/;
      this["body"] = PL$94/*body*/;
      this["finish"]();
      return this;
      ;})
  };
  /* function peekLineTerminator (){} - hoisted */;
  /* function throwError (){} - hoisted */;
  /* function throwErrorTolerant (){} - hoisted */;
  /* function throwUnexpected (){} - hoisted */;
  /* function expect (){} - hoisted */;
  /* function expectTolerant (){} - hoisted */;
  /* function expectKeyword (){} - hoisted */;
  /* function match (){} - hoisted */;
  /* function matchKeyword (){} - hoisted */;
  /* function matchAssign (){} - hoisted */;
  /* function consumeSemicolon (){} - hoisted */;
  /* function isLeftHandSide (){} - hoisted */;
  /* function parseArrayInitialiser (){} - hoisted */;
  /* function parsePropertyFunction (){} - hoisted */;
  /* function parseObjectPropertyKey (){} - hoisted */;
  /* function parseObjectProperty (){} - hoisted */;
  /* function parseObjectInitialiser (){} - hoisted */;
  /* function parseGroupExpression (){} - hoisted */;
  /* function parsePrimaryExpression (){} - hoisted */;
  /* function parseArguments (){} - hoisted */;
  /* function parseNonComputedProperty (){} - hoisted */;
  /* function parseNonComputedMember (){} - hoisted */;
  /* function parseComputedMember (){} - hoisted */;
  /* function parseNewExpression (){} - hoisted */;
  /* function parseLeftHandSideExpressionAllowCall (){} - hoisted */;
  /* function parseLeftHandSideExpression (){} - hoisted */;
  /* function parsePostfixExpression (){} - hoisted */;
  /* function parseUnaryExpression (){} - hoisted */;
  /* function binaryPrecedence (){} - hoisted */;
  /* function parseBinaryExpression (){} - hoisted */;
  /* function parseConditionalExpression (){} - hoisted */;
  /* function parseConciseBody (){} - hoisted */;
  /* function reinterpretAsCoverFormalsList (){} - hoisted */;
  /* function parseArrowFunctionExpression (){} - hoisted */;
  /* function parseAssignmentExpression (){} - hoisted */;
  /* function parseExpression (){} - hoisted */;
  /* function parseStatementList (){} - hoisted */;
  /* function parseBlock (){} - hoisted */;
  /* function parseVariableIdentifier (){} - hoisted */;
  /* function parseVariableDeclaration (){} - hoisted */;
  /* function parseVariableDeclarationList (){} - hoisted */;
  /* function parseVariableStatement (){} - hoisted */;
  /* function parseConstLetDeclaration (){} - hoisted */;
  /* function parseEmptyStatement (){} - hoisted */;
  /* function parseExpressionStatement (){} - hoisted */;
  /* function parseIfStatement (){} - hoisted */;
  /* function parseDoWhileStatement (){} - hoisted */;
  /* function parseWhileStatement (){} - hoisted */;
  /* function parseForVariableDeclaration (){} - hoisted */;
  /* function parseForStatement (){} - hoisted */;
  /* function parseContinueStatement (){} - hoisted */;
  /* function parseBreakStatement (){} - hoisted */;
  /* function parseReturnStatement (){} - hoisted */;
  /* function parseWithStatement (){} - hoisted */;
  /* function parseSwitchCase (){} - hoisted */;
  /* function parseSwitchStatement (){} - hoisted */;
  /* function parseThrowStatement (){} - hoisted */;
  /* function parseCatchClause (){} - hoisted */;
  /* function parseTryStatement (){} - hoisted */;
  /* function parseDebuggerStatement (){} - hoisted */;
  /* function parseStatement (){} - hoisted */;
  /* function parseFunctionSourceElements (){} - hoisted */;
  /* function validateParam (){} - hoisted */;
  /* function parseParam (){} - hoisted */;
  /* function parseParams (){} - hoisted */;
  /* function parseFunctionDeclaration (){} - hoisted */;
  /* function parseFunctionExpression (){} - hoisted */;
  /* function parseSourceElement (){} - hoisted */;
  /* function parseSourceElements (){} - hoisted */;
  /* function parseProgram (){} - hoisted */;
  /* function filterTokenLocation (){} - hoisted */;
  /* function tokenize (){} - hoisted */;
  /* function parse (){} - hoisted */;
  PL$2/*exports*/["version"] = "2.0.0-dev";
  PL$2/*exports*/["tokenize"] = PL$265/*tokenize*/;
  PL$2/*exports*/["parse"] = PL$267/*parse*/;
  PL$2/*exports*/["Syntax"] = (function(){
  
    ;
    var PL$138/*name*/;
    ;
    var PL$269/*types*/ = {
      
    };
    ;
    if((typeof PL$187/*Object*/["create"] === "function")){
      PL$269/*types*/ = PL$187/*Object*/["create"](null);
    };
    for(PL$138/*name*/ in PL$6/*Syntax*/){
      if(PL$6/*Syntax*/["hasOwnProperty"](PL$138/*name*/)){
        PL$269/*types*/[PL$138/*name*/] = PL$6/*Syntax*/[PL$138/*name*/];
      };};
    if((typeof PL$187/*Object*/["freeze"] === "function")){
      PL$187/*Object*/["freeze"](PL$269/*types*/);
    };
    return PL$269/*types*/;
    ;})();
  return PL$2/*exports*/;
  ;})();
;return PL$1;
});
})();