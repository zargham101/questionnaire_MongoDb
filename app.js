const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = require('dotenv');
const { connectDb } = require('./db/connection')

const app = express();

const routes = require('./Route/index');

env.config();

connectDb();

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/user', routes.user);
app.use('/api/question', routes.question);
app.use('/api/response', routes.response);

const http = require('http').Server(app);
http.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));