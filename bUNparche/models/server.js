const express = require('express')
const cors = require('cors')
//const db = require('../database/config')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.eventosPath = '/api/eventos'
        this.recursosPath = '/api/recursos'
        
        //Conectar BD
        //this.dbConnection()


        //middlewares
        this.middlewares()

        //rutas de mi app
        this.routes()
    }
    
//conexion BD
/*async dbConnection(){
    
    try {
        await db.authenticate(); //si molesta probar con authenticate()
        console.log('DB conectada');
        console.log('si ', db)
    } catch (error) {
        throw new Error (error)
    }
}*/




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
    this.app.use(this.recursosPath, require('../routes/recursos'))
}


listen() {
    this.app.listen(this.port, () => {
        console.log('server corriendo en el puerto ', this.port);
    })
}
}

module.exports = Server