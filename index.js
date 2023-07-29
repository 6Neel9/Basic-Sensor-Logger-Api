const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const Papa = require('papaparse');
const bodyParser = require('body-parser');


// Set the maximum payload size (e.g., 10mb)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    // const csvData = Papa.unparse(jsonData, { newline: '\n' });
    // fs.writeFileSync('./data.csv',csvData);
    // Read the data from the CSV file
    const csvData = fs.readFileSync('/data.csv', 'utf8');
    res.json(csvData)
});

app.use('/csv-files', express.static('public'));


app.post('/', async (req, res) => {
    const data = await req.body;
    const csvData = Papa.unparse(data, { newline: '\n' });
    fs.writeFileSync('./public/data.csv', csvData);

    res.status(200).json(data);


})

app.listen(5000, () => {
    console.log('started server')
})
