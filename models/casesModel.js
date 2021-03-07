const mongoose = require('mongoose');
const casesSchema = new mongoose.Schema({
    time_updated: { 
        type: Date, 
        default: Date.now 
    }, 
    vietnam: mongoose.Schema.Types.Mixed,
    world: mongoose.Schema.Types.Mixed,
});
module.exports = mongoose.model('Cases', casesSchema);