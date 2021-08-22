const router = require('express').Router()
const { connection } = require("../db");

router.post('/api/cadastro/receber', (req, res) => {
  const documentNumber = req.body.documentNumber;
  const clientName = req.body.clientName;
  const issue = req.body.issue;
  const maturity = req.body.maturity;
  const city = req.body.city;
  const CPF_CNPJ = req.body.CPF_CNPJ;
  const telephone = req.body.telephone;
  const guarantor = req.body.guarantor;
  const email = req.body.email;
  const price = req.body.price;
  const typeOfPayment = req.body.typeOfPayment;
  const numberOfInstallments = req.body.numberOfInstallments;
  const comments = req.body.comments;
  const category = req.body.category;
  const clientType = req.body.clientType;
  const status = req.body.status;
  const registrationDate = req.body.registrationDate;

  connection.query("INSERT INTO contas_a_receber (numero_doc, nome, emissao, vencimento, cidade, CPF_CNPJ, telefone, nome_fiador, email, preco, tipo_pagamento, numero_parcelas, observacao, categoria, tipo_cliente, status, dataCadastro) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
    documentNumber,
    clientName,
    issue,
    maturity,
    city,
    CPF_CNPJ,
    telephone,
    guarantor,
    email,
    price,
    typeOfPayment,
    numberOfInstallments.CPF_CNPJ,
    comments,
    category,
    clientType,
    status,
    registrationDate
  ], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send('Cadastro realizado com sucesso!!')
    }
  })
});

router.get("/api/conta/receber", (req, res) => {
  connection.query('SELECT * FROM contas_a_receber',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

router.delete("/api/listas/contaP/:id", (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM contas_a_pagar WHERE id_contas = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

module.exports = router;