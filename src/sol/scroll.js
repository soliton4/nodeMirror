define([
  "sol/wgt/Try"
  , "dojo/dom-construct"
], function(
  Try
  , domConstruct
){
  var scrolldim;
  
  var scroll = {
    dimensions: function(){
      if (!scrolldim){
        var wgt = Try({
        });
        wgt.placeAt(document.body);
        
        var reset = domConstruct.create("div", {
          style: {
            overflow: "visible"
            , position: "absolute"
          }
        });
        domConstruct.place(reset, wgt.containerNode);
        
        var outer = domConstruct.create("div", {
          style: {
            overflow: "scroll"
          }
        });
        domConstruct.place(outer, reset);
        
        var inner = domConstruct.create("div", {
          innerHTML: "test"
          , style: {
            overflow: "hidden"
          }
        });
        domConstruct.place(inner, outer);
        
        scrolldim = {
          w: outer.offsetWidth - inner.offsetWidth
          , h: outer.offsetHeight - inner.offsetHeight
        };
        
        wgt.destroy();
      };
      return {
        w: scrolldim.w
        , h: scrolldim.h
      };
    }
  };
  return scroll;
});