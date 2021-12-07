const db = require('../database/config')
const correos = require('../controllers/correo')

const getTest = async (req,res) => {
    console.log('req recibida')
    correos.sendTestMail()
    res.send({status: 'ok'})
}

const postTest = async (req,res) => {

}

module.exports = {
    getTest,
    postTest
}