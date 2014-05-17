define([
  "dojo/_base/lang"
  , "dijit/Destroyable"
], function(
  lang
  , Destroyable
){
  lang.extend(Destroyable, {
    ownObj: function(parObj){
      this.own(parObj);
      return parObj;
    }
  });
  return {};
});
