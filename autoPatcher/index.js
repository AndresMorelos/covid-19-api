//Utils
require('./utils/Object.prototype.prepareDataUpdate')
require('./utils/Object.prototype.prepareData')
require('./utils/Object.prototype.prepareDataLookFor')
require('./utils/String.prototype.includesArray')

// Environment file path
const path = require('path');
const envPath = path.join(path.resolve(__dirname, './'), '.env');
require('dotenv').config({ path: envPath });
const scheduler = require("node-schedule");


const worker = require('./worker');

const { CRON_SCHEDULE } = process.env


// # ┌───────────── minute (0 - 59)
// # │ ┌───────────── hour (0 - 23)
// # │ │ ┌───────────── day of the month (1 - 31)
// # │ │ │ ┌───────────── month (1 - 12)
// # │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
// # │ │ │ │ │                                   7 is also Sunday on some systems)
// # │ │ │ │ │
// # │ │ │ │ │
// # * * * * * command to execute
scheduler.scheduleJob(CRON_SCHEDULE, async () => {
    await worker.start();
});
