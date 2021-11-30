const {Router} = require('express')
const { updatePerfilInfo, getPerfilInfo, usuariosGet, usuariosPost, usuariosPut, googleSignIn} = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')
const {check} = require('express-validator')
const { getUsers } = require('../database/config')

const router = Router()

router.get('/', usuariosGet)
router.post('/', usuariosPost)
router.put('/:id', usuariosPut)
router.post('/updatePerfilInfo', updatePerfilInfo)
router.post('/getPerfilInfo' , getPerfilInfo)

//En el array va el listado de middlewares que validan los datos que se envian del frontend
router.post('/google',[
    check('id_token', 'el id token de google obligatorio').not().isEmpty(),
    validarCampos //Verifica si hay errores con el middleware de arriba

],googleSignIn)

router.get('/users', getUsers)




module.exports = router
