const router = require('express').Router();
const { connection } = require("../db");

router.post('/api/setor/create', (req, res) => {
    const setor = req.body.setor;
    connection.query('INSERT INTO setorTB (setor) VALUES (?)', [setor],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      });
  });
  
  router.get("/api/setor", (req, res) => {
  
    connection.query("SELECT * FROM setorTB", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  router.delete("/api/delete/setor/:idSetor", (req, res) => {
    const idSetor = req.params.idSetor;
    connection.query(`DELETE FROM setorTB WHERE  id_setor=${idSetor}`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  });

module.exports = router;