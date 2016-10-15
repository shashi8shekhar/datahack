/**
 * Created by aple on 15/10/16.
 */

var MongoClient = require('mongodb');
var Q = require('q');
var db;
var url = 'mongodb://localhost:27017/dataHack';

var connect = function () {
    var defer = Q.defer();

    MongoClient.connect(url, function (err, d) {
        console.log("Connected correctly to server");
        db = d;
        defer.resolve(d);
    });

    return defer.promise;
}

var getYearWiseData = function () {
    var defer = Q.defer();
//    connect().then(function (db) {
        var additions = db.collection('additions');
        var pipe = [
            {
                $group: {
                    _id: {
                        year: '$year_str',
                        content: '$content'
                    },
                    value: {$sum: '$value'}
                }
            }, {
                $group: {
                    _id: '$_id.year',
                    content_data: {
                        $addToSet: {
                            content: '$_id.content',
                            count: '$value'
                        }
                    }
                }
            }, {
                $sort: {_id: 1}
            }
        ]

        additions.aggregate(pipe, function (err, data) {
            defer.resolve(data);
        })

//    })

    return defer.promise;
};

// connect().then(function () {
//     getYearWiseData().then(function (data) {
//         console.log(JSON.stringify(data));
//     });
// })

exports.getYearWiseData = getYearWiseData;
exports.connect = connect;
