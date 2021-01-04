import { Router, Request, Response } from 'express'
const routes = Router()
import server from './server'

import * as socketIO from 'socket.io'
//@ts-ignore
const io: SocketIO.Server = socketIO(server)

import { message, gameInfo } from './typings'

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

        //@ts-ignore
        let clientsInRoom: Set = await io.in(room).allSockets()
        let clientsInRoomArray: string[] = Array.from(clientsInRoom)

        socket.in(room).on('refreshRoomStatusClient', (refreshedStatus: string[]) => {
            if(refreshedStatus.length > 1){
                io.in(room).emit('startGame', {})
            } 
        })

        // Listen for the chat message
        socket.in(room).on('messageClient', async (msg: message) => {

        //@ts-ignore
        let clientsInRoom: Set = await io.in(room).allSockets()
        let clientsInRoomArray: string[] = Array.from(clientsInRoom)

            io.in(room).emit('messageServer', {author: `Player ${clientsInRoomArray.indexOf(room) + 1}`, message: msg})
        })

        socket.in(room).on('updateInfoClient', (info: gameInfo) => {
            socket.to(room).emit('updateInfoServer', info)
        })
    })
})

routes.get('/join/:room', async (req: Request, res: Response) => {
    res.render('private.html')

    const {room} = req.params

    io.once('connection', async (socket: socketIO.Socket) => {
        console.log(`Socket: ${socket.id}`)

        //@ts-ignore
        let clientsInRoom: Set = await io.in(room).allSockets()
        let clientsInRoomArray: string[] = Array.from(clientsInRoom)

        if(clientsInRoomArray.length === 2){
            console.log('The room is full!')
        }else{
            socket.leave(socket.id)
            socket.join(room)

            //@ts-ignore
            let clientsInRoom: Set = await io.in(room).allSockets()
            let clientsInRoomArray: string[] = Array.from(clientsInRoom)
            io.sockets.in(room).emit('refreshRoomStatusServer', clientsInRoomArray)

            io.sockets.in(room).emit('messageServer', {author: 'Bot', message: `Player ${clientsInRoomArray.length} has entered the chat...`})
        }

        socket.in(room).on('messageClient', async (msg: message) => {

        //@ts-ignore
        let clientsInRoom: Set = await io.in(room).allSockets()
        let clientsInRoomArray: string[] = Array.from(clientsInRoom)

            io.in(room).emit('messageServer', {author: `Player ${clientsInRoomArray.indexOf(socket.id) + 1}`, message: msg})
        })

        socket.in(room).on('updateInfoClient', (info: gameInfo) => {
            socket.to(room).emit('updateInfoServer', info)
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