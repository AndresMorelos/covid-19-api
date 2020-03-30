const mysql = require('../../helpers/mysql')

const countries = {
    lookFor: (data) => {
        const criteria = data.prepareDataLookFor()
        return mysql.query(`select dt_reported, ds_country, confirmed, recovered, deaths from dataset where ${criteria}`).stream()
    },
    allDataSet: () => {
        return mysql.query(`select dt_reported, ds_country, confirmed, recovered, deaths from dataset`).stream()
    }
}
const worldwide = {
    lookFor: (data) => {
        const criteria = data.prepareDataLookFor()
        return mysql.query(`select dt_reported, confirmed, recovered, deaths from worldwide where ${criteria}`).stream()
    },
    allDataSet: () => {
        return mysql.query(`select dt_reported, confirmed, recovered, deaths, increase_rate from worldwide`).stream()
    }
}


module.exports = {
    countries,
    worldwide
}