var express = require('express');
var app = express()
var http = require('http').createServer(app)
var  io = require('socket.io')(http)




app.use(express.static(__dirname+"/public") )

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


io.on('connection',(socket)=>{
    console.log('user connected')


socket.on('disconnect',()=>{
    console.log('user left connection')
})

socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
})

})




http.listen(3000,()=>{
    console.log('connected on port 3000')
})