'use strict';
/* istanbul ignore file */
const mysql = require('mysql');
let db = {};

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

db = {
    dbPool: null,
    _connection: null,
    getSettings: function () {
        const mysqlParams = {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE
        };

        return mysqlParams;
    },
    connect: () => {
        return new Promise((resolve, reject) => {
            var dbSettings = db.getSettings();

            if (!db.dbPool) {
                db.dbPool = mysql.createPool(dbSettings);
            }

            db.dbPool.getConnection(function (err, connection) {
                if (err) {
                    return reject(err);
                } else {
                    db._connection = connection;
                    return resolve(db._connection);
                }
            });
        });
    },
    query: (query, params = []) => {
        return new Promise((resolve, reject) => {
            db.connect()
                .then(connection => {
                    connection.query(query, params, function (err, reply) {
                        connection.release();
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(reply);
                        }
                    });
                })
                .catch(error => {
                    return reject(error);
                });
        });
    }
};

module.exports = { query: db.query };