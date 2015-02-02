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
          name: "codemirror4",
          location: "codemirror4"
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
        }, {
          name: "audio"
        , location: "audio"
        }, {
          name: "video"
        , location: "video"
        }, {
          name: "promiseland"
        , location: "promiseland"
        }, {
          name: "avc"
        , location: "avc"
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
                //, "modules/javascript/Formatter4" // doesnt compile ;(
                , "modules/javascript/formatSettingsDlg"
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
                 ,"codemirror4/theme/all"
                 ,"dijit/form/Select"
                 ,"codemirror4/mode/allModes"
                 ,"codemirror4/addon/dialog/dialog"
                 ,"codemirror4/addon/search/search"
                 ,"codemirror4/addon/search/searchcursor"
                 ,"codemirror4/addon/edit/matchbrackets"
                 ,"modules/html/Tester"
                 ,"modules/less/Tester"
                 ,"sol/wgt/Iframe"
                 ,"modules/base/WidgetMixin"
                , "dojo/io/iframe"
                , "sol/dlg/YesNoCancel"
                , "dijit/form/DropDownButton"
                , "modules/text/settingsDlg"
                , "codemirror4/addon/edit/closebrackets"
                , "codemirror4/addon/fold/xml-fold"
                , "codemirror4/addon/edit/closetag"
                , "codemirror4/addon/edit/matchtags"
                , "codemirror4/addon/edit/trailingspace"
                , "codemirror4/addon/fold/foldcode"
                , "codemirror4/addon/fold/foldgutter"
                , "codemirror4/addon/fold/brace-fold"
                , "codemirror4/addon/fold/comment-fold"
                , "codemirror4/addon/lint/all.js"
                , "codemirror4/addon/selection/active-line"
                , "codemirror4/addon/display/placeholder"
                , "codemirror4/addon/lint/all"
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
                , "modules/Video"
                , "modules/video/VideoWgt"
                , "modules/Audio"
                , "modules/PromiseLand"
                , "modules/promiseLand/Tester"
                , "promiseland/main"
                , "promiseland/promiseland"
                //, "promiseland/parser"
                //, "promiseland/_parser" // causes weird error
                , "promiseland/md5"
                , "promiseland/main"
              ]
              , boot: true
              , customBase: true
            }
        }
    };
})();
