const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3001;
const app = express();
const routes = require('./routes/routes');

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", 'DELETE', 'PUT'],
    credentials: true,
  })
);

//Routes
app.use('/', routes);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
});


