const express = require('express');
const router = express.Router();
const {DateTime} = require("luxon");
const Agendamento = require('../datamodel/Agendamento');
const gerenciadorDeAgendamento = require('../manager/gerenciadorDeAgendamento');

router.put('/agendamento/', async (request, response) => {
    try{
        const body = request.body;
        if(!body || !body.id){
            throw "Id obrigatório";
        }

        const update = {};
        if(body.dia){
            update.dia = body.dia;
        }

        if(body.horario){
            update.horario = await new Date(body.horario);
        }

        if(body.tempo){
            update.tempo = body.tempo;
        }

        await Agendamento.findOneAndUpdate({_id:body.id}, update);
        await gerenciadorDeAgendamento.carregarAgendamentos();
        return response.status(200).send();

    }catch(err){
        const resBody = {
            msg: err
        };
        return response.status(500).json(resBody);
    }
});

module.exports = router;