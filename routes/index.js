const express = require('express');
const router  = express.Router();
const mailer = require ('../helpers/mailer') //importo la funcion creada en el helper

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req,res) => {
  let options = req.body; //llamamos los parametros de la funcion (to, from, etc)
  options.filename = "verify"
  mailer.send(options) //importamos la funcion llamada send que se encuentra en mailer.js de helpers
  .then(()=>{
    res.status(200).send("el correo se mando")
  })
  .catch(err => {
    console.log("Algo salio mal", err);
    res.status(500).json({err, "msg": "Algo salio mal"})
  })
})

module.exports = router;
