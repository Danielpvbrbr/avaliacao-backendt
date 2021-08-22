const router = require('express').Router()
const { connection } = require("../db");
const multer = require('multer');
const path = require('path');

router.post('/api/cadastro/produtos', (req, res) => {
  const descricao_produt = req.body.descricao_produt;
  const forn_produt = req.body.forn_produt;
  const unidade_produt = req.body.unidade_produt;
  const local_produt = req.body.local_produt;
  const referencia_produt = req.body.referencia_produt;
  const fabricante_produt = req.body.fabricante_produt;
  const cod_barras_produt = req.body.cod_barras_produt;
  const setor_produt = req.body.setor_produt;
  const cod_interno_produt = req.body.cod_interno_produt;
  const preco_custo_produt = req.body.preco_custo_produt;
  const preco_venda_produt = req.body.preco_venda_produt;
  const preco_atacado_produt = req.body.preco_atacado_produt;
  const preco_promo_produt = req.body.preco_promo_produt;
  const estoque_atual_produt = req.body.estoque_atual_produt;
  const data_cadastro_produt = req.body.data_cadastro_produt;
  const foto_produt = req.body.foto_produt;

  connection.query("INSERT INTO produtosTB (descricao_produt, forn_produt, unidade_produt, local_produt, referencia_produt, fabricante_produt, cod_barras_produt, setor_produt, cod_interno_produt, preco_custo_produt, preco_venda_produt, preco_atacado_produt, preco_promo_produt, estoque_atual_produt, data_cadastro_produt, foto_produt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
    descricao_produt,
    forn_produt,
    unidade_produt,
    local_produt,
    referencia_produt,
    fabricante_produt,
    cod_barras_produt,
    setor_produt,
    cod_interno_produt,
    preco_custo_produt,
    preco_venda_produt,
    preco_atacado_produt,
    preco_promo_produt,
    estoque_atual_produt,
    data_cadastro_produt,
    foto_produt
  ], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

router.put('/api/update/cadastro/produtos', (req, res) => {
  const id = req.body.id;
  const description = req.body.description;
  const provider = req.body.provider;
  const unity = req.body.unity;
  const localization = req.body.localization;
  const reference = req.body.reference;
  const manufacturer = req.body.manufacturer;
  const barCode = req.body.barCode;
  const sector = req.body.sector;
  const internalCode = req.body.internalCode;
  const costPrice = req.body.costPrice;
  const salePrice = req.body.salePrice;
  const wholesalePrice = req.body.wholesalePrice;
  const promotionalPrice = req.body.promotionalPrice;
  const currentInventory = req.body.currentInventory;
  connection.query(`UPDATE produtosTB SET descricao_produt=?, forn_produt=?, unidade_produt=?, local_produt=?, referencia_produt=?, fabricante_produt=?, cod_barras_produt=?, setor_produt=?, cod_interno_produt=?, preco_custo_produt=?, preco_venda_produt=?, preco_atacado_produt=?, preco_promo_produt=?, estoque_atual_produt=? WHERE id_produtos = ${id}`, [
    description,
    provider,
    unity,
    localization,
    reference,
    manufacturer,
    barCode,
    sector,
    internalCode,
    costPrice,
    salePrice,
    wholesalePrice,
    promotionalPrice,
    currentInventory,
  ], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})


router.get("/api/produtos/estoque/:search", (req, res) => {
  const search = req.params.search
  connection.query(`SELECT * FROM produtosTB WHERE descricao_produt LIKE '%%${search}%%'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

router.get("/api/produtos/:id", (req, res) => {
  const id = req.params.id
  connection.query(`SELECT * FROM produtosTB WHERE id_produtos=${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

router.get("/api/produtos", (req, res) => {

  connection.query('SELECT * FROM produtosTB',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

router.delete("/api/produtos/estoque/:id", (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM produtosTB WHERE id_produtos = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'routes/upload/produtos')
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date()}-${file.originalname}`)
  }
});

const upload = multer({ storage });

router.post("/api/img", upload.single("IMG"), async (req, res) => {

  console.log(req.file.filename)
  res.send(req.file.originalname);
  // res.send('200')
});

router.get('/api/img/toView', function (req, res, next) {
  const options = {
    root: path.join(__dirname)
  };

  const fileName = `./upload/produtos/Thu Aug 12 2021 14:28:48 GMT-0300 (Horário Padrão de Brasília)-Captura de tela de 2021-07-28 21-59-27.png`;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });

});

module.exports = router;