const express = require('express')
const cors = require('cors')


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        

        //middlewares
        this.middlewares();


        //routes api
        this.routes();

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