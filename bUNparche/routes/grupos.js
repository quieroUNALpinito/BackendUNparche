const {Router} = require('express')
const groupController = require('../controllers/grupos2')

const router = Router()

router.get('/verGrupos', groupController.grCategoriasGet)
router.post('/crearGrupo',groupController.crearGrupo)

module.exports = router

