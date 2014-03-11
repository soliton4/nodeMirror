var a = new Promise();
{
  for(code = 1; code < 10; ++code){
    dosomething();
  };
  a.resolve();
}
var a2 = a.then(function(){
  condtinuetodoSomething();
});
a2.then(function(){
  somethingelse();
});