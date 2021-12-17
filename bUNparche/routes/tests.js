const {Router} = require('express')
const testController = require('../controllers/test')

const router = Router()

router.get('/dynamicGetTest', testController.getTest)
router.post('/dinamicPostTest', testController.getTest)

module.exports = router