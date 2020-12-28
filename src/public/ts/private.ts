//@ts-ignore
const socket = io()

interface message{
    author: string,
    message: string
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

socket.on('messageServer', (msg: message) => {
    outputMessage(msg)
})