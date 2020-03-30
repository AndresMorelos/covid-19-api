module.exports = (data) => {
    return {
        date: data.dt_reported,
        country: data.ds_country,
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths
    }
}