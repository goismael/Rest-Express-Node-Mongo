'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let contacts = require('./data');
app.use(bodyParser.json)
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

    const requestId = request.params.id;

    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    });
    if (!contact) {
        response.status(404).json({ message: "no contact found" });
    }
    response.json(contact[0]);
});


//POST method implementation
app.post('/api/contacts', (request, response) => {
    const contact = {
        id: contacts.length + 1,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email
    }
    contacts.push(contact);
    response.json(contact);
});


//PUT request for editing contacts
app.put('/api/contacts/:id', (request, response) => {
    const requestId = request.params.id;
    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    })[0];

    const index = contacts.indexOf(contact);
    const keys = Object.keys(request.body);
    keys.forEach(key => {
        contact[key] = request.body[key];
    });
    contacts[index] = contact;
    response.json(contacts[index]);

});


//DELETE request to delete contact we do not want
app.delete('/api/contacts/:id', (request, response) => {
    const requestId = request.params.id;
    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    })[0];


    const index = contacts.indexOf(contact);
    contacts.splice(index, 1);
    response.json({
        message: 'user ' + requestId + ' deleted.'
    });
});


const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {
    console.log('server is listening at ' +
        hostname + " " + port);
});