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
    await csvtojson()
        .fromStream(request.get(`${DATA_URI}${constants.COUNTRIES_AGREGATED}`))
        .subscribe((json) => {
            autoPatcher.lookFor({
                dt_reported: json.Date,
                ds_country: json.Country
            }).then(_Entity => {
                if (_Entity && _Entity.length == 0) {
                    autoPatcher.insert({
                        dt_reported: json.Date,
                        ds_country: json.Country,
                        confirmed: json.Confirmed,
                        recovered: json.Recovered,
                        deaths: json.Deaths
                    })
                } else {
                    // Update the cases to prevent any change in the source dataset.
                    autoPatcher.update({
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
}


module.exports = { start }

