start
  = boolean*

boolean
  = 'true'{ return { x: true } }
  / 'false' { return false }