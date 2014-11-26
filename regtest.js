s  = "keyless.io/bla";

reg = /(http:\/\/)?/;

console.log(s.search(/^((http:\/\/)|(https:\/\/))?([a-zA-Z]?[a-zA-Z0-9\-]*\.)?keyless.io[$\/]/)); // [^\/]?

console.log(s.search(/[\w]/)); // [^\/]?