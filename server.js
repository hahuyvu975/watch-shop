const express = require('express')
const color = require('colors')
//rest object
const app = express();

//rest api
app.get('/', () => {
    console.log('hello')
})

//PORT
const PORT = 8080

//run listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`.bgCyan.white);
})