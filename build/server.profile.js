var profile = (function(){
    return {
        basePath: "../src",
        releaseDir: "../release",
        releaseName: "server",
        action: "release",
        layerOptimize: "closure",
        optimize: "closure",
        cssOptimize: "comments",
        stripConsole: "warn",
      
      plugins: {
        "main/serverOnly": "build/plugins/serverOnly"
        , "main/clientOnly": "build/plugins/clientOnly"
        //, "xstyle/css": "xstyle/build/amd-css"
      },
        
        packages:[{
            name: "dojo",
            location: "dojo"
        },{
            name: "dijit",
            location: "dijit" // just for dependencies
        },{
            name: "main",
            location: "main"
        },{
            name: "server",
            location: "server"
        },{
            name: "modules",
            location: "modules"
        },{
            name: "sol",
            location: "sol"
        },{
            name: "term",
            location: "term"
        },{
          name: "codemirror",
          location: "codemirror" // to avoid error msg
        },{
            name: "dgrid",
            location: "dgrid"  // to avoid error msg
        },{
            name: "put-selector",
            location: "put-selector" // to avoid error msg
        },{
            name: "xstyle",
            location: "xstyle" // to avoid error msg
        }, {
          name: "promiseland"
        , location: "promiseland"
        }, {
          name: "peg"
        , location: "peg"
        }],
        staticHasFeatures: {
          "host-node": 1 // Ensure we "force" the loader into Node.js mode
          , "dom": 0 // Ensure that none of the code assumes we have a DOM
          , "dojo-firebug": 0
          , "dom-addeventlistener": 0
          , "server-modules": true
        },
        defaultConfig: {
          hasCache:{
            "host-node": 1 // Ensure we "force" the loader into Node.js mode
            , "dom": 0 // Ensure that none of the code assumes we have a DOM
            , "dojo-firebug": 0
            , "dom-addeventlistener": 0
            , "server-modules": true
          },
          async: 1,
          deps: [ "server/server" ]
        },
        layers: {
            "server/server": {
                include: [ 
                  "server/server"
                , "sol/string"
                , "main/serverOnly"
                , "main/codemirror/subtypes"
                , "modules/Files"
                , "modules/SideBar"
                , "modules/ContentTabs"
                , "modules/Terminal"
                , "modules/Control"
                , "modules/Text"
                , "modules/Directory"
                , "modules/Binary"
                , "modules/Less"
                , "modules/Html"
                , "modules/Peg"
                , "modules/JavaScript"
                , "modules/Search"
                , "modules/Gui"
                , "main/codemirror/fake"
                , "term/server"
                , "dojo/topic"
                , "main/treeItems"
                , "server/files"
                , "main/contentIO"
                , "sol/node/debug/Protocol"
                , "sol/node/fileWalker"
                , "modules/Debug"
                , "modules/debug/Debugger"
                , "modules/Image"
                , "modules/Video"
                , "modules/Audio"
                , "modules/PromiseLand"
                //, "promiseland"
                , "promiseland/parser"
                , "promiseland/main"
                , "promiseland/promiseland"
                , "promiseland/_parser"
                , "promiseland/md5"
                , "modules/terminal/AvconvRunner"
                , "peg/Peg"
                ]
            }
        }
    };
})();
