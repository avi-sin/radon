const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const { default: mongoose } = require('mongoose');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://avi-sin:CJTIF4CupXQdRKHV@cluster0.ovf3r.mongodb.net/avi-sinDB", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

