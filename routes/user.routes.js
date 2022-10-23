const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/rol');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user.controlers');
const { validateFields } = require('../middlewares/validate-fields');
const { isRolValidate, isEmailExist, existUserID } = require('../helpers/db-validators');

const router = Router();

router.get('/',userGet);


router.post('/',  [
    check('name', 'name is required').not().isEmail(),
    check('password', 'Password is required and 6 letters').isLength({min: 6}),
    check('email', 'Email not valid').isEmail(),
    check('email').custom(isEmailExist),
    //check('rol', 'Not rol register').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //Podria ser
    //check('rol').custom( (rol) => isRolValidate(rol)),
    check('rol').custom(isRolValidate),
    validateFields
],userPost);

router.put('/:id',  [
    check('id', 'Not valid id').isMongoId(),
    check('id').custom(existUserID),
    check('rol').custom(isRolValidate),
    validateFields
],
userPut
);

router.delete('/:id',  [
    check('id', 'Not validx id').isMongoId(),
    check('id').custom(existUserID),
    validateFields
],
userDelete
);




module.exports = router;