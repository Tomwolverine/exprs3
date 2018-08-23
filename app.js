const express = require('express');
const app = express();

const cors = require('cors');
const csvToJson = require('convert-csv-to-json');
// cosnt port = process.env.PORT || 9000
const port = process.env.PORT || 9000

const bodyParser = require('body-parser')
// cosnt bodyParser = require('body-parser');
const data = require('./students.json');

app.use(cors());
app.use(bodyPaser.json());

let fileInputName = './students.csv';
let fileOutputName = 'students.json';

const findById = (params, dataParam) => {
    for(let i = 0;i < dataParam.length;i++) {
        let idHolder = dataParam[i].ID;
        if(params === idHolder) {
            return dataParam[i];
        }
    }
    return null;
}

csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName);
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);

app.get('/', (request, response) => {
    return response.json({data})
})

app.get('/:id', (request, response) => {
    cosnt students = findById(request.params.id, data);
        if(student) {
            response.json({'data': student});
        } else {
            return response.json({
                error: {
                    "message": 'No record found!'
                }
            })
        }
})

// app.listen(port, () => {console.log(`I am listening on ${port}`)})
app.listen(port, () => {
    console.log(`I am listening on ${port}`)
})