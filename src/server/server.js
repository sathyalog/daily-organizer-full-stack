import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

let port = 9999;
let app = express();

app.listen(port, console.log('Server listening', port));

app.get('/', (req, res) => {
    res.send('Hey!! Welcome to express server')
})