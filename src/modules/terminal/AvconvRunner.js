define([
  "dojo/_base/declare"
  , "main/config"
  , "dojo/node!child_process"
  , "dojo/_base/lang"
  , "dojo/node!stream"
  , "dojo/Deferred"
], function(
       declare
         , config
         , child_process
         , lang
         , nodeStream
         , Deferred
       ){
         var x11videotool = "avconv";
         config.get("x11videotool").then(function(par){
           x11videotool = par || "avconv";
         });
         var spawn  = child_process.spawn;
         var exec  = child_process.exec;
  
  var wpredp = false;
  
  var checkAvconv = function(){
    
    //avconv -h | grep wpredp 
    
    var dataStr = "";
    var errStr = "";
    
    var def1 = new Deferred();
    var def2 = new Deferred();
    
    var avconv = spawn(x11videotool, ["-h"]);
    avconv.stdout.on("data", function(data){
      dataStr += data.toString();
    });
    avconv.stdout.on("error", function(data){
    });
    var closeFun = function(){
      //console.log("close fun!!!");
      def1.resolve();
    };
    
    avconv.on('close', closeFun);
    avconv.on('exit', closeFun);
    
    def1.then(function(){
      //console.log(dataStr);
      if (dataStr.indexOf("wpredp") > 0){
        wpredp = true;
      };
      def2.resolve();
    });
    
    return def2;
  };

         return declare([], {
           fps: "5"
           , quality: "5"
           , duration: 180
           , constructor: function(par){
             
             declare.safeMixin(this, par);
             
             
             var self = this;
             
             checkAvconv().then(lang.hitch(this, function(){
             
             //this.dim.w = 1200;
             
             var params;
             if (this.type == "audio"){
               params = [
                 "-f", "pulse", "-i", "alsa_output.usb-ESI_U46DJ-00-U46DJ.analog-surround-51.monitor", "-f", "wav", "-"
               ];
             }else{

               params = [
                 "-re",                   // Real time mode
                 "-f","x11grab",          // Grab screen
                 "-r", this.fps,              // Framerate
                 "-s", "" + this.dim.w + "x" + this.dim.h,   // Capture size

                 "-i", ":0+" + this.dim.x + "," + this.dim.y // Capture offset
                 //"-i", ":0.0+0,0" // Capture offset
                 //"-g", "100",                // All frames are i-frames
               ];

               if (this.format == "webm" || this.format == "ogg"){
                 params.push("-me_method");
                 params.push("zero");
                 params.push("-flags2");
                 params.push("fast");

               };

               params.push("-vcodec");
               if (this.format == "webm"){
                 params.push("libvpx");

               }else if (this.format == "ogg"){
                 params.push("libtheora");

               }else{
                 params.push("libx264");
               };
               if (this.preset && this.preset != "medium"){
                 params.push("-preset");
                 params.push(this.preset);
               };
               if (this.maxrate && this.maxrate != "unlimited"){
                 params.push("-b:v");
                 params.push(this.maxrate);
                 params.push("-maxrate");
                 params.push(this.maxrate);
                 params.push("-bufsize");
                 params.push("4000k"); // we need a bufsize in order to do maxrate
               };

               if (!this.format || this.format == "h264" || this.format == "h264asm"){
                 params.push("-pass");
                 params.push("1");
                 params.push("-coder");
                 params.push("0");
                 //params.push("-bf");
                 //params.push("0");
                 params.push("-flags");
                 params.push("-loop");
                 if (wpredp){
                   params.push("-wpredp");
                   params.push("0");
                 };
                 //params.push("-crf");
                 //params.push("0");
               };
               params.push("-tune");
               params.push("zerolatency");

               if (this.format == "webm" || this.format == "ogg"){
                 params.push("-threads");
                 params.push("8");
               }else{
                 params.push("-threads");
                 params.push("2");
               };

               params.push("-an");
               if (this.format == "webm" || this.format == "ogg"){
                 params.push("-crf");
                 params.push("20");// Quality
               };
               params.push("-t");
               params.push("" + this.duration); // 3 min
               params.push("-f");
               if (this.format == "webm"){
                 params.push("webm");             // File format
               }else if (this.format == "ogg"){
                 params.push("ogg");             // File format
               }else{
                 params.push("h264");             // File format
               };

               //-pass 1 -coder 0 -bf 0 -flags -loop -wpredp 0 -an
               if (x11videotool == "avconv" && this.quality){
                 if (this.format == "webm" || this.format == "ogg"){
                   params.push("-qmin");
                   params.push("1");             // Quantization
                   //params.push("-qmax");
                   //params.push(this.quality);
                 };
               };
               if (this.format == "ogg" && this.quality){
                 params.push("-q:v");
                 params.push(this.quality);
               };
               params.push("-s", "" + this.dim.w + "x" + this.dim.h);
               params.push("-");                      // Output to STDOUT

             };

             var cmdStr = "";
             cmdStr += x11videotool;
             i = 0;
             for (i = 0; i < params.length; ++i){
               cmdStr += " ";
               cmdStr += params[i];
             };
             console.log(cmdStr);
             //avconv -re -f x11grab -r 12 -s 1024x768 -i :3+0,0 -g 1 -me_method zero -flags2 fast -vcodec libvpx -preset ultrafast -tune zerolatecy -b:v 1M -crf 40 -qmin 5 -qmax 5 -t 180 -f webm - 
             //ffmpeg -re -f x11grab -r 5 -s 1024x768 -i :0+0,0 -g 1 -me_method zero -flags2 fast -vcodec libtheora -preset ultrafast -tune zerolatecy -b:v 1M -crf 40 -q:v 6 -t 180 -f ogg - 
             
             /*
             recommended
             
             ffmpeg -y -i sourceFile -r 30000/1001 -b:a 2M -bt 4M -vcodec libx264 -pass 1 -coder 0 -bf 0 -flags -loop -wpredp 0 -an targetFile.mp4
             
             */
             

             //var streamDef = new Deferred();
             try{
               self.avconv = spawn(x11videotool, params);

             }catch(e){
               console.log("error 1");
             };
             
             var stream = self.avconv.stdout;
             
             /*if (this.type == "audio"){
               //self.opusenc = spawn("opusenc", ["--bitrate", "256", "-", "-"]);
               //                // opusenc --bitrate 64 --max-delay 0 --comp 0 --framesize 2.5 --hard-cbr

               self.opusenc = spawn("opusenc", ["--bitrate", "128", "--max-delay", "0", "--comp", "0", "--framesize", "2.5", "--hard-cbr", "-", "-"]);
               stream = self.opusenc.stdout;
               self.stdin = self.opusenc.stdin;
             };*/
             
             var killFun = lang.hitch(this, "kill");
             self.stream = stream;

             //streamDef.then(function(streams){
               
               setTimeout(function(){
                 killFun();
               }, (self.duration + 10) * 1000);

               try{
                 /*if (self.type == "audio"){
                   self.avconv.stdout.on("error", function(err){
                     console.log("avconverror");
                   });
                   var startFun;
                   var pullFun = function(){
                     if (self.killed){
                       return;
                     };
                     var data = self.avconv.stdout.read();
                     if (data && data.length){
                       self.stdin.write(data);
                     };
                     startFun();
                   };
                   startFun = function(){
                     setTimeout(pullFun, 100);
                   };
                   startFun();
                 };*/
                 stream.on("data", function(data){
                   //console.log("streamdata");
                   if (!(data && data.length)){
                     return;
                   };
                   self.streamData(data);
                 });
                 self._startCollecting();
                 stream.on("error", function(err){
                   console.log("some stream error");
                   console.log(err);
                 });
                 //stream.pipe(res);
               }catch(e){
                 console.log("error 2");
               };



             }));



           }
           
           , _startCollecting: function(){
             var self = this;
             
             var startFun;
             
             var collectFun = function(){
               if (self.killed){
                 return;
               };
               var data = self.stream.read();
               if (data && data.length){
                 self.streamData(data);
               };
               startFun();
             };
             
             startFun = function(){
               setTimeout(collectFun, 20);
             };
             startFun();
           }

           , kill: function(){
             console.log("killing ... " + this.type);
             console.log({
               duration: this.duration,
               type: this.type
             });
             this.killed = true;
             if (this.avconv){
               this.avconv.kill();
             };
             if (this.opusenc){
               this.opusenc.kill();
             };
           }

           , streamData: function(){}

         });

       });
