const {response} = require('express');

const userGet = (req, res = response)  => {
    
    const {q, nombre='no name', apikey} = req.query;
    res.json({
     msg: 'get Api-controller',
     q, nombre, apikey
    });
}


const userPost = (req, res = response) =>{
    //const body = req.body;
    const {nombre, edad} = req.body;
    res.json({
     msg: 'POST World',
     nombre, edad
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