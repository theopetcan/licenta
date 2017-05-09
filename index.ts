import * as serialport from "serialport"
import * as express from "express"

const PORT_NAME = 'COM3'

const html = `
<html>
<head>
    <title>Remote controller</title>
</head>
<body>

<a href="/on"><h1>Turn on</h1></a><br>

<a href="/off"><h1>Turn off</h1></a><br>

</body>
</html>
`

var sp = new serialport.SerialPort(PORT_NAME, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

sp.on('data', function (input) {
    console.log(input);
});

let app = express()

app.get('/', function (req, res) {
    res.send(html)
})

app.get('/on', function (req, res) {
    console.log("Turn on")
    sp.write("on", err => {
        if (err) {
            console.log(err)
        }

        res.send(html)
    });

})

app.get('/off', function (req, res) {
    console.log("Turn off")
    sp.write("off", err => {
        if (err) {
            console.log(err)
        }

        res.send(html)
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})