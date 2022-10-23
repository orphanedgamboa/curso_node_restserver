const {response} = require('express');
const bcrypts = require('bcryptjs');

const User = require('../models/user');
const { isEmailExist } = require('../helpers/db-validators');


const userGet = async (req, res = response)  => {
    
    //const {q, nombre='no name', apikey} = req.query;
    const {limit = 5, since = 0} = req.query;
    const query = {status:true};
/*
    const nameUser = await User.find({ status: true}).limit(Number(limit)).skip(Number(since))
    const total = await User.countDocuments();
    res.json({
      total,
     nameUser
    });*/
    const [total, users] = await Promise.all([
      User.count(query),
      User.find(query).skip(Number(since)).limit(Number(limit))
    ])
    res.json({
      total, users
    })
}


const userPost = async (req, res = response) =>{

   
    const {name, email, password, rol} = req.body;
    const user = new User({name, email, password, rol});
    //console.log(user.name);
    //Encrypt
    /*const existeEmail = await User.findOne({email});
    if (existeEmail){
      return res.status(400).json({
        msg: "Email exist"
      })
    }*/
    const existeEmail = await isEmailExist(email);

    const salt = bcrypts.genSaltSync();

    user.password = bcrypts.hashSync( password, salt);

    await user.save();
    res.json({
     msg: 'POST Worldsss',
     user
    })
}

const userPut =  async (req, res = response) => {
  const  { id }  = req.params;
  const { _id, password, google, email, ...resto}=req.body;

  // validate in data base

  if (password){
    const salt = bcrypts.genSaltSync();

    resto.password = bcrypts.hashSync( password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, resto);
    res.json({
     msg: 'PUT user',
     userDB
    })
  }

const userDelete = async (req, res = response)  =>{
    const { id } = req.params;

    /*const user = await User.findByIdAndDelete(id);*/
    const user = await User.findByIdAndUpdate(id, {status: false});
    res.json({
     
     user
    })
    //res.json(user)
  }  

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}