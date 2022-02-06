const {Router} = require('express')
const groupController = require('../controllers/grupos2')

const router = Router()

router.get('/verGrupos', groupController.grCategoriasGet)
router.post('/crearGrupo',groupController.crearGrupo)
router.post('/listarMiembros',groupController.listarMiembros)
router.post('/updatePermiso',groupController.updatePermiso)
router.post('/buscarGrupos', groupController.buscarGrupos)
router.post('/buscarGruposPorNombre', groupController.buscarGruposPorNombre)
router.post('/verificarSolicitud',groupController.verificarSolicitud)
router.post('/solicitarMembresia',groupController.solicitarMembresia)
router.post('/buscarMisGrupos', groupController.buscarMisGrupos)
router.post('/updateGrupos', groupController.updateGrupos)
router.post('/buscarMisSolicitudes', groupController.buscarMisSolicitudes)

module.exports = router

