const nodemailer = require('nodemailer');
const hbs = require('hbs');
const fs = require('fs');

const transporter = nodemailer.createTransport({ //metodo createTrasport para generar los parametros del correo que enviara los correos
    service: "Gmail",
    auth: { // SE CREAN VARIABLES DE ENTORNO PARA EL USER Y PASS
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
});

const generateHtml = (filename, options) => { //funcion para enviar un hbs como html en un coreo
  const html = hbs.compile(fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`),"utf8")) // fs=filesystem, readFileSync //metodo
  return html(options)
}

exports.send = (options) => { //exportamos la arrow function
  const html = generateHtml(options.filename, options)
  const mailOptions = { 
      from: "😈😈Gusano Mail😈😈 <noreply@gusano.com>",
      to: options.email,
      subject: options.subject,
      text: options.message,
      html
    };
    return transporter.sendMail(mailOptions) //metodo que se encargara de enviar el correo
}