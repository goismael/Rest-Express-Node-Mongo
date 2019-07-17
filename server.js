'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let contacts = require('./data');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Get method implementation using a simple database
app.get('/api/contacts', (request, response) => {
    if (!contacts) {
        response.status(404).json({ message: "no contacts found" });
    }
    // response.send('hello world');
    response.json(contacts);
});

app.get('/api/contacts/:id', (request, response) => {

    const requestId = request.params.id

    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    });
    if (!contact) {
        response.status(404).json({ message: "no contact found" });
    }
    response.json(contact[0]);
});


//POST method implementation


const hostname = 'localhost';
const port = 3002;

app.listen(port, hostname, () => {
    console.log('server is listening at ' +
        hostname + " " + port);
});