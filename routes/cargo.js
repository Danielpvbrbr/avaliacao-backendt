const router = require('express').Router()
const { connection } = require("../db");

router.post('/api/cargo/create', (req, res) => {
    const cargos = req.body.cargos;
    connection.query('INSERT INTO cargoTB ( cargo) VALUES (?)', [cargos],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      });
  });
  
  router.get("/api/cargo", (req, res) => {
  
    connection.query(`SELECT * FROM cargoTB`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  });
  
  router.delete("/api/delete/cargo/:idCargo", (req, res) => {
    const idCargo = req.params.idCargo;
    connection.query(`DELETE FROM cargoTB WHERE id_cargo=${idCargo}`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    });
  });

module.exports = router;