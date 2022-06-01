module.exports= function(io){
    io.on('connection', (socket)=>{
        console.log('new user connected');
        socket.on('userCoordinates', coords =>{
            socket.broadcast.emit('newUserCoordinates', coords)
        });
    });
}