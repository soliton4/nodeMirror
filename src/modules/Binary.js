define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/_base/lang"
  , "sol/promise"
  , "dojo/_base/array"
  , "main/serverOnly!server/files"
  , "sol/string"
  , "modules/base/Base"
  , "modules/base/BorderContainer"
  , "main/serverOnly!dojo/node!fs"
  , "main/clientOnly!./binary/HexGrid"
], function(
  declare
  , Deferred
  , lang
  , solPromise
  , array
  , files
  , solString
  , Base
  , BorderContainerBase
  , fs
  , HexGrid
){
  
  /*var additionalSubtypes = {
    "octet-stream": true
  };
    
  var additionalTypes = {
  };*/
  
  return declare([BorderContainerBase], {
    remoteFunctions: lang.mixin({}, Base.remoteFunctions, { readLinesPs: true} )
    
    , "class": "content binary"
    
    , saveButton: true
    , reloadButton: true
    , downloadButton: true
    , textModeButton: true
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      
      this.hexGrid = this.ownObj(new HexGrid({
        fileId: this.par.id
        , region: "center"
        , parent: this
      }));
      this.addChild(this.hexGrid);
      
      return ret;
    }
    
    
    // the module decides if it is competent to handle that type
    /* par: {
         type: ["file"|"..."]
         , id: <type specific id>
         , contentType: file content type detected by magic or mime
       }
    */
    , isCompetentPs: function(par){
      var def = this.def();
      if (par.contentType == "inode/directory"){
        def.reject();
      }else{
        def.resolve();
      };
      return def;
    }
    
    , getContentPs: function(par){
      var def = this.def();
      
      //var fileName = this.getFileName(par.id);
      
      var result = {
        isBin: true
      };
      def.resolve(result);
      
      return def;
    }
    
    
    , _getContentAttr: function(){
      return this.hexGrid.getSaveData();
    }
    
    , saveContentPs: function(par, content){
      var def = new Deferred();
      var name = this.getFileName(par.id);
      fs.open(name, "r+", function(err, fd){
        if (err){
          console.log(err);
          def.reject();
          return;
        };
        console.log("opened");
        console.log(content);
        var nextLineNr = 0;
        var startLineNr = 0;
        var data = [];
        
        var loopFun;
        
        var writeFun = function(){
          var size = data.length;
          var position = startLineNr * 16;
          startLineNr = 0;
          nextLineNr = 0;
          console.log("size:" + size);
          if (!size){
            return loopFun();
          };
          var buf = new Buffer(data);
          console.log({
            "name": "writing"
            , buf: buf
            , size: size
            , position: position
          });
          fs.write(fd, buf, 0, size, position, function(){
            if(err){
              console.log(err);
              def.reject();
              return;
            };
            data = [];
            loopFun();
          });
        };
        
        loopFun = function(){
          if (!content.length){
            console.log("done");
            fs.close(fd, function(){
              def.resolve();
            });
            return;
          };
          while (content.length){
            var line = content[0];
            if (line.lineNr != nextLineNr){
              if (data.length){
                return writeFun();
              };
              startLineNr = line.lineNr;
            };
            content.shift();
            nextLineNr = line.lineNr + 1;
            console.log("concat");
            data = data.concat(line.data);
            console.log(data);
            if (line.data.length != 16){
              return writeFun();
            };
          };
          writeFun();
        };
        loopFun();
      });
      
      return def;
    }
    
    , readLinesPs: function(parName, par){
      var def = new Deferred();
      var name = this.getFileName(parName);
      
      fs.open(name, "r", function(err, fd){
        if (err){
          def.reject();
          return;
        };
        var count = par.count || 1;
        var size = count * 16;
        var start = par.start || 0;
        start = start * 16;
        var buf = new Buffer(size);
        fs.read(fd, buf, 0, size, start, function(err, bytesRead, buffer){
          if (err){
            def.reject();
            return;
          };
          var res = [];
          for(var l = 0; l < count; ++l){
            var of = l * 16;
            var record = {
              lineNr: par.start + l
              , data: []
            };
            for (var i = 0; i < 16; ++i){
              if (bytesRead){
                --bytesRead;
                record.data[i] = buffer[of + i];
              };
            };
            res.push(record);
          };
          fs.close(fd, function(){
            def.resolve(res);
          });
        });
      });
      
      return def;
    }
    
    
  });
});
