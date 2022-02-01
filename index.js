require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const multer = require('multer');
const bodyParser = multer();


const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
app.use( cors('*') );
app.use( express.static('public') );
app.use( bodyParser.none() );
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(PORT, _ => console.log(`Listening on http://localhost:${PORT}`));