CREATE DATABASE covid19;

USE covid19;

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

CREATE INDEX index_ds_country ON dataset (ds_country);

CREATE INDEX index_dt_reported ON dataset (dt_reported);

