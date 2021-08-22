const Router = require('router');
const router = Router();
const login = require('./login');
const setor = require('./setor');
const cargo = require('./cargo');
const funcionario = require('./funcionario');
const produto = require('./produto');
const clientes = require('./clientes');
const constaApagar = require('./constaApagar');
const constaAreceber = require('./constaAreceber');

router.get('/', (req, res, next) => {
  res.status(200).send({
    message: "API funcionando!"
  });
});

router.get('/auth/login', (req, res, next) => {
  res.status(200).send({
    message: "Login realizado com suceesso!"
  });
});

router.get('/api/acess/users', login);
router.post('/api/login/:User/:Pass', login);
router.post('/api/cria/acesso/login', login);


router.post('/api/setor/create', setor);
router.get('/api/setor', setor);
router.delete('/api/delete/setor/:idSetor', setor);


router.post('/api/cargo/create', cargo);
router.get('/api/cargo', cargo);
router.delete('/api/delete/cargo/:idCargo', cargo);


router.post('/api/registro/funcionario', funcionario);
router.get('/api/funcionario', funcionario);


router.post('/api/registro/clientes', clientes);
router.get('/api/clientes', clientes);


router.post('/api/cadastro/produtos', produto);
router.put('/api/update/cadastro/produtos', produto);
router.get('/api/produtos', produto);
router.get('/api/produtos/estoque/:search', produto);
router.get('/api/produtos/:id', produto);
router.delete('/api/produtos/estoque/:id', produto);
router.post('/api/img', produto);
router.get('/api/img/toView', produto);


router.post('/api/cadastro/pagamentos', constaApagar);
router.get('/api/conta/pagamentos', constaApagar);
router.delete('/api/listas/contaP/:id', constaApagar);


router.post('/api/cadastro/receber', constaAreceber);
router.get('/api/conta/receber', constaAreceber);
router.delete('/api/listas/contaP/:id', constaAreceber);

module.exports = router;