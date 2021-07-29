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

app.get('/api/dados/cap/:pisCap', (req, res) => {
    const pis = req.params.pisCap;

    connection.query(`SELECT * FROM AFD_TB WHERE dado_user LIKE "%${pis}%" `,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.post('/api/dados/:getDados', (req, res) => {
    const dados = req.params.getDados;

    connection.query("INSERT IGNORE INTO AFD_TB (dado_user) VALUES (?)", [dados],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.post('/api/registros', (req, res) => {
    const getNome = req.body.getNome;
    const getPis = req.body.getPis;
    const getMat = req.body.getMat;

    connection.query("INSERT IGNORE INTO formularioTB (nome, pis, matricula) VALUES (?,?,?)", [getNome, getPis, getMat],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.get("/api/auth/funcionarios", (req, res) => {
   
    connection.query(`SELECT * FROM formularioTB`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.get("/api/auth/p/:Pis", (req, res) => {
    const pis = req.params.Pis
    connection.query(`SELECT * FROM formularioTB WHERE pis = ${pis}`, (err, result, fields) => {
        if (result) {
            res.send(result)
            // res.redirect('/auth/login');  

        } else {
            res.send('Numero do pis incorreto, ou usuario não cadastrado na base de dados!');
        }
        res.end();
    });
});

app.delete("/api/auth/del/funcionarios/:id", (req, res) => {
const id = req.params.id;
    connection.query(`DELETE FROM formularioTB WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})


app.delete("/api/limparTb", (req, res) => {

    connection.query(`DELETE FROM AFD_TB`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})


app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
    console.log(`Acessar http://localhost:${port}`);
});