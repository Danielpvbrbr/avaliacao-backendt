const router = require('express').Router()
const { connection } = require("../db");

router.get('/api/clientes', (req, res) => {
  connection.query('SELECT id_clientes, nome_client, email_client, telefone_client, status_client, tipo_client, data_cadastro_client FROM clienteTB', (err, result) => {
    if (result) {
      res.send(result);
    } else (err)
    console.log(err);
  });
});

router.post('/api/registro/clientes', (req, res) => {
  const name = req.body.name;
  const birth = req.body.birth;
  const road = req.body.road;
  const number = req.body.number;
  const district = req.body.district;
  const city = req.body.city;
  const ZipCode = req.body.ZipCode;
  const state = req.body.state;
  const CPF = req.body.CPF;
  const RG = req.body.RG;
  const phone = req.body.phone;
  const guarantorName = req.body.guarantorName;
  const creditLimit = req.body.creditLimit;
  const term = req.body.term;
  const email = req.body.email;
  const comments = req.body.comments;
  const status = req.body.status;
  const type = req.body.type;
  const registrationDate = req.body.registrationDate;

  connection.query("INSERT INTO clienteTB ( nome_client, nascimento_client, rua_client, numero_client, bairro_client, cidade_client, cep_client, UF_client, CPF_client, RG_client, telefone_client, nome_fiador_client, limite_credito_client, prazo_client, email_client, observacao_client, status_client, tipo_client, data_cadastro_client) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [name, birth, road, number, district, city, ZipCode, state, CPF, RG, phone, guarantorName, creditLimit, term, email, comments, type, status,  registrationDate],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })

});


module.exports = router;