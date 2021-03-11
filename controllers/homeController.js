const Cases = require('../models/casesModel');
var crawlData = require('./crawler');

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

let getNewCases = () => {
    let newCases = {};
    try {
        newCases = {
            timeline: latestData.time_updated,
            vietnam: {
                total: crawlData.vietnam.total - latestData.vietnam.total,
                recovered: crawlData.vietnam.recovered - latestData.vietnam.recovered,
                dead: crawlData.vietnam.dead - latestData.vietnam.dead,
                active: crawlData.vietnam.active - latestData.vietnam.active
            },
            world: {
                total: crawlData.world.total - latestData.world.total,
                active: crawlData.world.active - latestData.world.active,
                recovered: crawlData.world.recovered - latestData.world.recovered,
                dead: crawlData.world.dead - latestData.world.dead
            }
        };
        return newCases
    }
    catch (err) {
        // console.log(err);
        return {};
    }
}
let convertDataToString = (data) => {
    var returnData = { ...data };
    Object.entries(returnData).forEach(([key, value]) => {
        returnData[key] = value.toLocaleString('en-US');
    });
    return returnData
}
let formatNumbers = () => {
    var returnData = { ...crawlData };
    returnData['vietnam'] = convertDataToString(returnData.vietnam);
    returnData['world'] = convertDataToString(returnData.world);
    return returnData
}

module.exports = {
    index: (req, res) => {
        let formattedData = formatNumbers(crawlData);
        // console.log(crawlData);
        res.render('home', {
            data: formattedData,
            newCases: getNewCases(),
        });
    }
}