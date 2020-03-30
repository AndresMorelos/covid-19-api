const mysql = require('../../helpers/mysql')


const lookFor = async (table, data) => {
    const criteria = data.prepareDataLookFor()
    return await mysql.query(`select * from ${table} where ${criteria}`)
}

const update = async (table, data, criteria, in_clause = false) => {
    const values = data.prepareDataUpdate()
    const _criteria = criteria.prepareDataLookFor()
    return await mysql.query(`update ${table} set ${values} where ${_criteria}`);
}

const insert = async (table, data) => {
    const [columns, values] = data.prepareData()
    return await mysql.query(`insert into ${table}(${columns.join(', ')}) values (${values.join(', ')})`);
}

module.exports = {
    update,
    insert,
    lookFor
}