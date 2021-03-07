// const mongoose = require('mongoose');
// const db_conn = require('../models/database').connection;
const Cases = require('../models/casesModel');
const crawlData = require('./crawler');
console.log(Object.keys(crawlData));

let latestData = {};
let getLatestData = () => (
    Cases.findOne()
        .sort({ time_updated: -1 })
        .limit(1)
        .exec(function (err, res) {
            if (err) {
                // console.log(err);
                return {}
            }
            else {
                // console.log(res);
                return latestData = res;
            }
        })
);
getLatestData();

let convertToNumber = (n) => (+ n.replace(/\./g, ''));
function getNewCases() {
    let newCases = {};
    try {
        newCases = {
            timeline: latestData.time_updated,
            vietnam: {
                total: convertToNumber(crawlData.vietnam.total) - convertToNumber(latestData.vietnam.total),
                active: convertToNumber(crawlData.vietnam.active) - convertToNumber(latestData.vietnam.active),
                recovered: convertToNumber(crawlData.vietnam.recovered) - convertToNumber(latestData.vietnam.recovered),
                dead: convertToNumber(crawlData.vietnam.dead) - convertToNumber(latestData.vietnam.dead)
            },
            world: {
                total: convertToNumber(crawlData.world.total) - convertToNumber(latestData.world.total),
                active: convertToNumber(crawlData.world.active) - convertToNumber(latestData.world.active),
                recovered: convertToNumber(crawlData.world.recovered) - convertToNumber(latestData.world.recovered),
                dead: convertToNumber(crawlData.world.dead) - convertToNumber(latestData.world.dead)
            }
        };
        console.log(newCases);
        return newCases
    }
    catch (err) {
        console.log(err)
        return {};
    }
}
module.exports = {
    index: (req, res) => {
        res.render('home', {
            data: crawlData,
            newCases: getNewCases()
        });
    }
}