const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        this.connectionDB();

        

        

        //middlewares
        this.middlewares();


        //routes api
        this.routes();

    }

    async connectionDB (){

        await dbConnection();

    }

    middlewares() {

        //CORS
        this.app.use( cors() );
        //lectura y parseo

        this.app.use(express.json());
        //directory public
        this.app.use( express.static('public'))
    }


    routes(){
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
    }

    listen(){

        this.app.listen(this.port, ()=>{
            console.log('servidor ejecutando en puerto', this.port);
        });
    }
}

module.exports = Server;