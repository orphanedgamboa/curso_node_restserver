const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user.controlers');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/',userGet);


router.post('/',  [
    check('name', 'name is required').not().isEmail(),
    check('password', 'Password is required and 6 letters').isLength({min: 6}),
    check('email', 'Email not valid').isEmail(),
    check('rol', 'Not rol register').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
],userPost);

router.put('/:id',  userPut);

router.delete('/',  userDelete);




module.exports = router;