const mongoose = require('mongoose');
const express = require('express');
const app = express();
const home = require('./Routes/home');
const manga = require('./Routes/manga');

const mongoDB = 'mongodb://localhost/mangaApp';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB Server : ', err));

app.use(express.json()); //enable json parsing for expressjs because it's not enabled by default
app.use('/api/manga', manga);
app.use('/', home);
  
const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});