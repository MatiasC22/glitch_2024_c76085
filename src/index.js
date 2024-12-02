import express from "express";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRoutes from './routes/views.routes.js';

import {Server, Socket} from 'socket.io'

const app = express();
const PORT = process.env.PORT || 9090;

// Midelware de configuracion, son configuraciones del 
// trafico entrante de los puertos

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//---------Configuramos Handlebars ---------------//

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname+ '/views');
app.set('view engine', 'handlebars');



// Le indicamos al server que el directorio publico es publico!!
app.use(express.static(__dirname + '/public'));


//---------Ruta de Prueba Parta HBS---






//Enpoint de telemetria , es una forma de saber si el servidor esta arriba 
app.get('/ping',(req,res)=>{
    res.render('index',{});
})



//Routes
app.use("/", viewsRoutes);


const httpServer = app.listen(PORT,()=>{
    console.log(`Server corriendo en el puerto ${PORT}`);
})



// ------------Instanciamos Socket.io------------

const socketServer = new Server(httpServer);


//---- Creamos un Canal de COmunicacion hacia el Cliente

console.log("test 01")

const messages = [];

socketServer.on ('connection', socket =>{
    //Todo LO que sea SOCKET, VA AQUI!!!
    



    //-------Segunda Parte-----------//

    socket.on('message',data =>{
        console.log("Recibido: " ,data);
        
        messages.push (data)
        socketServer.emit('messageLogs',messages);
    })

    // Hascemos un Brodcast del nuevbo Usuario que se Conecto al Server
    //Prinmero escuchamos el evento
    socket.on('userConnected',data =>{
        socket.broadcast.emit('userConnected',data.user)
    })
    

})