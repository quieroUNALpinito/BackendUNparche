const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    host: 'ec2-18-206-255-71.compute-1.amazonaws.com',
    port: '2500:2500',
    secure: false,
    auth: {
        user: 'user',
        pass: 'user'
    }
});

module.exports = {
    sendTestMail:async function (){
        let contenido = 'test';
        let correo = 'jsromerod@unal.edu.co';
        let info = {
            from: 'test@unparche.com',
            to: correo,
            subject: 'Correo de prueba',
            text: contenido,
        }
        transporter.sendMail(info,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log('correo enviado');
            }
        })
    }
}