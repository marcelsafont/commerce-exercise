const config = require('./config/config');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log(`DB is connected to ${ db.connection.host}`))
    .catch(e => console.error(e));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


module.exports = { mongoose };