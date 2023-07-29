const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const Papa = require('papaparse');





app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    // const csvData = Papa.unparse(jsonData, { newline: '\n' });
    // fs.writeFileSync('./data.csv',csvData)
    res.json('ok')
});

app.use('/csv-files', express.static('public'));


app.post('/', async (req, res) => {
    const data = await req.body;
    const csvData = Papa.unparse(data, { newline: '\n' });
    fs.writeFileSync('./public/data.csv', csvData);

    res.status(200).json('cool')


})

app.listen(5000, () => {
    console.log('started server')
})