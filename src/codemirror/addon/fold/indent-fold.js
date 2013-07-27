var helperDefine = function(parRequire, parFactory){
  if (typeof define == "function"){
    // amd part
    define(parRequire, parFactory);
  }else{
    // commonjs part
    var parAr = [];
    var i = 0;
    for (i = 0; i < parRequire.length; ++i){
      parAr.push(require(parRequire[i]));
    };
    module.exports = parFactory.apply(undefined, parAr);
  };
};
helperDefine(["codemirror/CodeMirror"], function(CodeMirror){
CodeMirror.registerHelper("fold", "indent", function(cm, start) {
  var tabSize = cm.getOption("tabSize"), firstLine = cm.getLine(start.line);
  var myIndent = CodeMirror.countColumn(firstLine, null, tabSize);
  for (var i = start.line + 1, end = cm.lineCount(); i < end; ++i) {
    var curLine = cm.getLine(i);
    if (CodeMirror.countColumn(curLine, null, tabSize) < myIndent &&
        CodeMirror.countColumn(cm.getLine(i-1), null, tabSize) > myIndent)
      return {from: CodeMirror.Pos(start.line, firstLine.length),
              to: CodeMirror.Pos(i, curLine.length)};
  }
});
CodeMirror.indentRangeFinder = CodeMirror.fold.indent; // deprecated

  return CodeMirror;
});
