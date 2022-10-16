const Role = require('../models/rol');

const isRolValidate =  async(rol='')=>{
    const existRol = await Role.findOne({rol});
    if (!existRol){
        throw new Error(`Rol no existtt`)
    }
}


module.exports = {
    isRolValidate
}