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
CodeMirror.defineMode("diff", function() {

  var TOKEN_NAMES = {
    '+': 'positive',
    '-': 'negative',
    '@': 'meta'
  };

  return {
    token: function(stream) {
      var tw_pos = stream.string.search(/[\t ]+?$/);

      if (!stream.sol() || tw_pos === 0) {
        stream.skipToEnd();
        return ("error " + (
          TOKEN_NAMES[stream.string.charAt(0)] || '')).replace(/ $/, '');
      }

      var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();

      if (tw_pos === -1) {
        stream.skipToEnd();
      } else {
        stream.pos = tw_pos;
      }

      return token_name;
    }
  };
});

CodeMirror.defineMIME("text/x-diff", "diff");

  return CodeMirror;
});
