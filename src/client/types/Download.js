define([
  "dojo/_base/declare"
  , "sol/fileName"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/CodeMirror"
  , "dijit/Toolbar"
  , "dijit/form/Button"
  , "main/contentIO"
  , "./Base"
], function(
  declare
  , fileName
  , domConstruct
  , lang
  , topic
  , BorderContainer
  , CodeMirror
  , Toolbar
  , Button
  , contentIO
  , Base
){
  return declare([
    Base
  ], {
    "class": "content download"
    
    , downloadbutton: true
    , textmodebutton: true
    
  });
});
