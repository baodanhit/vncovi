let data = require('./crawler');

module.exports = {
    index: (req, res) => {
        res.render('home', {
            data: data
        });
    }
}