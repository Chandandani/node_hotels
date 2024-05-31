const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //request.body

// const MenuItem=require('./models/MenuItem');

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome!');
});

//use the Routes
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person',personRoutes);
app.use('/menu',MenuItemRoutes);




// Start the server only after the database connection is established
db.once('connected', () => {
    app.listen(3000, () => {
        console.log('Server is Active on port 3000!');
    });
});
