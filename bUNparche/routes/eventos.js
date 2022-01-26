const {Router} = require('express')
const eventController = require('../controllers/eventos')

const router = Router()

router.get('/tiposEvento', eventController.tiposEvento)
router.post('/crearEvento', eventController.crearEvento)

router.post('/confirmarAsistenciaEvento', eventController.confirmarAsistencia)

router.get('/listarEventos',eventController.listarEventos)
router.post('/listarEventosByHour',eventController.listarEventosByHour)
router.post('/verEvento',eventController.verEvento)
router.post('/confirmarAsistenciaEvento',eventController.confirmarAsistencia)
router.post('/listarEventosByType',eventController.listarEventosByType)
router.post('/listarEventosByLocation',eventController.listarEventosByLocation)
router.post('/listarEventosAnteriores',eventController.listarEventosAnteriores)

module.exports = router
