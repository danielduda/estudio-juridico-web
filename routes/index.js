var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var testimoniosModel = require('../models/testimoniosModel');

var cloudinary = require(`cloudinary`).v2;

/* GET home page. */
router.get('/', async function(req, res, next) {

  var novedades= await novedadesModel.getNovedades();
  var testimonios = await testimoniosModel.getTestimonios();

  novedades= novedades.splice (0,5); //selecciona los primeros 5 elementos del array
  novedades = novedades.map (novedad =>{

    if(novedad.img_id){
  
        const imagen = cloudinary.url (novedad.img_id, {
            width:460,
            crop: `fill`
  
        });
        return {
          ...novedad,
          imagen
        }
    } else{
      return {
        ...novedad,
        imagen: `/images/nodisponible.jpeg`
      }
    }
  
  });

res.render('index',{novedades,testimonios});
});

router.post ('/', async (req, res, next) => {

  console.log(req.body) //captura de datos.

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.tel;
  var mensaje = req.body.mensaje;



  
  var obj = {

    to: 'danielosvaldoduda93@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre + " " + apellido + " se contactó a través de la web y quiere más info a este correo: " + email +". <br> Además, hizo el siguiente comentario: " + mensaje + ". <br> Su tel es: " + telefono

  } //cierre llave object

var transporter = nodemailer.createTransport({

  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth:{

      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
  }  //cierre llave auth



});

var info = await transporter.sendMail(obj);

res.render ('index', {

  message: 'Mensaje enviado correctamente!!'

}); //cierre llaves info.


}); //cierre petición del post 






module.exports = router;
