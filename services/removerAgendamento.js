const express = require('express');
const router = express.Router();
const Agendamento = require('../datamodel/Agendamento');
const gerenciadorDeAgendamento = require('../manager/gerenciadorDeAgendamento');

router.delete('/agendamento/:id', async (request, response) => {
    try{
        await Agendamento.deleteOne({_id:request.params.id});
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