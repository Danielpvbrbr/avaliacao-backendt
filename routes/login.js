const router = require('express').Router()
const { connection } = require("../db");

router.get("/api/acess/users", (req, res) => {

    connection.query(`SELECT * FROM acesso_sistema`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

router.post("/api/login/:User/:Pass", (req, res) => {
    const User = req.params.User;
    const Pass = req.params.Pass;

    if (User && Pass) {
        connection.query(`SELECT acesso_pdv, CPF_func, senha_operador_func, tipo_func, id_func FROM funcionariosTB WHERE CPF_func = ${User} && senha_operador_func = ${Pass} && acesso_pdv = 'true'`, (err, result,fields) => {
            if (result) {
                res.send(result)
                // res.redirect('/auth/login');  
                
            } else {
                res.send('Nome de usuário ou Senha incorretos!');
            }
            res.end();
        });
    }
});



    router.post('/api/cria/acesso/login', (req, res) => {
        const User = req.body.User;
        const Pass = req.body.Pass;
        const TipoUser = "administrador";
        connection.query(`INSERT INTO acesso_sistema usuario_login=${User}, senha_login=${Pass}, tipo_de_user=${TipoUser}`,
            (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send(result)
                }
            })
    });


    module.exports = router;