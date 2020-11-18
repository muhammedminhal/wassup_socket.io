
var socket = io()
let name;
var textarea =document.getElementById('textarea');
var messageArea = document.querySelector('.message_area')


// appear name and wont go until enterd
do{
    name =prompt('please enter yor name')
}while(!name)

// if enter pressed the value from text area will be taken
textarea.addEventListener('keyup',(e)=>{
    if(e.key ==='Enter'){
        sendMessage(e.target.value)
    }
})
// 

function sendMessage(message){
    // formating the msg and there will be msg diplayed with name
    let msg={
        user:name,
        message:message.trim()
    }
    // appending msg to main box
    appendMessage(msg,'outgoing')
    textarea.value=''
    messageScroll()
 // send tp server
     socket.emit('message',msg)
}

// putting msg into the msg body

function appendMessage(msg,type){

    // create a div in the meassage main box
let mainDiv = document.createElement('div');

let className = type

// based on the type of message clases are made so that styling can be given accodinglyy
mainDiv.classList.add(className,'message')

let markup=`

<h4> ${msg.user}<h4>
<p>${msg.message}<p>

`
mainDiv.innerHTML =markup
// now everything is in maindiv so we should append it into the main message area
messageArea.appendChild(mainDiv)
}

// incoming client side

socket.on('message',(msg)=>{

     appendMessage(msg,'incoming')
     messageScroll()
})

function messageScroll(){
    messageArea.scrollTop =messageArea.scrollHeight
}