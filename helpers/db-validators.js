const Role = require('../models/rol');
const User = require('../models/user');
const isRolValidate =  async(rol='')=>{
    const existRol = await Role.findOne({rol});
    if (!existRol){
        throw new Error(`Rol no existtt`)
    }
}

const isEmailExist = async(email='')=>{
    const existeEmail = await  User.findOne({email});
    if (existeEmail){
      throw new Error (`Correo existtt`)
    }
}

const existUserID = async(id='')=>{
    const existUserID = await  User.findOne({id});
    if (!existUserID){
      throw new Error (`Id no exists:`+id)
    }
}


module.exports = {
    isRolValidate,
    isEmailExist,
    existUserID
}