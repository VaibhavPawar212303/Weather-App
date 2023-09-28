const con = require("../config/db");
const { default: weatherDataSaved } = require("../public/js/script");

// const weatherDataSaved = (weaterReport) => {
//   var sql = `INSERT INTO weatherdb (Sunrise, Sunset,cloudPct,feelslike,humidity,WindSpeed,WindDegrees,Temperature) VALUES ('${weaterReport.sunrise}', '${weaterReport.Sunset}',${weaterReport.cloudPct},${weaterReport.feels_like},${weaterReport.humidity},${weaterReport.wind_speed},${weaterReport.wind_degrees},${weaterReport.temp});`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// };

// module.exports = { weatherDataSaved };

const report = weatherDataSaved();
console.log(report)
