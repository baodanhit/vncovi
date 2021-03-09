const mongoose = require('mongoose');
const autorun = require('../controllers/autorun');
module.exports = database = {
    // database connection 
    connect: () => {
        const conn = mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).
            catch(err => console.log(err));
        const db = mongoose.connection;
        db.once('open', () => {
            // autorun task
            autorun();

        })
    },
    connection: mongoose.connection
};