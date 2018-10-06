const express = require('express');
const mongoose = require('mongoose');
const os = require('os');

mongoose.connect('mongodb://localhost:27017/Metallica', {useNewUrlParser: true},(err, client) => {
    if(err) {
        console.log("Error in connecting to MongoDB - " + err);
    } else {
        console.log("Successfully connected to MongoDB");
    }
});


const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(8080, () => console.log('Listening on port 8080!'));
