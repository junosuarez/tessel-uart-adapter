process.stdin.setRawMode(true)
var keypress = require('keypress')
keypress(process.stdin)

process.stdin.on('keypress', function (chunk, key) {
  // process.stdout.write('k' + key)
  console.log(chunk, key)
  // console.log(new Buffer(key.sequence), key.sequence)
  if (key && key.ctrl && key.name == 'd') { process.exit()}
})

setTimeout(function () {

}, 1000000)