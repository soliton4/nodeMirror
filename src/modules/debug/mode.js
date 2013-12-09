define([
  "dojo/_base/declare"
  , "codemirror/CodeMirror"
], function(
  declare
  , CodeMirror
){

CodeMirror.defineMode("debugging", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var line = parserConfig.line;
  var col = parserConfig.col;
  var length = parserConfig.length;
  var exception = parserConfig.exception;
  
  if (!length){
    length  = 1;
  };
  
  
  // Interface

  return {
    startState: function(basecolumn) {
      return {
        line: 0
      };
    },
    
    token: function(stream, state) {
      if (state.ended){
        stream.skipToEnd();
        return;
      };
      if (state.left){
        while (state.left && !stream.eol()){
          stream.next();
          state.left--;
        };
        if (!state.left){
          state.ended = true;
        };
        if (exception){
          return "exception";
        };
        return "breakpoint";
      };
      if (state.line == line){
        var i;
        if (col > 0){
          if (stream.sol()){
            for (i = 0; i < col; ++i){
              stream.next();
            };
          };
        };
        state.left = length;
        return;
      };
      state.line++;
      stream.skipToEnd();
      return;
    }

  };
});

});