# COVID 19 API
<span class="badge-buymeacoffee"><a href="https://www.paypal.me/AndresMorelosCO" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>

Novel Coronavirus 2019 API.


### Env Variables default

``` dotenv
DB_HOST='mysql-server-covid19'
DB_PORT=3306
DB_USER='root'
DB_PASSWORD='covid-19'
DB_DATABASE='covid19'
```

### Endpoints

|  Endpoint  | Description | Query Params  |  Response Type  |   
|---|---|---|---|
| /  | Default Endpoint | None |  JSON  |
| /countries  | Return historic data for countries | [Date/date] : Format YYYY-MM-DD ; [Country/country]: Format String|  JSON  | 
| /worldwide  | Return historic data for the worldwide | [Date/date] : Format YYYY-MM-DD |  JSON  | 

### Response Schemas

#### Worldwide schema

``` JSON
    {
        "date": String, // UTC Date
        "confirmed": Number,
        "recovered": Number,
        "deaths": Number
    }
```

#### Countries Schema

``` JSON
    {
        "date": String, // UTC Date
        "country": String,
        "confirmed": Number,
        "recovered": Number,
        "deaths": Number
    }
```

## Source 
### Novel Coronavirus 2019 time series data on cases: https://github.com/datasets/covid-19

This dataset is populated from: 

* World Health Organization (WHO): https://www.who.int/
* DXY.cn. Pneumonia.2020.http://3g.dxy.cn/newh5/view/pneumonia
* BNO News: https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/
* National Health Commission of the People’s Republic of China (NHC): http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml
* China CDC (CCDC): http://weekly.chinacdc.cn/news/TrackingtheEpidemic.htm
* Hong Kong Department of Health: https://www.chp.gov.hk/en/features/102465.html
* Macau Government: https://www.ssm.gov.mo/portal/
* Taiwan CDC: https://sites.google.com/cdc.gov.tw/2019ncov/taiwan?authuser=0
* US CDC: https://www.cdc.gov/coronavirus/2019-ncov/index.html
* Government of Canada: https://www.canada.ca/en/public-health/services/diseases/coronavirus.html
* Australia Government Department of Health: https://www.health.gov.au/news/coronavirus-update-at-a-glance
* European Centre for Disease Prevention and Control (ECDC): https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases
* Ministry of Health Singapore (MOH): https://www.moh.gov.sg/covid-19
* Italy Ministry of Health: http://www.salute.gov.it/nuovocoronavirus

## Database

### Schema

#### Country Dataset

``` mysql
CREATE TABLE dataset (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    dt_reported TIMESTAMP NOT NULL,
    dt_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dt_updated TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ds_country VARCHAR(100) NOT NULL,
    confirmed INT NOT NULL,
    recovered INT NOT NULL,
    deaths INT NOT NULL,
    UNIQUE KEY(ds_country,dt_reported) 
);
```

#### Worldwide Dataset

``` mysql
CREATE TABLE worldwide (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    dt_reported TIMESTAMP NOT NULL,
    dt_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dt_updated TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    confirmed INT NOT NULL,
    recovered INT NOT NULL,
    deaths INT NOT NULL,
    increase_rate DOUBLE NOT NULL
);
```

## AutoPatcher

This worker will mantain upated the dataset in the mysql database.

### Env Variables default

``` dotenv
DATA_URI='https://raw.githubusercontent.com/datasets/covid-19/master/data/'
DB_HOST='mysql-server-covid19'
DB_PORT=3306
DB_USER='root'
DB_PASSWORD='covid-19'Î
DB_DATABASE='covid19'
CRON_SCHEDULE='0 */12 * * *'
```


