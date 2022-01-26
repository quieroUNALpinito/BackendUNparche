const {Router} = require('express')
const eventController = require('../controllers/eventos')

const router = Router()

router.get('/tiposEvento', eventController.tiposEvento)
router.post('/gruposDeUSuario', eventController.gruposDeUsuario)
router.post('/crearEvento', eventController.crearEvento)

router.post('/confirmarAsistenciaEvento', eventController.confirmarAsistencia)

router.post('/listarEventos',eventController.listarEventos)
router.post('/listarEventosByHour',eventController.listarEventosByHour)
router.post('/verEvento',eventController.verEvento)
router.post('/confirmarAsistenciaEvento',eventController.confirmarAsistencia)
router.post('/desconfirmarAsistenciaEvento',eventController.desconfirmarAsistencia)
router.post('/consultarAsistenciaUsuarioEvento',eventController.consultarAsistenciaUsuarioEvento)
router.post('/listarEventosByType',eventController.listarEventosByType)
router.post('/listarEventosByGroup',eventController.listarEventosByGroup)
router.post('/listarEventosByLocation',eventController.listarEventosByLocation)
router.post('/actualizarEvento', eventController.actualizarEvento)

module.exports = router
