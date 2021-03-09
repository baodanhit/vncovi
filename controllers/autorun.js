// /controllers/autorun.js
// !model
const Cases = require('../models/casesModel');

// !export
module.exports = autorun = () => {
    const schedule = require('node-schedule');
    const rule = new schedule.RecurrenceRule();
    rule.tz = 'Asia/Ho_Chi_Minh';
    rule.hour = 23;
    rule.minute = 58;
    const job = schedule.scheduleJob(rule, function () {
        let crawlData = require('./crawler');
        let updateTime = crawlData.updateTime;
        let vietnam = crawlData.vietnam;
        let world = crawlData.world;
        insertData(updateTime, vietnam, world);
    });
    var insertData = (time, vietnam, world) => {
        let document = {
            time_updated: time,
            vietnam: vietnam,
            world: world
        };
        let caseCollection = new Cases(document);
        caseCollection.save((err, data) => {
            if (err) return console.error(err);
            console.log(data)
        })
    }
}