const express = require("express");
const router = express.Router();
const con = require("../config/db");
let report;
let weatherArray = [];

router.post("/addweaterreport", async (req, res) => {
  const weaterReport = req.body;
  var sql = `INSERT INTO locationweather(Sunrise,Sunset,cloudPct,feelslike,humidity,WindSpeed,WindDegrees,Temperature,Datetime,locationname) VALUES ('${weaterReport.sunrise}','${weaterReport.sunset}','${weaterReport.cloudpct}','${weaterReport.feelsLike}','${weaterReport.humidity}','${weaterReport.WindSpeed}','${weaterReport.WindDegrees}','${weaterReport.temp}',${weaterReport.date},'${weaterReport.locationname}');`;
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
});

router.get("/getallweathers", (req, res) => {
  var sql = "SELECT * FROM weatherdb.locationweather;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json({ result });
  });
});

router.get("/home", (req, res) => {
  var sql = "SELECT * FROM weatherdb.locationweather;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    result.forEach((element, i) => {
      let dateObjSunset = new Date(element.Sunset * 1000);
      // Get hours from the timestamp
      let hoursSunset = dateObjSunset.getUTCHours();
      // Get minutes part from the timestamp
      let minutesSunset = dateObjSunset.getUTCMinutes();
      // Get seconds part from the timestamp
      let secondsSunset = dateObjSunset.getUTCSeconds();
      let SunsetConverted =
        hoursSunset.toString().padStart(2, "0") +
        ":" +
        minutesSunset.toString().padStart(2, "0") +
        ":" +
        secondsSunset.toString().padStart(2, "0");

      let dateObjSunrise = new Date(element.Sunrise * 1000);
      // Get hours from the timestamp
      let hoursSunrise = dateObjSunrise.getUTCHours();
      // Get minutes part from the timestamp
      let minutesSunrise = dateObjSunrise.getUTCMinutes();
      // Get seconds part from the timestamp
      let secondsSunrise = dateObjSunrise.getUTCSeconds();
      let sunrise =
        hoursSunrise.toString().padStart(2, "0") +
        ":" +
        minutesSunrise.toString().padStart(2, "0") +
        ":" +
        secondsSunrise.toString().padStart(2, "0");

      var a = new Date(element.Datetime * 1000);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var date = date + " " + month + " " + year + " ";

      const location = element.locationname;
      const Sunrise = sunrise;
      const Sunset = SunsetConverted;
      const Datetime = date;
      const Teamperature = element.Temperature;
      const humidity = element.humidity;
      const WindSpeed = element.WindSpeed;
      const WindDegrees = element.WindDegrees;
      const feelslike = element.feelslike;
      const cloudPct = element.cloudPct;

      weatherObject = {
        location,
        Sunrise,
        Sunset,
        Datetime,
        Teamperature,
        humidity,
        WindSpeed,
        WindDegrees,
        feelslike,
        cloudPct,
      };
      weatherArray.push(weatherObject);
    });
    report = weatherArray;
  });
  res.render("index", { weatherusersaved: report });
});

module.exports = router;
