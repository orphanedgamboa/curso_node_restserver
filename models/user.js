const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true
        
    },
    password: {
        type: String,
        required: [true, 'Password required'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },


});


UserSchema.methods.toJSON = function() {
    const { __v, password, ...userss } = this.toObject();
    return userss;
}

module.exports = model( 'User', UserSchema);