var JscsStringChecker = require("./main");


var checker = new JscsStringChecker();
checker.registerDefaultRules();
checker.configure( {
  preset: 'mdcs'
} );

console.log(checker.formatString("    bla()  ;"));

