import * as path from 'path'
const http = require('http')
import * as express from 'express'

const app = express()
const server = http.createServer(app)
export default server

import routes from './routes'

app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/public/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')


app.use(routes)

const PORT = 3000 || process.env.PORT
server.listen(PORT, () => {
    console.log(`Server runnig on port: ${PORT}`)
})
