var tessel = require('tessel')
var path = require('path')
var script = 'index.js'
var through = require('through0')
require('./tty')

tessel.findTessel({}, withConnection)

function withConnection (err, client) {
  if (err) { console.log(err); process.exit(1) }
  client.run(
    path.join(__dirname, script),
    ['tessel', script], {single: true},
    start.bind(client))
}

function start() {
  client = this
  client.stdout
    .pipe(through(function (x) {
      if (String(x) === '2\n') { return ''}
      return String(x).replace(/\n$/,'')
    }))
    .pipe(process.stdout)
  client.stdout.resume()
  client.stderr.pipe(process.stderr)

  process.stdin.on('keypress', function (c, key) {
    // if (!key) { return }
    client.interface.writeProcessMessage(new Buffer(c||''))
  })

}