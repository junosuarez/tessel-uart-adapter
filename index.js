var tessel = require('tessel')
// var timestamp = require('monotonic-timestamp')
var port = tessel.port['A']
var led = tessel.led[0].output(1)
var led2 = tessel.led[1].output(1)

var uart = new port.UART({
  baudrate: 115200
})

console.error('UARTing')

setInterval(function () {
  led2.toggle()
}, 250)

uart.on('data', function (e) {
  // var now = timestamp()
  // because all IO requires blinking lights
  led.toggle() 

  console.log(e.toString())
  // process.sendfile(now, e)
  // process.sendfile(now, new Buffer('hi'))
})

process.on('message', function (m) {
  // console.log('T:', m)
  uart.write(m)
})


//uart.pipe(process.stdout)