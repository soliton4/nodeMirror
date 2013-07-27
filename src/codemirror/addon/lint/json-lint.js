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
// Depends on jsonlint.js from https://github.com/zaach/jsonlint

CodeMirror.registerHelper("lint", "json", function(text) {
  var found = [];
  jsonlint.parseError = function(str, hash) {
    var loc = hash.loc;
    found.push({from: CodeMirror.Pos(loc.first_line - 1, loc.first_column),
                to: CodeMirror.Pos(loc.last_line - 1, loc.last_column),
                message: str});
  };
  try { jsonlint.parse(text); }
  catch(e) {}
  return found;
});
CodeMirror.jsonValidator = CodeMirror.lint.json; // deprecated

  return CodeMirror;
});
