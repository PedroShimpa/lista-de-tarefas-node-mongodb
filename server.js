require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('conectado com sucesso a base de dados')
        app.emit('pronto');
    })
    .catch(e => console.log(e));


const routes = require('./routes');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(routes);
app.on('pronto', () => {
app.listen(3000)
});