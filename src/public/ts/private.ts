//@ts-ignore
const socket = io()

import { message, gameInfo } from '../../typings'


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


const canvasIO = <HTMLCanvasElement>document.querySelector('#gridIO')
const contextIO = canvasIO.getContext('2d')

contextIO?.scale(20, 20)
contextIO!.fillStyle = '#454a4d'
contextIO?.fillRect(0, 0, canvasIO.width, canvasIO.height)

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

function createArenaIO(arena: number[][]) {
    arena.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                //@ts-ignore
                contextIO!.fillStyle = `${colors[value]}`
                contextIO?.fillRect(x, y, 1, 1)
            } else if (value < 0) {
                //@ts-ignore
                contextIO!.fillStyle = `rgba(${negativeColor[`${value}`]}, 0.5)`
                contextIO?.fillRect(x, y, 1, 1)
            } else {
                contextIO!.fillStyle = '#454a4d'
                contextIO?.fillRect(x, y, 1, 1)
            }
        })
    })
}

function drawMatrixIO(matrix: number[][], color: string, offset: { x: number, y: number }) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                contextIO!.fillStyle = color
                contextIO?.fillRect(x + offset.x, y + offset.y, 1, 1)
            }
        })
    })
}

socket.on('messageServer', (msg: message) => {
    outputMessage(msg)
})


socket.on('updateInfoServer', (info: gameInfo) => {
    const {arena, pos, matrix, color } = info

    createArenaIO(arena)
    drawMatrixIO(matrix, color, pos)
})





/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

const canvas = <HTMLCanvasElement>document.querySelector('#grid')
const context = canvas.getContext('2d')

context?.scale(20, 20)
context!.fillStyle = '#454a4d'
context?.fillRect(0, 0, canvas.width, canvas.height)

let arena = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const scoreDiv = <HTMLParagraphElement>document.querySelector('#scoreDiv')
const timeDiv = <HTMLParagraphElement>document.querySelector('#timeDiv')


const end = document.querySelector('#end')



const quequeCanvas = <HTMLCanvasElement>document.querySelector('#quequeCanvas')
const contextQuequeCanvas = quequeCanvas.getContext('2d')

contextQuequeCanvas?.scale(23, 23)
contextQuequeCanvas!.fillStyle = '#181a1b'
contextQuequeCanvas?.fillRect(0, 0, quequeCanvas.width, quequeCanvas.height)

let quequeArena = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]



function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 100
        rowCount *= 2;
    }
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

function merge() {
    let finished = false

    player.matrix.forEach((row: number[], y: number) => {
        row.forEach((value, x: number) => {
            if (value !== 0) {
                //@ts-ignore
                if (arena[y + player.pos.y] === undefined) {
                    finished = true

                    return
                } else {
                    //@ts-ignore
                    arena[y + player.pos.y][x + player.pos.x] = colors[player.color]
                }
            }
        })
    })

    if (finished) {
        gameOver()
    }

    arenaSweep()
}

let test = false

function collide() {
    let alteredOne = false
    let alteredTwo = false
    let [m, o] = [player.matrix, player.pos]

        if(arraysEqual(m[m.length - 1], [0, 0, 0])){
            m.pop()
            alteredOne = true
        }else if(arraysEqual(m[m.length - 1], [0, 0, 0, 0])){
            m.pop()
            m.pop()
            alteredTwo = true
        }

    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; x++) {
            if (arena[y + o.y] === undefined) {
                if(alteredOne){
                    player.matrix.push([0, 0, 0])
                }else if(alteredTwo){
                    player.matrix.push([0, 0, 0])
                    player.matrix.push([0, 0, 0])
                }
                return true
            }
            if (m[y][x] > 0 && arena[y + o.y] && arena[y + o.y][x + o.x] > 0 || arena[y + o.y][x + o.x] === undefined && m[y][x] !== 0) {
                if(alteredOne){
                    player.matrix.push([0, 0, 0])
                }else if(alteredTwo){
                    player.matrix.push([0, 0, 0])
                    player.matrix.push([0, 0, 0])
                }
                return true
            }
        }
    }
    if(alteredOne){
        player.matrix.push([0, 0, 0])
    }else if(alteredTwo){
        player.matrix.push([0, 0, 0, 0])
        player.matrix.push([0, 0, 0, 0])
    }

    return false
}

function testing() {
    if (!test) {
        test = true
    } else {
        test = false
    }
}

function collideParams(pos: { x: number, y: number }) {
    const [m, o] = [player.matrix, pos]

    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] > 0 && arena[y + o.y] && arena[y + o.y][x + o.x] > 0 || arena[y + o.y] === undefined && m[y][x] > 0) {
                return true;
            }
        }
    }
    return false
}

function arraysEqual(a1: any, a2: any) {
    return JSON.stringify(a1) == JSON.stringify(a2);
}


function draw() {
    createArena(arena)
    drawMatrix(player.matrix, player.color, player.pos)
}


/* function wait(ms: number) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
} */

let dropCounter = 0
let dropInterval = 1000

let lastTime = 0

let testa = false

let animationId: number;
let isTesting = false

function swicthTesting(){
    if(isTesting){
        isTesting = false
    }else{
        isTesting = true
    }
}
function update(time = 0) {

    socket.emit('updateInfoClient', {arena: arena, pos: player.pos, matrix: player.matrix, color: player.color})

    scoreDiv.innerHTML = `Score: ${player.score}`
    let timeString = `${time}`
    
    if(time < 1000){
        timeDiv.innerHTML = `Time: 0.${timeString.substring(0, 3)}`
    }else if(time > 1000 && time < 10000){
        timeDiv.innerHTML = `Time: ${timeString.substring(0, 1)}.${timeString.substring(1, 3)}`
    }else if(time > 10000 && time < 60000){
        timeDiv.innerHTML = `Time: ${timeString.substring(0, 2)}.${timeString.substring(2, 4)}`
    }else if(time > 60000){
        timeDiv.innerHTML = `Time: ${timeString}`
    }
    if(timeString.substring(0, 5) === '60000' || timeString.substring(0, 6) === '120000' || timeString.substring(0, 6) === '180000'){
        console.log('One minute has passed!')
    }

/* 

Time: ${timeString.substring(0, 1)}.${timeString.substring(1, 3)}

        if(time%100000 === 0){
        console.log('One Minute has passed!')
    }
*/

    if (collide()) {
        merge()
        player.setMatrix()
    }


    const deltaTime = time - lastTime
    lastTime = time

    dropCounter += deltaTime
    if (dropCounter > dropInterval) {
        player.setPos(player.pos.x, player.pos.y + 1)
        if (collide()) {
            player.pos.y--
            merge()
            player.setMatrix()
        }
        dropCounter = 0
    }

    preview()

    draw()
    requestAnimationFrame(update)
}

const firstColorId = Math.round(Math.random() * (8 - 1) + 1)

let pieces = {
    1: [
        [1, 1],
        [1, 1]
    ],
    2: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    3: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    4: [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    5: [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    6: [
        [ 0, 0, 1 ],
        [ 1, 1, 1 ]​,
        [ 0, 0, 0 ],
    ],
    7: [
        [ 1, 0, 0 ],
        [ 1, 1, 1 ],
        [ 0, 0, 0 ],
    ]
}

const firstPieceID = Math.round(Math.random() * (7 - 1) + 1)
//@ts-ignore



let queque: number[][][] = []
let possibility = [1, 2, 3, 4, 5, 6, 7]
let queque2: number[][][] = []

function genQueque(){

    let newQueque = []

    for( let i = 0; i < 7; i++){
        let possibilityIndex = Math.round(Math.random() * (possibility.length - 1) + 0)
        //@ts-ignore
        newQueque.push(pieces[possibility[possibilityIndex]]) 
        possibility.splice(possibilityIndex, 1)
    }

    return newQueque
}

queque = genQueque()


const player: {
    score: number
    pos: { x: number, y: number },
    matrix: number[][],
    color: string,
    setPos: Function,
    setColor: Function,
    setMatrix: Function,
    rotateMatrix: Function,
} = {
    score: 0,
    pos: { x: 5, y: 0 },
    //@ts-ignore
    matrix: pieces[firstPieceID],
    //@ts-ignore
    color: colors[firstColorId],

    setPos(x = player.pos.x, y = player.pos.y) {

        clear()

        const temp = this.pos
        this.pos = { x: x, y: y }

        if (collide()) {
            if (temp.y !== this.pos.y) {
                player.pos.y--
                merge()
                player.setMatrix()
            } else {
                this.pos = temp
            }
        }
    },

    setColor() {

        const colorId = Math.round(Math.random() * (8 - 1) + 1)
        //@ts-ignore
        this.color = colors[colorId]
    },

    setMatrix() {

        pieces = {
            1: [
                [1, 1],
                [1, 1]
            ],
            2: [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ],
            3: [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            4: [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ],
            5: [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1]
            ],
            6: [
                [ 0, 0, 1 ],
                [ 1, 1, 1 ]​,
                [ 0, 0, 0 ],
            ],
            7: [
                [ 1, 0, 0 ],
                [ 1, 1, 1 ],
                [ 0, 0, 0 ],
            ]
        }

        if (queque.length === 7) {
            this.matrix = queque[0]
            this.setPos(4, 0)
            queque.shift()
        }

        if (queque.length < 7) {
            if(!queque2.length){
                possibility = [1, 2, 3, 4, 5, 6, 7]
                queque2 = genQueque()
            }

            queque.push(queque2[0])
            queque2.shift()
        }

        const x = (arena[0].length / 2 | 0) -
        (player.matrix[0].length / 2 | 0)

        this.setPos(x, 0)
        this.setColor()


        quequeArena = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        
        contextQuequeCanvas!.fillStyle = '#181a1b'
        contextQuequeCanvas?.fillRect(0, 0, canvas.width, canvas.height)


        queque.forEach( (piece, space) => {

            if(space >= 4){

            }else{
                piece.forEach( (row, y) => {
                    row.forEach( (value, x) => {
    
                        if(value !== 0){
                                //@ts-ignore
                                quequeArena[y + space * 5][x] = 1
                        }
                    })
                })
            }
        })

        quequeArena.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    //@ts-ignore
                    contextQuequeCanvas!.fillStyle = `${colors[value]}`
                    contextQuequeCanvas?.fillRect(x, y, 1, 1)
                }
            })
        })
    },

    rotateMatrix(dir: number) {

        clear()

        for (let y = 0; y < this.matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    this.matrix[x][y],
                    this.matrix[y][x],
                ] = [
                        this.matrix[y][x],
                        this.matrix[x][y],
                    ];
            }
        }

        if(this.matrix.length === 4){

        }else{
            if (dir > 0) {
                this.matrix.forEach(row => row.reverse());
            } else {
                this.matrix.reverse();
            }
        }

        if (collide()) {
            if (this.pos.x >= 8) {
                if(this.matrix.length !== 4){
                    this.setPos(this.pos.x - 1)
                }else{
                    this.setPos(this.pos.x - 2)
                }
            } else {
                this.setPos(this.pos.x + 1)
            }
        }

        this.matrix.forEach( (row, y) => {
            row.forEach( (value, x) => {
                if(value === undefined){
                    this.matrix[y][x] = 0
                }
            })
        })
    }
}


document.addEventListener('keydown', (event: KeyboardEvent) => {
    const keyEvents = {
        32: () => {
            const temp = player.pos


            if (arraysEqual(player.matrix[player.matrix.length - 1], [0, 0, 0]) || arraysEqual(player.matrix[player.matrix.length - 1], [0, 0, 0, 0]) || player.matrix.length === 2) {
                for (let i = player.pos.y; i <= 18; i++) {
                    if (collideParams({ x: player.pos.x, y: i })) {
                        player.setPos(player.pos.x, i)
                        return
                    }
                }

                if (player.pos === temp) {
                    player.setPos(player.pos.x, 18)
                }
            } else {
                for (let i = player.pos.y; i <= 17; i++) {
                    if (collideParams({ x: player.pos.x, y: i })) {
                        player.setPos(player.pos.x, i)
                        return
                    }
                }

                if (player.pos === temp) {
                    player.setPos(player.pos.x, 17)
                }
            }
        },
        37: () => {
            player.setPos(player.pos.x - 1)
        },
        38: () => {
            player.rotateMatrix(1)
        },
        39: () => {
            player.setPos(player.pos.x + 1)
        },
        40: () => {
            player.setPos(player.pos.x, player.pos.y + 1)
            dropCounter = 0
        }
    }

    if (event.keyCode === 32 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
        //@ts-ignore
        keyEvents[event.keyCode]()
    }
})


function gameOver(){
    if (Number(localStorage.getItem('bestScore')) < player.score) {
        localStorage.setItem('bestScore', `${player.score}`)
    }
    cancelAnimationFrame(animationId)

/*     end!.innerHTML = `GAME OVER! Score: ${player.score}`
    scoreDiv!.innerHTML = `Best Score: ${localStorage.getItem('bestScore')}` */
}


function mergeParams(xPos: number, yPos: number) {
    player.matrix.forEach((row: number[], y: number) => {
        row.forEach((value, x: number) => {
            if (value !== 0) {
                if (arena[y + yPos - 1] === undefined) {
                    gameOver()
                }
                if (arena[y + yPos - 1]) {

                }
                //@ts-ignore
                arena[y + yPos - 1][x + xPos] = -colors[player.color]
            }
        })
    })
}

function preview() {

    if (arraysEqual(player.matrix[player.matrix.length - 1], [0, 0, 0]) || arraysEqual(player.matrix[player.matrix.length - 1], [0, 0, 0, 0]) || player.matrix.length === 2) {
        for (let i = player.pos.y; i <= 19; i++) {
            if (collideParams({ x: player.pos.x, y: i })) {
                mergeParams(player.pos.x, i)
                return
            }
        }
    } else {
        for (let i = player.pos.y; i <= 18; i++) {
            if (collideParams({ x: player.pos.x, y: i })) {
                mergeParams(player.pos.x, i)
                return
            }
        }
    }
}

function clear() {
    arena.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value < 0) {
                arena[y][x] = 0
            }
        })
    })
}

function upHeight(){
    const temp = arena
    let tempFirstLine = arena[arena.length - 1]


    arena.forEach( (row, y) => {
        if(y === arena.length - 1){

        }else{
            if(temp[y + 1] !== undefined){
                arena[y] = temp[y + 1]
            }
        }
    })

    arena[arena.length - 1] = changeValue(tempFirstLine, 9)

}

function changeValue(row: number[], paramValue: number){
    let rowToBeReturned: number[] = []

    row.forEach( (value, index) => {
        if(value > 0){
            rowToBeReturned[index] = paramValue
        }else{
            rowToBeReturned[index] = 0
        }
    })

    return rowToBeReturned
}

update()

function restart(){
    arena = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    update()
}

/* setInterval( function(){
    const temp = arena
    let tempFirstLine = arena[arena.length - 1]


    arena.forEach( (row, y) => {
        if(y === arena.length - 1){

        }else{
            if(temp[y + 1] !== undefined){
                arena[y] = temp[y + 1]
            }
        }
    })

    arena[arena.length - 1] = changeValue(tempFirstLine, 9)
}, 30000) */