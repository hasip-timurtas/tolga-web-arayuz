var server = require('http').createServer(onRequest).listen(4000)
var utf8 = require('utf8');
var io = require('socket.io')(server);
var SSHClient = require('ssh2').Client;

// Handle static file serving
function onRequest(req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end();
}
var connected = false

io.on('connection', function (socket) {
    var ssh = new SSHClient();
    socket.on('login', function (loginData) {
        ssh.on('ready', function () {
            socket.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
            connected = true;
            ssh.shell(function (err, stream) {
                if (err)
                    return socket.emit('data', '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
                socket.on('data', function (data) {
                    stream.write(data);
                });
                stream.on('data', function (d) {
                    socket.emit('data', utf8.decode(d.toString('binary')));
                }).on('close', function () {
                    ssh.end();
                });
            });
        }).on('close', function () {
            socket.emit('data', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
        }).on('error', function (err) {
            console.log(err);
            socket.emit('data', '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
        }).connect(loginData);
    });
});

console.log("Server is started on 4000");
