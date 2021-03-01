const mongoose = require('mongoose');
const db_uri = process.env.DATABASE_URI;

// database connection 
const conn = mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true }).
    catch(err => console.log(err));

module.exports = conn;