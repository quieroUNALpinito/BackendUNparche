require('dotenv').config() //el config es para que lea todo el archivoy establezca las variables de entorno
const Server = require('./models/server')
//let correo = 'jccolmenaress@unal.edu.ca'
//let regex = /[ ]*[A-Za-z0-9._%+-]+@unal\.edu\.co[ ]*$/
//console.log(regex.test(correo))

const server = new Server();

server.listen()
