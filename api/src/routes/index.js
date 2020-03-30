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

    router.get('/countries/', controllers.dataset.countries.getAllDataSet);
    router.get('/worldwide/', controllers.dataset.worldwide.getAllDataSet);

});



module.exports = router;