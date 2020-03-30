const dataset = require('../../../utils/mysql-transactions')
const parseDataSetInfo = require('../../../utils/parseDataSetInfo')
const { STATUS_CODES } = require('../../../constants')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getAllDataSet(req, res, next) {
    try {
        const _data = []
        if (req.query && Object.keys(req.query).length > 0 && req.query.constructor === Object) {
            console.log(req.query)
            let criteria = {}
            if (req.query.Country || req.query.country) {
                criteria = {
                    ...criteria,
                    ds_country: req.query.Country || req.query.country
                }
            }

            if (req.query.Date || req.query.date) {
                criteria = {
                    ...criteria,
                    dt_reported: req.query.Date || req.query.date
                }
            }

            dataset.countries.lookFor(criteria)
                .on('data', data => {
                    _data.push(parseDataSetInfo(data))
                })
                .on('end', () => {
                    res.status(STATUS_CODES.OK).json(_data);
                    res.end();
                })
        } else {
            dataset.countries.allDataSet()
                .on('data', data => {
                    _data.push(parseDataSetInfo(data))
                })
                .on('end', () => {
                    res.status(STATUS_CODES.OK).json(_data)
                    res.end();
                })
        }


    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllDataSet,
};