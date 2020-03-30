const mysql = require('../../helpers/mysql')


const lookFor = async (data) => {
    const criteria = data.prepareDataLookFor()
    return await mysql.query(`select * from dataset where ${criteria}`)
}

const update = async (data, criteria, in_clause = false) => {
    const values = data.prepareDataUpdate()
    const _criteria = criteria.prepareDataLookFor()
    return await mysql.query(`update dataset set ${values} where ${_criteria}`);
}

const insert = async (data) => {
    const [columns, values] = data.prepareData()
    return await mysql.query(`insert into dataset(${columns.join(', ')}) values (${values.join(', ')})`);
}

module.exports = {
    update,
    insert,
    lookFor
}