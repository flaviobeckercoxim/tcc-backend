const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    dia:{
        type:Number,
        required: true,
    },
    horario:{
        type: Date,
        required: true
    },
    tempo:{
        type: Date,
        required: true
    }
});

module.exports = Agendamento = mongoose.model('Agendamento', schema);