const {Router} = require('express')
const resourceController = require('../controllers/recursos')

const router = Router()

router.get('/edificiosLugaresOficiales', resourceController.edificiosOficiales)
router.get('/edificiosLugaresOfUbicacion', resourceController.edificiosOfUbicacion)
router.post('/lugarPorEdificio',resourceController.lugarPorEdificio)


module.exports = router
