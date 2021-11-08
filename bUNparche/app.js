require('dotenv').config() //el config es para que lea todo el archivoy establezca las variables de entorno
const Server = require('./models/server')


const server = new Server();

server.listen()
