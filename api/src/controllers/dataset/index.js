const dataset = require('../../utils/mysql-transactions')
const parseDataSetInfo = require('../../utils/parseDataSetInfo')
const { STATUS_CODES } = require('../../constants')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getAllDataSet(req, res, next) {
    try {
        const _data = []
        dataset.allDataSet()
            .on('data', data => {
                _data.push(parseDataSetInfo(data))
            })
            .on('end', () => {
                res.status(STATUS_CODES.OK).json(_data)
            })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllDataSet,
};