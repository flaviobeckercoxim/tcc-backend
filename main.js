const express = require('express');
const app = express();
const aedes = require('aedes')();
const tcpServer = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer(app);
const connectDB = require('./database/connectDB');
const cors = require('cors');
const gerenciadorDeAgendamento = require('./manager/gerenciadorDeAgendamento');
/**
 * DB connection
 */
connectDB();

/**
 * Routes
 */
app.use(cors());
app.use(express.json({extended: false}));
app.use('/services/', require('./services/criarAgendamento'));
app.use('/services/', require('./services/listarAgendamentos'));
app.use('/services/', require('./services/removerAgendamento'));
app.use('/services/', require('./services/atualizarAgendamento'));

const ws = require('websocket-stream')
ws.createServer({ server: httpServer }, aedes.handle)

aedes.on('client',function(client){
	console.log ("Novo Cliente conectado" );
});

tcpServer.listen(1883,function(){
	console.log("Broker MQTT");
});

httpServer.listen(8080,function(){
	console.log ("Servidor HTTP e WS no ar");
	gerenciadorDeAgendamento.iniciar(aedes);
});
