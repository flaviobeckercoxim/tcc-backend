const express = require('express');
const router = express.Router();
const Agendamento = require('../datamodel/Agendamento');

router.delete('/agendamento/:id', async (request, response) => {
    try{
        await Agendamento.deleteOne({_id:request.params.id});
        return response.status(200).send();
    }catch(err){
        const resBody = {
            msg: err
        };
        return response.status(500).json(resBody);
    }
});

module.exports = router;