import { Router, Request, Response } from 'express'
const routes = Router()
import server from './server'

import * as socketIO from 'socket.io'
//@ts-ignore
const io: SocketIO.Server = socketIO(server)


routes.get('/', (req: Request, res: Response) => {
    res.render('index.html')
})

routes.post('/create', async (req: Request, res: Response) => {
    res.render('create.html')

    io.on('connection', async (socket: socketIO.Socket) => {
        console.log(`Socket: ${socket.id}`)

        io.in(socket.id).emit('genLink', socket.id)

        // Listen for the chat message
        socket.in(socket.id).on('messageClient', msg => {
            io.in(socket.id).emit('messageServer', {author: 'Felipe', message: msg})
        })
    })
})

routes.get('/join/:room', async (req: Request, res: Response) => {
    res.render('private.html')

    const {room} = req.params

    io.on('connection', async (socket: socketIO.Socket) => {
        //@ts-ignore
        const clientsInRoom: Set = await io.in(room).allSockets()
        const clientsInRoomArray: string[] = Array.from(clientsInRoom)

        if(clientsInRoomArray.length === 2){
            console.log('The room is full!')
        }else{
            socket.leave(socket.id)
            socket.join(room)
            io.sockets.in(room).emit('messageServer', {author: 'Bot', message: `Player ${clientsInRoomArray.indexOf(socket.id) + 1} has entered the chat...`})
        }

        socket.in(room).on('messageClient', msg => {
            io.in(room).emit('messageServer', {author: 'Felipe', message: msg})
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