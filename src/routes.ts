import { Router, Request, Response } from 'express'
const routes = Router()
import server from './server'

import * as socketIO from 'socket.io'
//@ts-ignore
const io: SocketIO.Server = socketIO(server)


routes.get('/', (req: Request, res: Response) => {
    res.render('index.html')
})

routes.post('/create', async (req, res) => {
    res.render('create.html')

    io.on('connection', async (socket) => {
        console.log(`Socket: ${socket.id}`)

        socket.join(socket.id)
        io.in(socket.id).emit('genLink', socket.id)

        // Listen for the chat message
        socket.in(socket.id).on('messageClient', msg => {
            io.in(socket.id).emit('messageServer', {author: 'Unknow', message: msg})
        })
    })
})

// Just for tests
routes.get('/list/:room', async (req, res) => {

    const {room} = req.params

    //@ts-ignore
    const clientsInRoom = await io.in(room).allSockets()

    console.log(clientsInRoom)

    res.send(Array.from(clientsInRoom))
})

export default routes