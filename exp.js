/*UglifyJS = require("uglify-js");*/

/*jshint multistr:true */
/*
codeStr = " \
var b = \"s\";\
function f(){\
   var a = 1;\
   b = 2;\
}\
 ";

try{
var toplevel_ast = UglifyJS.parse(codeStr);

console.log(toplevel_ast);
}catch(e){
  console.log(e);
};
*/
var f = function(){
  //this.prototype = a;
  this.fx = function(){
    console.log(this);
    console.log(this.b);
    if (this.prototype){
      console.log("yes");
    };
  };
};

var a = {
  b: "ab"
  , c: "ac"
  , f: function(){
    console.log(this);
    console.log(this.b);
    if (this.prototype){
      console.log("yes");
    };
  }
};

var b = {
  c: "bc"
  , d: "bd"
};

//f.prototype = a;

/*console.log(b.b);
console.log(b.c);
console.log(b.d);*/

function x(){

  var sf = function(){};
  var st = new sf();
  
  st.x = 1;
  
  sf = function(){};
  sf.prototype = st;
  var st2 = new sf();
  st2.x = 2;
  st2.y = 3;
  
  console.log(st2.x);
  console.log(st2.y);
  
  delete st2.x;
  console.log(st2.x);
  console.log(st2.y);
  
  var v1 = "v1";
  console.log(v1);
  delete v1;
  console.log(v1);
  
}

x();

//console.log(x.prototype.b);