define([
  "dojo/_base/declare"
  , "dgrid/OnDemandGrid"
  , "dojo/store/util/QueryResults"
  , "dojo/dom-construct"
  , "dgrid/extensions/DijitRegistry"
  , "dojo/_base/lang"
  , "dojo/_base/array"
  , "dojo/dom-class"
  , "dgrid/Keyboard"
  , "dojo/Deferred"
  , "dojo/dom-attr"
  , "sol/array/memberSort"
], function(
  declare
  , OnDemandGrid
  , QueryResults
  , domConstruct
  , DijitRegistry
  , lang
  , array
  , domClass
  , Keyboard
  , Deferred
  , domAttr
  , memberSort
){
  return declare([OnDemandGrid, Keyboard, DijitRegistry], {
    "class": "hexgrid"
    
    , showHeader: false
    , cellNavigation: false
    
    , cleanUpWidgets: []
    
    , isLeftToRight: function(){
      return true;
    }
    
    , _makeSaveLine: function(line){
      var newData = [];
      var len = 0;
      for(var i = 0; i < 16; ++i){
        //newData[i]
        var byteCode = "";
        byteCode += line.letters[i].letter[0].innerHTML;
        byteCode += line.letters[i].letter[1].innerHTML;
        if (byteCode == ".."){
          newData[i] = 0;
        }else{
          newData[i] = parseInt("0x" + byteCode.replace(".", "0"), 16);
          len = i + 1;
        };
      };
      if (len < 16){
        newData.splice(len, 16);
      };
      return {
        lineNr: line.lineNr
        , data: newData
      };
    }
    
    , getSaveData: function(){
      var lines = [];
      for (var l in this.store.edited){
        var newLine = this._makeSaveLine(this.store.edited[l]);
        this.store.edited[l].data = newLine.data;
        lines.push(newLine);
      };
      memberSort(lines, "lineNr");
      return lines;
    }
    
    , constructor: function(){
      this.columns = [
      {
        label: "Line"
        , field: "lineNr"
        , sortable: false
        , width: 100
        , formatter: function(value){
          var of = value * 16;
          return of.toString(16);
        }
      }, {
        label:"Binary"
        , field: "data"
        , sortable: false
        , renderCell: function(object, value, node, options){
          //var hexStr = "";
          var div = domConstruct.create("div", {
            "class": "hexLine"
          });
          var spans = [];
          var letters = [];
          for (var i = 0; i < 16; ++i){
            var byteInt = value[i];
            var index = i;
            var byteCode;
            if (index < value.length){
              byteCode = byteInt.toString(16);
            }else{
              byteCode = "..";
            };
            byteCode = byteCode.toUpperCase();
            while (byteCode.length < 2){
              byteCode = "0" + byteCode;
            };
            spans[index] = domConstruct.create("span", {
              "class": "byte byte" + index
            });
            letters[index] = {
              letter: [domConstruct.create("span", {
                "class": "letter letter0"
                , innerHTML: byteCode.substr(0, 1)
              }), domConstruct.create("span", {
                "class": "letter letter1"
                , innerHTML: byteCode.substr(1, 1)
              })]
            };
            domConstruct.place(letters[index].letter[0], spans[index]);
            domConstruct.place(letters[index].letter[1], spans[index]);
            domConstruct.place(spans[index], div);
          };
          object.spans = spans;
          object.letters = letters;
          return div;
        }
      }
      ];
      
      this.store = {
        last: 100
        , edited: {
        }
        , registerAsEdited: function(par){
          this.edited[par.lineNr] = par;
        }
        , getIdentity: function(par){
          return par.lineNr;
        },
		query: lang.hitch(this, function(query, options){
          var start = options.start || 0;
          var last = start + options.count;
          if (last > this.store.last){
            this.store.last = last;
          };
          /*var linesPs = this.parent.readLinesPs(this.fileId, options);
          var def = new Deferred();
          linesPs.then(function(lines){
            var res = [];
            for (var i = 0; i < lines.length; ++i){
              res.push({
                data: lines[i]
              });
            };
            def.resolve(res);
            return
            def.resolve(array.map(lines, function(line){
              return {
                data: line
              };
            }));
          });*/
          var ps = this.parent.readLinesPs(this.fileId, options);
          ps.total = this.store.last + 100;
          return QueryResults(ps);
		})
      };
      this.keyMap = lang.mixin(Keyboard.defaultKeyMap, {
        37: lang.hitch(this, "_left"), // left
        39: lang.hitch(this, "_right") // right
      });
      
      // hex key map
      this.keyChars = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
      var offset0 = 48;      // 0 key = 48
      var offsetA = 65 - 10; // a key = 65
      var i = 0;
      while(i < 10){
        this.keyMap[i + offset0] = lang.hitch(this, "_keypressed", i);
        ++i;
      };
      while(i < 16){
        this.keyMap[i + offsetA] = lang.hitch(this, "_keypressed", i);
        ++i;
      };
    }
    , "_keypressed": function(parNr){
      var row = this.row(this._focusedNode);
      if (row && row.data){
        this.store.registerAsEdited(row.data);
        domAttr.set(row.data.letters[this.activeHexColumn].letter[this.letterFocus], "innerHTML", this.keyChars[parNr]);
        domClass.add(row.data.spans[this.activeHexColumn], "edited");
        this._right();
      };
    }
    
    , buildRendering: function(){
      this.inherited(arguments);
      domClass.add(this.domNode, "hexgrid");
      this.on(".hexLine:click", lang.hitch(this, "hexClick"));
      this.activateHexColumn(0);
    }
    
    
    , "removeRow": function(rowElement){
      // destroy our widget during the row removal operation
      array.forEach(this.cleanUpWidgets, function(parColId){
        var cellElement = this.cell(rowElement, parColId).element;
        var widget = (cellElement.contents || cellElement).widget;
        if(widget){ 
          widget.destroy(); 
        };
      }, this);
      if (rowElement.widget){
        rowElement.widget.destroy();
      };
      this.inherited(arguments);
    }
    
    , activateHexColumn: function(parColumnNr){
      domClass.remove(this.domNode, "activeByte" + this.activeHexColumn);
      this.activeHexColumn = parColumnNr;
      domClass.add(this.domNode, "activeByte" + this.activeHexColumn);
    }
    
    , _activateByte: function(parSpan){
      for(var i = 0; i < 16; ++i){
        if (domClass.contains(parSpan, "byte" + i)){
          this.activateHexColumn(i);
          return;
        };
      };
    }
    
    , _activateLetter: function(parSpan){
      if (domClass.contains(parSpan, "letter0")){
        this.activateLetter(0);
        return;
      };
      if (domClass.contains(parSpan, "letter1")){
        this.activateLetter(1);
        return;
      };
    }
    
    , hexClick: function(evt){
      this.set("focused", "hex");
      if (!evt.target){
        return;
      };
      if (domClass.contains(evt.target, "byte")){
        this._activateByte(evt.target);
        return;
      };
      if (domClass.contains(evt.target.parentNode, "byte")){
        this._activateByte(evt.target.parentNode);
        if (domClass.contains(evt.target, "letter")){
          this._activateLetter(evt.target);
        };
      };
    }
    
    
    , _moveVert: function(steps){
      next = this.down(this._focusedNode, steps, true);
      
      this._focusOnNode(next, false);
    }
    
    , activateLetter: function(parNr){
      this.letterFocus = parNr;
      if (parNr == 1){
        domClass.add(this.domNode, "activeLetter1");
        domClass.remove(this.domNode, "activeLetter0");
      };
      if (parNr === 0){
        domClass.add(this.domNode, "activeLetter0");
        domClass.remove(this.domNode, "activeLetter1");
      };
    }
    
    , moveLetterFocus: function(parDir){
      if (this.letterFocus == 1){
        this.activateLetter(0);
      }else{
        this.activateLetter(1);
      };
      if (parDir > 0){
        if (this.letterFocus === 0){
          return true;
        };
      };
      if (parDir < 0){
        if (this.letterFocus === 1){
          return true;
        };
      };
    }
    
    , _left: function(){
      if (this.focused == "hex"){
        if (this.moveLetterFocus(-1)){
          if (this.activeHexColumn === 0){
            this.activateHexColumn(15);
            this._moveVert(-1);
            return;
          };
          this.activateHexColumn(this.activeHexColumn - 1);
        };
      };
    }
    , _right: function(){
      if (this.focused == "hex"){
        if (this.moveLetterFocus(1)){
          if (this.activeHexColumn == 15){
            this.activateHexColumn(0);
            this._moveVert(1);
            return;
          };
          this.activateHexColumn(this.activeHexColumn + 1);
        };
      };
    }

    
  });
});