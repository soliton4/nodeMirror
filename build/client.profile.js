var profile = (function(){
    return {
        basePath: "../src",
        releaseDir: "../release",
        releaseName: "client",
        action: "release",
        layerOptimize: "closure",
        optimize: "closure",
        cssOptimize: "comments",
        stripConsole: "warn",
        locale: 'en-us',
        
        packages:[{
            name: "dojo",
            location: "dojo"
        },{
            name: "dijit",
            location: "dijit" 
        },{
            name: "dojox",
            location: "dojox" 
        },{
            name: "dgrid",
            location: "dgrid" 
        },{
            name: "put-selector",
            location: "put-selector" 
        },{
            name: "xstyle",
            location: "xstyle" 
        },{
            name: "main",
            location: "main"
        },{
            name: "client",
            location: "client"
        },{
            name: "sol",
            location: "sol"
        },{
            name: "jshint",
            location: "jshint"
        },{
            name: "peg",
            location: "peg"
        },{
          name: "codemirror",
          location: "codemirror"
        },{
          name: "modules"
        , location: "modules"
        }, {
          name: "style"
        , location: "style"
        }, {
          name: "term"
        , location: "term"
        }, {
          name: "debug"
        , location: "debug"
        }, {
          name: "image"
        , location: "image"
        }],
      
      plugins: {
        "main/serverOnly": "build/plugins/serverOnly"
        , "main/clientOnly": "build/plugins/clientOnly"
        //, "xstyle/css": "xstyle/build/amd-css"
      },
      
        staticHasFeatures: {
          "dom": 1
          , "host-browser": 1
          , "dojo-firebug": 0
          , "server-modules": false
        },
        defaultConfig: {
          hasCache:{
            "dom": 1
            , "host-browser": 1
            , "dojo-firebug": 0
            , "server-modules": false
          },
          async: 1,
          deps: [ "client/client" ],
          locale: 'en-us'
        },
        layers: {
            "dojo/dojo": {
              include: [ 
                  "dojo/dojo"
                , "client/client"
                , "dgrid/Grid"
                , "xstyle/load-css"
                , "dojo/selector/lite"
                , "main/serverOnly"
                , "sol/string"
                , "main/codemirror/fake"
                , "modules/Files"
                , "modules/files/Wgt"
                , "modules/SideBar"
                , "modules/sideBar/Wgt"
                , "modules/ContentTabs"
                , "modules/contentTabs/Wgt"
                , "modules/Terminal"
                , "modules/terminal/Wgt"
                , "modules/Control"
                , "modules/control/Wgt"
                , "modules/Text"
                , "modules/Directory"
                , "modules/Binary"
                , "modules/JavaScript"
                , "modules/Less"
                , "modules/Html"
                , "modules/binary/HexGrid"
                , "modules/directory/Grid"
                , "modules/directory/NewDlg"
                , "modules/Search"
                , "modules/search/Wgt"
                , "modules/Gui"
                , "modules/Peg"
                , "modules/pegjs/Parser"
                 ,"sol/wgt/CodeMirror"
                 ,"codemirror/theme/all"
                 ,"dijit/form/Select"
                 ,"codemirror/mode/allModes"
                 ,"codemirror/addon/dialog/dialog"
                 ,"codemirror/addon/search/search"
                 ,"codemirror/addon/search/searchcursor"
                 ,"codemirror/addon/edit/matchbrackets"
                 ,"modules/html/Tester"
                 ,"modules/less/Tester"
                 ,"sol/wgt/Iframe"
                 ,"modules/base/WidgetMixin"
                , "dojo/io/iframe"
                , "sol/dlg/YesNoCancel"
                , "dijit/form/DropDownButton"
                , "modules/text/settingsDlg"
                , "codemirror/addon/edit/closebrackets"
                , "codemirror/addon/fold/xml-fold"
                , "codemirror/addon/edit/closetag"
                , "codemirror/addon/edit/matchtags"
                , "codemirror/addon/edit/trailingspace"
                , "codemirror/addon/fold/foldcode"
                , "codemirror/addon/fold/foldgutter"
                , "codemirror/addon/fold/brace-fold"
                , "codemirror/addon/fold/comment-fold"
                , "codemirror/addon/lint/all.js"
                , "codemirror/addon/selection/active-line"
                , "codemirror/addon/display/placeholder"
                , "codemirror/addon/lint/all"
                , "sol/wgt/Turn"
                , "dgrid/TouchScroll"
                , "dgrid/util/touch"
                , "dojo/topic"
                , "modules/sideBar/Stub"
                , "modules/contentTabs/TabController"
                , "modules/contentTabs/ScrollingTabController"
                , "dijit/form/ComboButton"
                , "modules/binary/HexGrid"
                , "modules/Debug"
                , "modules/Image"
                , "modules/image/ImageWgt"
                , "modules/debug/Wgt"
              ]
              , boot: true
              , customBase: true
            }
        }
    };
})();
