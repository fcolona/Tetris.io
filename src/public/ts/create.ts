//@ts-ignore
const socket = io()

interface message{
    author: string,
    message: string
}

const space = <HTMLDivElement>document.querySelector('#space')

function copyToClipboard() {
    const textToBeCopied = space.getAttribute('value')

    //@ts-ignore
    clipboard.writeText(textToBeCopied).then(() => {

    }).cacth((err: Error) => {
        console.log(err)
    })
}

//@ts-ignore
function outputMessage(msg: message) {
    console.log(msg)

    const div = document.createElement('div')
    div.innerHTML = `<p> ${msg.author}: ${msg.message}</p>`
    document.querySelector('.chat-messages')!.appendChild(div)
}

//@ts-ignore
function sendMessage() {
    const messageText = document!.querySelector('#msgInput')

    // Emit message to the server
    //@ts-ignore
    socket.emit('messageClient', messageText!.value)
}


socket.on('genLink', (id: string) => {
    space.innerHTML = `localhost:3000/join/${id}`
    space.setAttribute('value', `localhost:3000/join/${id}`)
})

socket.on('messageServer', (msg: message) => {
    outputMessage(msg)
})