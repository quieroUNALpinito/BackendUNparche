const {Router} = require('express')
const eventController = require('../controllers/eventos')

const router = Router()

router.get('/tiposEvento', eventController.tiposEvento)
router.post('/crearEvento')


module.exports = router