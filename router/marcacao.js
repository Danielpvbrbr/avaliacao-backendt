const express = require('express');
const app = express();
const { connection } = require('./db');

router.post('/api/cadastro', (req, res) => {
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

app.get("/api/login/:User/:Pass", (req, res) => {
        const User = req.params.User
        const Pass = req.params.Pass

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
