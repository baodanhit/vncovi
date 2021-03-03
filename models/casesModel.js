const mongoose = require('mongoose');
const casesSchema = new mongoose.Schema({
    time_updated: { 
        type: Date, 
        default: Date.now 
    }, 
    data: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model('Cases', casesSchema);