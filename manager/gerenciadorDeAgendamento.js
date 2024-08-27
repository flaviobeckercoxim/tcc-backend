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
        console.log("Gerenciador inicado.");
        let that = this;
        this.verificador = setInterval(async function () {
            await that.verificarAgendamentos(that);
            await that.verificarrAgendamentosAtivos(that);
            },this.verificadorTimeOut*1000);
    },
    carregarAgendamentos: async function ()  {
        this.agendamentos = await Agendamento.find().sort({dia:'asc'});
        console.log(new Date());
        for(let i in this.agendamentos){
            console.log(this.agendamentos[i]);
        }
    },
    verificarAgendamentos: async function (that){
        let agora = DateTime.now();
        for(let key in that.agendamentos){
            let agendamento = that.agendamentos[key];
            if(agendamento.dia !== agora.weekday){
                continue;
            }

            let inicio = DateTime.fromJSDate(agendamento.horario);
            let fim = inicio.plus({minutes:agendamento.tempo});

            if(agora >= inicio && agora <= fim && ! this.agendamentosAtivos.includes(agendamento)){
                this.acionarIrrigacao(agendamento.tempo, agendamento);
                this.agendamentosAtivos.push(agendamento);
            }
        }
    },
    verificarrAgendamentosAtivos: async function(that){
        let agora = DateTime.now();
        for(let key in that.agendamentosAtivos){
            let agendamento = that.agendamentosAtivos[key];
            let inicio = DateTime.fromJSDate(agendamento.horario);
            let fim = inicio.plus({minutes:agendamento.tempo});
            if(agora >= fim){
                console.log("irrigação terminada");
                this.agendamentosAtivos.splice(key,1);
            }
        }
    },
    acionarIrrigacao: function (tempo,agendamento){
        console.log("acionando a irrigação");
        let payload={
            com: 1,
            tem: agendamento.tempo
        }
        this.broker.publish({topic:'/comando',payload:JSON.stringify(payload)});
    }
}