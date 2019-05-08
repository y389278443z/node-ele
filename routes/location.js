const express = require('express');
const locApi = require('../controller/location');

const app = express();


app.get('/guessCity', locApi.GuessCity);
app.get('/hotCity', locApi.hotCity);
app.get('/allCity', locApi.getAllCity);
app.get('/searchPlace', locApi.searchPlace);


module.exports = app;

