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
CodeMirror.defineOption("showTrailingSpace", false, function(cm, val, prev) {
  if (prev == CodeMirror.Init) prev = false;
  if (prev && !val)
    cm.removeOverlay("trailingspace");
  else if (!prev && val)
    cm.addOverlay({
      token: function(stream) {
        for (var l = stream.string.length, i = l; i && /\s/.test(stream.string.charAt(i - 1)); --i) {}
        if (i > stream.pos) { stream.pos = i; return null; }
        stream.pos = l;
        return "trailingspace";
      },
      name: "trailingspace"
    });
});

  return CodeMirror;
});
