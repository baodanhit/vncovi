// /controllers/autorun.js
// !model
const Cases = require('../models/casesModel');

// !export
module.exports = autorun = () => {
    const schedule = require('node-schedule');
    const time = { hour: 23, minute:59 };
    const job = schedule.scheduleJob(time, function () {
        let crawlData = require('./crawler');
        let data = {
            vietnam: crawlData.vietnam,
            word: crawlData.world
        };
        insertData(data);
    });
    var insertData = (data) => {
        let document = {
            time_updated: Date.now(),
            data: data
        };
        let caseCollection = new Cases(document);
        caseCollection.save((err, data) => {
            if (err) return console.error(err);
            console.log(data)
        })
    }
}