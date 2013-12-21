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
(function() {
  "use strict";

  CodeMirror.defineOption("foldGutter", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init) {
      cm.clearGutter(cm.state.foldGutter.options.gutter);
      cm.state.foldGutter = null;
      cm.off("gutterClick", onGutterClick);
      cm.off("change", onChange);
      cm.off("viewportChange", onViewportChange);
      cm.off("fold", onFold);
      cm.off("unfold", onFold);
      cm.off("swapDoc", updateInViewport);
    }
    if (val) {
      cm.state.foldGutter = new State(parseOptions(val));
      updateInViewport(cm);
      cm.on("gutterClick", onGutterClick);
      cm.on("change", onChange);
      cm.on("viewportChange", onViewportChange);
      cm.on("fold", onFold);
      cm.on("unfold", onFold);
      cm.on("swapDoc", updateInViewport);
    }
  });

  var Pos = CodeMirror.Pos;

  function State(options) {
    this.options = options;
    this.from = this.to = 0;
  }

  function parseOptions(opts) {
    if (opts === true) opts = {};
    if (opts.gutter == null) opts.gutter = "CodeMirror-foldgutter";
    if (opts.indicatorOpen == null) opts.indicatorOpen = "CodeMirror-foldgutter-open";
    if (opts.indicatorFolded == null) opts.indicatorFolded = "CodeMirror-foldgutter-folded";
    return opts;
  }

  function isFolded(cm, line) {
    var marks = cm.findMarksAt(Pos(line));
    for (var i = 0; i < marks.length; ++i)
      if (marks[i].__isFold && marks[i].find().from.line == line) return true;
  }

  function marker(spec) {
    if (typeof spec == "string") {
      var elt = document.createElement("div");
      elt.className = spec;
      return elt;
    } else {
      return spec.cloneNode(true);
    }
  }

  function updateFoldInfo(cm, from, to) {
    var opts = cm.state.foldGutter.options, cur = from;
    var floatInfo;
    if (opts["float"]){
      if (!cm.state.foldGutter["float"]){
        var node = document.createElement("div");
        node.style.position = "absolute";
        node.className = "codemirror-fold-floating";
        node.style.width = "100%";
        node.style.zIndex = "5";
        node.style.backgroundColor = window.getComputedStyle(cm.display.wrapper).backgroundColor;
        node.style.background = window.getComputedStyle(cm.display.wrapper).background;
        var scroller = cm.getScrollerElement();
        scroller.appendChild(node);

        cm.state.foldGutter["float"] = {
          lines: {},
          linesAr: [],
          node: node
        };

        cm.on("scroll", function(cm){
          var lines = cm.visibleLines();
          //console.log("from: " + lines.from + " to: " + lines.to);
          //var x = 1;
          var linesAr = cm.state.foldGutter["float"].linesAr;
          var i;
          var cnt = 0;
          for (i = 0; i < linesAr.length; ++i){
            //if (linesAr[i].cur > lines.from){
            //  break;
            //};
            if(linesAr[i].node){
              cm.state.foldGutter["float"].node.removeChild(linesAr[i].node);
              delete linesAr[i].node;
            };
            if ((linesAr[i].cur || 1) - cnt <= lines.from && linesAr[i].range.to.line > lines.from + cnt){
              if (!linesAr[i].node){
                var line = cm.getLineDom(linesAr[i].cur);
                linesAr[i].node = line.node;
                linesAr[i].dim = line.dim;
                linesAr[i].node.style.backgroundColor = window.getComputedStyle(cm.display.wrapper).backgroundColor;
                linesAr[i].node.style.background = window.getComputedStyle(cm.display.wrapper).background;
                //debugger;
                linesAr[i].node.style.marginLeft = line.dim.gutterTotalWidth;
              };
              cm.state.foldGutter["float"].node.appendChild(linesAr[i].node);
              ++cnt;
            };
          };
          var scroller = cm.getScrollerElement();
          cm.state.foldGutter["float"].node.style.top = scroller.scrollTop + "px";
        });
	  };
      floatInfo = cm.state.foldGutter["float"];
    };
    cm.eachLine(from, to, function(line) {
      var mark = null;
      var i;
      if (opts["float"]){
        if (floatInfo.lines[cur]){
          if (floatInfo.lines[cur].node){
            cm.state.foldGutter["float"].node.removeChild(floatInfo.lines[cur].node);
          };
          delete floatInfo.lines[cur];
          for (i = 0; i < floatInfo.linesAr.length; ++i){
            if (floatInfo.linesAr[i].cur > cur){
              break;
            };
            if (floatInfo.linesAr[i].cur == cur){
              floatInfo.linesAr.splice(i, 1);
              break;
            };
          }
        };
      };
      if (isFolded(cm, cur)) {
        mark = marker(opts.indicatorFolded);
      } else {
        var pos = Pos(cur, 0), func = opts.rangeFinder || CodeMirror.fold.auto;
        var range = func && func(cm, pos);
        if (range && range.from.line + 1 < range.to.line){
          mark = marker(opts.indicatorOpen);
          if (opts["float"]){
            var floatEntry = {
              cur: cur
              , range: range
            };
            floatInfo.lines[cur] = floatEntry;
            var inserted = false;
            for (i = 0; i < floatInfo.linesAr.length; ++i){
              if (floatInfo.linesAr[i].cur > cur){
                floatInfo.linesAr.splice(i, 0, floatEntry);
                inserted = true;
                break;
              };
            };
            if (!inserted){
              floatInfo.linesAr.push(floatEntry);
            };
          };
        };
      };
      cm.setGutterMarker(line, opts.gutter, mark);
      ++cur;
    });
  }
  
  function updateInViewport(cm) {
    var vp = cm.getViewport(), state = cm.state.foldGutter;
    if (!state) return;
    cm.operation(function() {
      updateFoldInfo(cm, vp.from, vp.to);
    });
    state.from = vp.from; state.to = vp.to;
  }

  function onGutterClick(cm, line, gutter) {
    var opts = cm.state.foldGutter.options;
    if (gutter != opts.gutter) return;
    cm.foldCode(Pos(line, 0), opts.rangeFinder);
  }

  function onChange(cm) {
    var state = cm.state.foldGutter, opts = cm.state.foldGutter.options;
    state.from = state.to = 0;
    clearTimeout(state.changeUpdate);
    state.changeUpdate = setTimeout(function() { updateInViewport(cm); }, opts.foldOnChangeTimeSpan || 600);
  }

  function onViewportChange(cm) {
    var state = cm.state.foldGutter, opts = cm.state.foldGutter.options;
    clearTimeout(state.changeUpdate);
    state.changeUpdate = setTimeout(function() {
      var vp = cm.getViewport();
      if (state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20) {
        updateInViewport(cm);
      } else {
        cm.operation(function() {
          if (vp.from < state.from) {
            updateFoldInfo(cm, vp.from, state.from);
            state.from = vp.from;
          }
          if (vp.to > state.to) {
            updateFoldInfo(cm, state.to, vp.to);
            state.to = vp.to;
          }
        });
      }
    }, opts.updateViewportTimeSpan || 400);
  }

  function onFold(cm, from) {
    var state = cm.state.foldGutter, line = from.line;
    if (line >= state.from && line < state.to)
      updateFoldInfo(cm, line, line + 1);
  }
})();

  return CodeMirror;
});
