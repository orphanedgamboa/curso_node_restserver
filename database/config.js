const mongoose = require('mongoose');

const dbConnection = async () => {

    try{

        await mongoose.connect( process.env.MONGODB_CNN ,{
           
        } );

        console.log('bd connection online');

    }catch(error){
        console.log(error);
        throw new Error('Error en iniciio de base de datos');
    }
}

module.exports = {
    dbConnection
}