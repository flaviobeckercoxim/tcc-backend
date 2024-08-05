const {DateTime} = require("luxon");
const Agendamento = require('../datamodel/Agendamento');

module.exports = {
    agendamentos: [],
    agendamentosAtivos: [],
    verificador: {},
    verificadorTimeOut: 30,
    broker:{},
    iniciar: async function (broker){
        this.broker = broker;
        await this.carregarAgendamentos();
        console.log("gerenciador inicado");
        let that = this;
        this.verificador = setInterval(function (){
            that.verificarAgendamentos(that);
            that.verificarrAgendamentosAtivos(that);
            },this.verificadorTimeOut*1000);
    },
    carregarAgendamentos: async function ()  {
        console.log("carregando agendamentos");
        this.agendamentos = await Agendamento.find().sort({dia:'asc'});
        console.log(new Date());
        for(let i in this.agendamentos){
            console.log(this.agendamentos[i]);
        }
    },
    verificarAgendamentos: async function (that){
        let agora = DateTime.now();
        console.log("verificando Agendamentos");
        for(let key in that.agendamentos){
            let agendamento = that.agendamentos[key];


            console.log("Dia do agendamento: ", agendamento.dia);
            console.log("Dia da semana: ", agora.weekday);

            if(agendamento.dia !== agora.weekday){
                console.log("Dias diferentes");
                continue;
            }

            let inicio = DateTime.fromJSDate(agendamento.horario);
            let fim = inicio.plus({minutes:agendamento.tempo});

<<<<<<< HEAD
            if(agora>=inicio && agora<=fim && !this.agendamentosAtivos.includes(agendamento)){
=======
            if(agora >= inicio && agora <= fim && !agendamento.ativo ){
                console.log("Acionando: ",agendamento);
                agendamento.ativo = true;
>>>>>>> b33ef76b7fbf032c3aefc2af60b7704bd0d9f973
                this.acionarIrrigacao(agendamento.tempo, agendamento);
                this.agendamentosAtivos.push(agendamento);
            }
        }
    },
    verificarrAgendamentosAtivos: async function(that){
        let agora = DateTime.now();
        console.log("verificando Agendamentos ativos");
        for(let key in that.agendamentosAtivos){
            let agendamento = that.agendamentosAtivos[key];
            let inicio = DateTime.fromJSDate(agendamento.horario);
            let fim = inicio.plus({minutes:agendamento.tempo});

            if(agora>=fim){
                console.log("irrigação terminada");
                this.agendamentosAtivos.splice(key,1);
            }
        }
    },
    acionarIrrigacao: function (tempo,agendamento){
        console.log("acionando a irrigação");
<<<<<<< HEAD
        let payload={
            com: 1,
            tem: agendamento.tempo
        }
        this.broker.publish({topic:'/comando',payload:JSON.stringify(payload)});
=======
>>>>>>> b33ef76b7fbf032c3aefc2af60b7704bd0d9f973
    },
}