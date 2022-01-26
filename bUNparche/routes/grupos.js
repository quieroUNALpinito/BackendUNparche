const {Router} = require('express')
const groupController = require('../controllers/grupos2')

const router = Router()

router.get('/verGrupos', groupController.grCategoriasGet)
router.post('/crearGrupo',groupController.crearGrupo)
router.post('/listarMiembros',groupController.listarMiembros)
router.post('/updatePermiso',groupController.updatePermiso)
router.post('/buscarGrupos', groupController.buscarGrupos)
router.post('/buscarGruposPorNombre', groupController.buscarGruposPorNombre)

module.exports = router

