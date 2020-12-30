import { Router, Request, Response } from 'express'
const routes = Router()
import server from './server'

import * as socketIO from 'socket.io'
//@ts-ignore
const io: SocketIO.Server = socketIO(server)

interface message{
    author: string,
    message: string
}

interface gameInfo{
    arena: number[][],
    pos: {x: number, y: number},
    matrix: number[][],
    color: string
}

routes.get('/', (req: Request, res: Response) => {
    res.render('index.html')
})

routes.post('/create', async (req: Request, res: Response) => {
    res.render('create.html')

    io.once('connection', async (socket: socketIO.Socket) => {
        console.log(`Socket: ${socket.id}`)
        const room = socket.id

        socket.leave(socket.id)
        socket.join(room)

        io.in(room).emit('genLink', room)

        // Listen for the chat message
        socket.in(room).on('messageClient', async (msg: message) => {

        //@ts-ignore
        let clientsInRoom: Set = await io.in(room).allSockets()
        let clientsInRoomArray: string[] = Array.from(clientsInRoom)

            io.in(room).emit('messageServer', {author: `Player ${clientsInRoomArray.indexOf(room) + 1}`, message: msg})
        })

        socket.in(room).on('updateInfoClient', (info: gameInfo) => {
            io.in(room).emit('updateInfoServer', info)
        })
    })
})

routes.get('/join/:room', async (req: Request, res: Response) => {
    res.render('private.html')

    const {room} = req.params

    io.on('connection', async (socket: socketIO.Socket) => {
        //@ts-ignore
        let clientsInRoom: Set = await io.in(room).allSockets()
        let clientsInRoomArray: string[] = Array.from(clientsInRoom)

        if(clientsInRoomArray.length === 2){
            console.log('The room is full!')
        }else{
            socket.leave(socket.id)
            socket.join(room)
            io.sockets.in(room).emit('messageServer', {author: 'Bot', message: `Player ${clientsInRoomArray.length + 1} has entered the chat...`})
        }

        socket.in(room).on('messageClient', async (msg: message) => {

        //@ts-ignore
        let clientsInRoom: Set = await io.in(room).allSockets()
        let clientsInRoomArray: string[] = Array.from(clientsInRoom)

            io.in(room).emit('messageServer', {author: `Player ${clientsInRoomArray.indexOf(socket.id) + 1}`, message: msg})
        })
    })
})

routes.get('/list/:room', async (req: Request, res: Response) => {

    const {room} = req.params

    //@ts-ignore
    const clientsInRoom = await io.in(room).allSockets()

    console.log(clientsInRoom)

    res.send(Array.from(clientsInRoom))
})

//just for tests
routes.get('/list', (req: Request, res: Response) => {
    console.log(io.sockets.adapter.rooms)
    res.send(io.sockets.adapter.rooms)
})

export default routes