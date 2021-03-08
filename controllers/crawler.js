const cheerio = require('cheerio');
const request = require('request-promise');
var data = {};

function getData() {
    let convertToNumber = (n) => (+ n.replace(/\./g, ''));
    
    data.updateTime = Date.now();
    data.vietnam = {};
    data.world = {};
    
    request({ url: 'https://ncov.moh.gov.vn/', "rejectUnauthorized": false }, (error, response, html) => { // gửi request đến trang 
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html); // load HTML
            data.vietnam = lookUpCounter('.box-vn');
            data.world = lookUpCounter('.box-tg');
            data.detailTable = lockUpDetailTable();
            function lookUpCounter(selector = '.box-vn') {
                let detail = {};
                $(selector).next().each((index, el) => { //
                    let total = convertToNumber($(el).find('.col.text-center.text-uppercase.text-danger-new span').text());
                    let activeCases = convertToNumber($(el).find('.col.text-center.text-uppercase.text-warning1 span').text());
                    let recoveredCases = convertToNumber($(el).find('.col.text-center.text-uppercase.text-success span').text());
                    let deadCases = convertToNumber($(el).find('.col.text-center.text-uppercase.text-danger-new1 span').text());
                    detail = {
                        'total': total,
                        'active': activeCases,
                        'recovered': recoveredCases,
                        'dead': deadCases
                    };
                });
                return detail
            }
            function lockUpDetailTable() {
                let table = $('#sailorTable.table-covid19').html();
                return table
            }
            
        }
        else {
            console.log(error);
        }
    }).then();
    request({ url: 'https://ncov.moh.gov.vn/vi/web/guest/dong-thoi-gian', "rejectUnauthorized": false }, (error, response, html) => { // gửi request đến trang 
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html); // load HTML
    
            data.timeline = loadTimeLine();
    
            function loadTimeLine() {
                let timeline = [];
                let keywords = [
                    'An Giang',
                    'Bà Rịa - Vũng Tàu',
                    'Bắc Giang',
                    'Bắc Kạn',
                    'Bạc Liêu',
                    'Bắc Ninh',
                    'Bến Tre',
                    'Bình Định',
                    'Bình Dương',
                    'Bình Phước',
                    'Bình Thuận',
                    'Cà Mau',
                    'Cao Bằng',
                    'Đắk Lắk',
                    'Đắk Nông',
                    'Điện Biên',
                    'Đồng Nai',
                    'Đồng Tháp',
                    'Gia Lai',
                    'Hà Giang',
                    'Hà Nam',
                    'Hà Tĩnh',
                    'Hải Dương',
                    'Hậu Giang',
                    'Hòa Bình',
                    'Hưng Yên',
                    'Khánh Hòa',
                    'Kiên Giang',
                    'Kon Tum',
                    'Lai Châu',
                    'Lâm Đồng',
                    'Lạng Sơn',
                    'Lào Cai',
                    'Long An',
                    'Nam Định',
                    'Nghệ An',
                    'Ninh Bình',
                    'Ninh Thuận',
                    'Phú Thọ',
                    'Quảng Bình',
                    'Quảng Nam',
                    'Quảng Ngãi',
                    'Quảng Ninh',
                    'Quảng Trị',
                    'Sóc Trăng',
                    'Sơn La',
                    'Tây Ninh',
                    'Thái Bình',
                    'Thái Nguyên',
                    'Thanh Hóa',
                    'Thừa Thiên Huế',
                    'Tiền Giang',
                    'Trà Vinh',
                    'Tuyên Quang',
                    'Vĩnh Long',
                    'Vĩnh Phúc',
                    'Yên Bái',
                    'Phú Yên',
                    'Cần Thơ',
                    'Đà Nẵng',
                    'Hải Phòng',
                    'Hà Nội',
                    'TP HCM',
                    'Hồ Chí Minh'
                ];
                $('section#content').find('.timeline').each((index, el) => {
                    let detail = $(el).find('.timeline-detail').html();
                    detail = detail.replace(/(\n|\t)/g, '');
                    let block = '<div class="timeline-detail">' + detail + '</div>';
                    timeline.push(block);
                });
                return timeline.join('\n');
            }
    
        }
        else {
            console.log(error);
        }
    }).then();
    return data
};
getData();
module.exports = data