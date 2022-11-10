const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
app.use(express.json());
// const {studentModel, adminModel} = require('./studentModel');

mongoose.connect('mongodb+srv://avi-sin:CJTIF4CupXQdRKHV@cluster0.ovf3r.mongodb.net/assignment1')
.then(() => console.log('MongoDB is connected...'), (err) => console.log(err));

app.use(routes);

app.listen(3001, () => console.log("App running on PORT 3001."));