// /controllers/autorun.js
module.exports = autorun = () => {
    const schedule = require('node-schedule');
    const time = {hour: 8, minute: 40};
    const job = schedule.scheduleJob(time, function(){
        console.log('Hi, it time for work');
    });
}