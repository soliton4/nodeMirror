define([
  "dojo/has"
],function(
  has
){
  return {
    load: function(id, require, load){
      if (!has("server-modules")){
        require([id], load);
      }else{
        load(undefined);
      };
    }
  };
});
