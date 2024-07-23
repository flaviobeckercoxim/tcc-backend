const express = require('express');
const router = express.Router();
const Agendamento = require('../datamodel/Agendamento');

router.get('/agendamento/', async (request, response) => {
    try{
        const agendamentos = await Agendamento.find().sort({dia:'asc'});
        return response.status(200).json(agendamentos);
    }catch(err){
        const resBody = {
            msg: err
        };
        return response.status(500).json(resBody);
    }
});

module.exports = router;