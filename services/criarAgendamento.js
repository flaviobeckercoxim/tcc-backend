const express = require('express');
const router = express.Router();
const {DateTime} = require("luxon");
const Agendamento = require('../datamodel/Agendamento');
const gerenciadorDeAgendamento = require('../manager/gerenciadorDeAgendamento');

router.post('/agendamento/', async (request, response) => {
    try{
        const body = request.body;
        delete body.id;
        body.horario = await new Date(body.horario);
        const agendamento = new Agendamento(body);
        console.log(agendamento);
        await agendamento.save();
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