const {response} = require('express');
const bcrypts = require('bcryptjs');

const User = require('../models/user');


const userGet = (req, res = response)  => {
    
    const {q, nombre='no name', apikey} = req.query;
    res.json({
     msg: 'get Api-controller',
     q, nombre, apikey
    });
}


const userPost = async (req, res = response) =>{

   
    const {name, email, password, rol} = req.body;
    const user = new User({name, email, password, rol});
    //console.log(user.name);
    //Encrypt
    const existeEmail = await User.findOne({email});
    if (existeEmail){
      return res.status(400).json({
        msg: "Email exist"
      })
    }
    const salt = bcrypts.genSaltSync();

    user.password = bcrypts.hashSync( password, salt);

    await user.save();
    res.json({
     msg: 'POST Worldsss',
     user
    })
}

const userPut = (req, res = response) => {
  const  { id }  = req.params;
    res.json({
     msg: 'PUT World',
     id
    })
  }

const userDelete = (req, res = response)  =>{
    res.json({
     msg: 'DELETE World'
    })
  }  

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}