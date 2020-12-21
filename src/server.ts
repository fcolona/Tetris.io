import * as path from 'path'
const http = require('http')
import * as express from 'express'
import * as socketIO from 'socket.io'

const app = express()
const server = http.createServer(app)

//@ts-ignore
const io: SocketIO.Server = socketIO(server)

app.use(express.static(path.join(__dirname, 'views')))
app.set('views', path.join(__dirname, '/public/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')


app.get('/', (req, res) => {
    res.render('index.html')
})

const PORT = 3000 || process.env.PORT
server.listen(PORT, () => {
    console.log(`Server runnig on port: ${PORT}`)
})