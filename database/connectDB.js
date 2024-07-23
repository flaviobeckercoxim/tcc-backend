const mongoose = require('mongoose');
const URI = "mongodb+srv://flaviobecker2014qd3nhLVIXlPlNzX5:C4zlkW1rvkDLxmA0@cluster0.bexdmyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports = async () => {
    try {
        const uri = URI;
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true
        };
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri, options);
        console.log("Conectado ao MongoAtlas!")
    } catch (e) {
        console.log("Problema na conexão com o banco!"+ e)
    }
};