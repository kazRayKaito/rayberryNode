const express = require("express");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 4443;
const { exec } = require("child_process");

app.use(express.static(path.join(__dirname, 'www')));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

io.on("connection", function(socket){
    socket.on("signal", function(signal){
        console.log("Socket.on:signal");
        exec("sudo ./IR_signal_Transmitter " + signal, (error, stdout, stderr) => {
            if(error){
                console.log("Error: sudo killall pigpiod");
                exec("sudo killall pigpiod", (error, stdout, stderr) => console.log(stdout));
            }else{
                console.log("Signal: " + signal);
            }
            console.log(stdout);
        });
    });
    socket.on("log", function(logText){
        console.log("log: " + logText);
    });
})

http.listen(PORT, function(){
    console.log('server listening at Port:' + PORT);
});