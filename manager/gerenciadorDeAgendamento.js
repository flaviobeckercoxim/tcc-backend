const {DateTime} = require("luxon");
const Agendamento = require('../datamodel/Agendamento');

module.exports = {
    agendamentos: [],
    agendamentosAtivos: [],
    verificador: {},
    verificadorTimeOut: 30,
    iniciar: async function (){
        await this.carregarAgendamentos();
        console.log("gerenciador inicado");
        let that = this;
        this.verificador = setInterval(function ()
            {that.verificarAgendamentos(that)},this.verificadorTimeOut*1000);
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
        console.log("verificando Agendamento");
        for(let key in that.agendamentos){
            let agendamento = that.agendamentos[key];


            console.log("Dia do agendamento: ", agendamento.dia);
            console.log("Dia da semana: ", agora.weekday);

            if(agendamento.dia != agora.weekday){
                console.log("Dias diferentes");
                continue;
            }

            let inicio = DateTime.fromJSDate(agendamento.horario);
            let fim = inicio.plus({minutes:agendamento.tempo});

            if(agora >= inicio && agora <= fim && !agendamento.ativo ){
                console.log("Acionando: ",agendamento);
                agendamento.ativo = true;
                this.acionarIrrigacao(agendamento.tempo, agendamento);
            }
        }
    },
    acionarIrrigacao: function (tempo,agendamento){
        console.log("acionando a irrigação");
    },
}