const {Router} = require('express')
const eventController = require('../controllers/eventos')

const router = Router()

router.get('/tiposEvento', eventController.tiposEvento)
router.post('/crearEvento', eventController.crearEvento)


module.exports = router