const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
const port = '8000'
const { connection } = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Seja bem-vindo ao meu app!');
});

app.post('/api/cadastro', (req, res) => {
    const getNome = req.body.getNome;
    const getSobrenome = req.body.getSobrenome;
    const getEmail = req.body.getEmail;
    const getUsuario = req.body.getUsuario;
    const getSenha = req.body.getSenha;

    connection.query("INSERT INTO tble1 (nome, sobrenome, email, usuario, senha) VALUES (?,?,?,?,?)", [getNome, getSobrenome, getEmail, getUsuario, getSenha],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.post('/api/form/:IdCockie/:getTitulo/:getCampo', (req, res) => {
    const getTitulo = req.params.getTitulo;
    const getCampo = req.params.getCampo;
    const IdCockie = req.params.IdCockie;

    connection.query("INSERT INTO tble2 (titulo, campoTexto, id_off) VALUES (?,?,?) ", [getTitulo,getCampo,IdCockie],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.put('/api/edit/:getId/:getTitulo/:getCampo', (req, res) => {
    const getId = req.params.getId;
    const getTitulo = req.params.getTitulo;
    const getCampo = req.params.getCampo;

    connection.query("UPDATE tble2 SET titulo = ?, campoTexto = ? WHERE id = ?", [ getTitulo, getCampo, getId ],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.get("/api/list/:IdCockie", (req, res) => {
    const IdCockie = req.params.IdCockie

    connection.query(`SELECT tble2.id, tble1.usuario, tble1.senha, tble2.titulo, tble2.campoTexto FROM tble2 INNER JOIN tble1 ON tble1.id_on = id_off AND tble1.id_on = ${IdCockie}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/api/login/:User/:Pass", (req, res) => {
        const User = req.params.User
        const Pass = req.params.Pass
        console.log(User,Pass)
        connection.query(`SELECT * FROM tble1 WHERE usuario = ? && senha = ?`,[User,Pass] ,(err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM tble2 WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

// app.delete("/api/delete/:id", (req, res) => {
//     const id = req.params.id;
//     connection.query(`DELETE tble1, tble2 FROM tble1 INNER JOIN tble2 ON tble2.id_off  = tble1.id_on WHERE id = ${id}`, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
    console.log(`Acessar http://localhost:${port}`);
});