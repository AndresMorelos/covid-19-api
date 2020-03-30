const { DATA_URI } = process.env
const request = require('request')
const autoPatcher = require('./utils/mysql-transactions')
const moment = require('moment-timezone');
const constants = require('./constants')
const csvtojson = require('csvtojson')

const onError = (error) => {
    console.error(error)
    process.exit(1)
}

const onCompleted = () => {
}


const start = async () => {
    // Countries Agregated
    await csvtojson()
        .fromStream(request.get(`${DATA_URI}${constants.COUNTRIES_AGREGATED}`))
        .subscribe((json) => {
            autoPatcher.lookFor('dataset', {
                dt_reported: json.Date,
                ds_country: json.Country
            }).then(_Entity => {
                if (_Entity && _Entity.length == 0) {
                    autoPatcher.insert('dataset', {
                        dt_reported: json.Date,
                        ds_country: json.Country,
                        confirmed: json.Confirmed,
                        recovered: json.Recovered,
                        deaths: json.Deaths
                    })
                } else {
                    // Update the cases to prevent any change in the source dataset.
                    autoPatcher.update('dataset', {
                        confirmed: json.Confirmed,
                        recovered: json.Recovered,
                        deaths: json.Deaths
                    }, {
                        dt_reported: json.Date,
                        ds_country: json.Country
                    })
                }
            })
        }, onError, onCompleted);

    // WorldWide Agregated
    await csvtojson()
        .fromStream(request.get(`${DATA_URI}${constants.WORLDWIDE_AGREGATED}`))
        .subscribe((json) => {
            autoPatcher.lookFor('worldwide', {
                dt_reported: json.Date
            }).then(_Entity => {
                if (_Entity && _Entity.length == 0) {
                    autoPatcher.insert('worldwide', {
                        dt_reported: json.Date,
                        confirmed: json.Confirmed,
                        recovered: json.Recovered,
                        deaths: json.Deaths,
                        increase_rate: parseFloat(json['Increase rate'] || 0.0)
                    })
                } else {
                    // Update the cases to prevent any change in the source dataset.
                    autoPatcher.update('worldwide', {
                        confirmed: json.Confirmed,
                        recovered: json.Recovered,
                        deaths: json.Deaths,
                        increase_rate: parseFloat(json['Increase rate'] || 0.0)
                    }, {
                        dt_reported: json.Date
                    })
                }
            })
        }, onError, onCompleted);
}


module.exports = { start }

