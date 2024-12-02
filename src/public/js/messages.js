// import { text } from "express";



const socket = io();

const chatBox = document.getElementById('chatBox');
let user;


///----------------Sweet Alert------------------///

Swal.fire({
    icon: "info",
    title: "Identificate, Por Favor",
    input: "text",
    text: "Ingrese el userName para Identificarse en el chat",
    color: "#716add",
    inputValidator: (value)=>{
        if(!value){
            return 'Debes Ingresar UserName'
        }else{
            socket.emit('userConnected',{user: value})
        }
    },
    allowOutsideClick: false,
}).then(result =>{
    user = result.value

    //Cargamos el Valor a la Pantalla
    document.getElementById('myName').innerText = user
})



//-------------Socket.io-----------------//

chatBox.addEventListener('keyup',evt =>{
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
         socket.emit('message', {user: user, message: chatBox.value});
         chatBox.value = '';   
        }else{
            Swal.fire({
                icon:"warning",
                title:"Alerta",
                text: "Por Favor Ingrese un Mensaje"
            })
        }   
    }
})

socket.on('messageLogs', data =>{
    const messageLogs = document.getElementById('menssagesLogs')
    let logs = ''

    data.forEach(log => {
        logs += `<strong>${log.user}:</strong> dice: ${log.message}<br/>`
    });

    messageLogs.innerHTML = logs;
})

// ----- Segunda Parte

//Aqui escuchamos los nuevos usuarios que se conectan al chat

socket.on('userConnected', user=>{
    let message = `Nuevo Usuario Conectado: ${user}`
    Swal.fire({
        icon: "info",
        title: "Nuevo Usuario entra al Chat!!",
        text: message,
        toast: true,
        position: "top-end",
    })
})






///////---------------Extras------------------////////////

const closeChatBox = document.getElementById('closeChatBox')

closeChatBox.addEventListener('click', evt =>{
    socket.disconnect()
})