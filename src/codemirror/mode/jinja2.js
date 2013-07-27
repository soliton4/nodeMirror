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
CodeMirror.defineMode("jinja2", function() {
    var keywords = ["block", "endblock", "for", "endfor", "in", "true", "false",
                    "loop", "none", "self", "super", "if", "as", "not", "and",
                    "else", "import", "with", "without", "context"];
    keywords = new RegExp("^((" + keywords.join(")|(") + "))\\b");

    function tokenBase (stream, state) {
        var ch = stream.next();
        if (ch == "{") {
            if (ch = stream.eat(/\{|%|#/)) {
                stream.eat("-");
                state.tokenize = inTag(ch);
                return "tag";
            }
        }
    }
    function inTag (close) {
        if (close == "{") {
            close = "}";
        }
        return function (stream, state) {
            var ch = stream.next();
            if ((ch == close || (ch == "-" && stream.eat(close)))
                && stream.eat("}")) {
                state.tokenize = tokenBase;
                return "tag";
            }
            if (stream.match(keywords)) {
                return "keyword";
            }
            return close == "#" ? "comment" : "string";
        };
    }
    return {
        startState: function () {
            return {tokenize: tokenBase};
        },
        token: function (stream, state) {
            return state.tokenize(stream, state);
        }
    };
});

  return CodeMirror;
});
