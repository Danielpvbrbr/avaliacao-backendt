const router = require('express').Router()
const { connection } = require("../db");

router.post('/api/cadastro/pagamentos', (req, res) => {
  const documentNumber = req.body.documentNumber;
  const description = req.body.description;
  const Provider = req.body.Provider;
  const issueDate = req.body.issueDate;
  const source = req.body.source;
  const maturity = req.body.maturity;
  const accountValue = req.body.accountValue;
  const numberOfInstallments = req.body.numberOfInstallments;
  const category = req.body.category;
  const typeOfPayment = req.body.typeOfPayment;
  const dateC = req.body.dateC;

  connection.query("INSERT INTO contas_a_pagar (numero_doc, descricao, fornecedor, data_emissao, origem, data_vencimento, valor_conta, numero_parcelas, categoria, tipo_pagamento, dataCadastro)  VALUES (?,?,?,?,?,?,?,?,?,?,?)", [
    documentNumber,
    description,
    Provider,
    issueDate,
    source,
    maturity,
    accountValue,
    numberOfInstallments,
    category,
    typeOfPayment,
    dateC,
  ], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

router.get("/api/conta/pagamentos", (req, res) => {
  connection.query('SELECT * FROM contas_a_pagar',
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