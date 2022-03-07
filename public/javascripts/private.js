const privateForm = document.getElementById('private-form')
const privateMessages = document.querySelector('.private-messages');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io()

// Private Message Join
socket.emit('joinPrivate', { username, room });

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
})


//submit message
privateForm.addEventListener('submit', e => {
    e.preventDefault();

    //get message text
    const msg = e.target.elements.msg.value
    console.log(msg)
    //emit message to server
    socket.emit('privateMessage', msg)

    //Clear the input once I send a message
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})


//Output Message to DOM
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>  ${message.time}</span></p>
    <p class="text">
        ${message.text} </p>`;
    document.querySelector('.private-messages').appendChild(div)
}


