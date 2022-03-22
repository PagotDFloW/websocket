const express = require("express");
const http = require("http")
const app = express();
const server = http.createServer(app)
const { Server } = require('socket.io')
const  io = new Server( server, {
    cors: {
        origin: '*',
    }
} )
const cors = require('cors')
app.use(cors())

const itemsList =  [
        {
            id: 1,
            title: 'Lorem1',
            description: 'Lorem ipsum dolor sit amet.',
            attributes :['red', 'large', 'satin']
        },
    {
        id: 1,
        title: 'Lorem',
        description: 'Lorem ipsum dolor sit amet.',
        attributes : ['red', 'large', 'satin']
},
{
    id: 1,
        title: 'Lorem',
    description: 'Lorem ipsum dolor sit amet.',
    attributes : ['red', 'large', 'satin']
},
{
    id: 1,
        title: 'Lorem',
    description: 'Lorem ipsum dolor sit amet.',
    attributes :['red', 'large', 'satin']
},
]

io.on('connection', (socket ) => {
    console.log('a user connected');
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    })
    socket.on('filtername_change', (data)=> {
        const filteredItems = itemsList.filter(el => 
            el.title.includes(data)
        )
        console.log(filteredItems)
        socket.emit('filtered_name', filteredItems)

    })
})

server.listen( 3030, function() {
    console.log('Server starting')
})