const router = require('express').Router()
const { connection } = require("../db");

router.post('/api/registro/funcionario', (req, res) => {
  const cod_func = req.body.cod_func;
  const nome_func = req.body.nome_func;
  const sobrenome_func = req.body.sobrenome_func;
  const nascimento_func = req.body.nascimento_func;
  const data_cadastro = req.body.data_cadastro;
  const CPF_func = req.body.CPF_func;
  const celular_func = req.body.celular_func;
  const salario_func = req.body.salario_func;
  const cargo_func = req.body.cargo_func;
  const dia_pagamento_func = req.body.dia_pagamento_func;
  const data_admissao_func = req.body.data_admissao_func;
  const acesso_pdv = req.body.acesso_pdv;
  const senha_operador_func = req.body.senha_operador_func;
  const tipo_func = req.body.tipo_func;
  const email_func = req.body.email_func;

  connection.query("INSERT INTO funcionariosTB ( acesso_pdv, senha_operador_func, tipo_func, cod_func, nome_func, sobrenome_func, nascimento_func, data_cadastro, CPF_func, celular_func, dia_pagamento_func, data_admissao_func, salario_func, cargo_func, email_func) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [acesso_pdv, senha_operador_func, tipo_func, cod_func, nome_func, sobrenome_func, nascimento_func, data_cadastro, CPF_func, celular_func, dia_pagamento_func, data_admissao_func, salario_func, cargo_func, email_func],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })

});

router.get('/api/funcionario', (req, res) => {
  connection.query('SELECT * FROM funcionariosTB', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

module.exports = router;