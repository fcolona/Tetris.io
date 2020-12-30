//@ts-ignore
const socket = io()

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

function outputMessage(msg: message) {
    const div = document.createElement('div')
    div.innerHTML = `<p> ${msg.author}: ${msg.message}</p>`
    document.querySelector<HTMLDivElement>('.chat-messages')!.appendChild(div)
}

function sendMessage() {
    const messageText = document!.querySelector('#msgInput')

    // Emit message to the server
    //@ts-ignore
    socket.emit('messageClient', messageText!.value)
}


const canvas = <HTMLCanvasElement>document.querySelector('#grid')
const context = canvas.getContext('2d')

context?.scale(20, 20)
context!.fillStyle = '#454a4d'
context?.fillRect(0, 0, canvas.width, canvas.height)

const colors = {
    1: 'blue',
    2: 'green',
    3: 'purple',
    4: 'cyan',
    5: 'yellow',
    6: 'red',
    7: 'pink',
    8: 'orange',
    9: 'white',
    blue: 1,
    green: 2,
    purple: 3,
    cyan: 4,
    yellow: 5,
    red: 6,
    pink: 7,
    orange: 8
}

const negativeColor = {
    '-1': '34, 37, 166',
    '-2': '34, 101, 38',
    '-3': '99, 37, 103',
    '-4': '34, 165, 166',
    '-5': '162, 165, 38',
    '-6': '162, 37, 38',
    '-7': '162, 133, 140',
    '-8': '162, 120, 38',
}

function createArena(arena: number[][]) {
    arena.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                //@ts-ignore
                context!.fillStyle = `${colors[value]}`
                context?.fillRect(x, y, 1, 1)
            } else if (value < 0) {
                //@ts-ignore
                context!.fillStyle = `rgba(${negativeColor[`${value}`]}, 0.5)`
                context?.fillRect(x, y, 1, 1)
            } else {
                context!.fillStyle = '#454a4d'
                context?.fillRect(x, y, 1, 1)
            }
        })
    })
}

function drawMatrix(matrix: number[][], color: string, offset: { x: number, y: number }) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context!.fillStyle = color
                context?.fillRect(x + offset.x, y + offset.y, 1, 1)
            }
        })
    })
}

socket.on('messageServer', (msg: message) => {
    outputMessage(msg)
})


socket.on('updateInfoServer', (info: gameInfo) => {
    const {arena, pos, matrix, color } = info

    createArena(arena)
    drawMatrix(matrix, color, pos)
})