var profile = (function(){
    return {
        basePath: "../src",
        releaseDir: "./release",
        releaseName: "client",
        action: "release",
        layerOptimize: "closure",
        optimize: "closure",
        cssOptimize: "comments",
        stripConsole: "warn",
        
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
        }],
        staticHasFeatures: {
          "dom": 1
          , "host-browser": 1
          , "dojo-firebug": 0
        },
        defaultConfig: {
          hasCache:{
            "dom": 1
            , "host-browser": 1
            , "dojo-firebug": 0
          },
          async: 1,
          deps: [ "client/client" ]
        },
        layers: {
            "dojo/dojo": {
                include: [ "dojo/dojo", "client/client", "dgrid/Grid", "xstyle/load-css", "dojo/selector/lite" ]
                , boot: true
                , customBase: true
            }
        }
    };
})();
