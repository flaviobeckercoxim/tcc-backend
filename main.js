const aedes = require('aedes')();

const tcpServer = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer();

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
});