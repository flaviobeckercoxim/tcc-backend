const express = require('express');
const router = express.Router();
const {DateTime} = require("luxon");
const Agendamento = require('../datamodel/Agendamento');

router.post('/agendamento/', async (request, response) => {
    try{
        const body = request.body;
        delete body.id;
        console.log(body);
        body.horario = await new Date(body.horario);
        const agendamento = new Agendamento(body);
        await agendamento.save();
        return response.status(200).send();
    }catch(err){
        const resBody = {
            msg: err
        };
        return response.status(500).json(resBody);
    }
});

module.exports = router;