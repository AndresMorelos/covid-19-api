const mysql = require('../../helpers/mysql')


const lookFor = (data) => {
    const criteria = data.prepareDataLookFor()
    return mysql.query(`select dt_reported, ds_country, confirmed, recovered, deaths from dataset where ${criteria}`).stream()
}

const allDataSet = () => {
    return mysql.query(`select dt_reported, ds_country, confirmed, recovered, deaths from dataset`).stream()
}

module.exports = {
    lookFor,
    allDataSet
}