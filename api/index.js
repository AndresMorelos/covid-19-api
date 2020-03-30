//Utils
require('./src/utils/Object.prototype.prepareDataUpdate')
require('./src/utils/Object.prototype.prepareData')
require('./src/utils/Object.prototype.prepareDataLookFor')
require('./src/utils/String.prototype.includesArray')

// Environment file path
const path = require('path');
const envPath = path.join(path.resolve(__dirname, './'), '.env');
require('dotenv').config({ path: envPath });

const {
    PORT = 3000,
  } = process.env;

const app = require('./src/app');

app.listen((PORT), async () => {
 console.log(`Covid19 API running on ${PORT}`)
});
