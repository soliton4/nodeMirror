var _returnPs = new Promise();
var __UNIQUENAME1 = new Promise();
if(a){
dostuff().then(function(__UNIQUENAME2){try{__UNIQUENAME2;
__UNIQUENAME1.resolve();}catch(__returnError){_returnPs.reject(__returnError);
 }; });
}else{
dootherStuff().then(function(__UNIQUENAME3){try{__UNIQUENAME3;
__UNIQUENAME1.resolve();}catch(__returnError){_returnPs.reject(__returnError);
 }; });}; __UNIQUENAME1.then(function(){;
;
dosomeMore();
a;var __UNIQUENAME5 = new Promise();
var __UNIQUENAME4 = function(){var __UNIQUENAME6 = new Promise();
if((b < c)){dostuff().then(function(__UNIQUENAME7){try{__UNIQUENAME7;
}catch(__returnError){_returnPs.reject(__returnError);
 }; });}else{__UNIQUENAME6.resolve(false); return;
};
__UNIQUENAME6};
var __UNIQUENAME8 = function(){__UNIQUENAME4().then(function(contLoop){
if (contLoop){d++__UNIQUENAME8();}else{__UNIQUENAME5.resolve();};
});
};
__UNIQUENAME8();
__UNIQUENAME5.then(function(){;
;
});)};