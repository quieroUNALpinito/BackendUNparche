const express = require('express')
const cors = require('cors')



class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.eventosPath = '/api/eventos'
        
        //Conectar BD



        //middlewares
        this.middlewares()

        //rutas de mi app
        this.routes()
    }
    

middlewares() {
    //CORS
    this.app.use(cors())

    //Este middleware es para recibir los metodos post y hace un parseo y lectura del body
    this.app.use(express.json())

    //Para manejar objetos que vienen desde un formulario
    this.app.use(express.urlencoded({ extended: false }))

    //Para usar la carpeta publica que es el frontend donde el usuario ve  la app
    this.app.use(express.static('public'))

}
//configuro mis rutas
routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'))
    this.app.use(this.eventosPath, require('../routes/eventos'))
}


listen() {
    this.app.listen(this.port, () => {
        console.log('server corriendo en el puerto ', this.port);
    })
}
}

module.exports = Server