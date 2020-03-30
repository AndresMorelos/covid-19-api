const express = require('express');
require('express-router-group');
const router = express.Router();

const {
    STATUS_CODES,
    API_RESPONSE_DEFAULT
} = require('../constants');

const controllers = require('../controllers');


router.group('/', (router) => {
    router.get('/', (req, res) => {
        res.status(STATUS_CODES.OK).json({ response: API_RESPONSE_DEFAULT });
    });

    router.get('/dataset', controllers.dataset.getAllDataSet);
    router.get('/dataset/bydate/:date', controllers.byDate.getByDate);
    router.get('/dataset/:country', controllers.byCountry.getByCountry);
});



module.exports = router;