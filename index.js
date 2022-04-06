import express from 'express';
import fetch from 'node-fetch';
import {
  writeToJsonFile,
  readTimeSchedule,
  isAutomaticAPICallingActive,
  isTimeIsOver,
  readMinutesInterval
} from './utils/index.js';

const app = express();
const port = 3456;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const timeSchedule = readTimeSchedule();
const minutesInterval = readMinutesInterval();

app.listen(port, () => {
  console.log(`App listening on port ${port}`)

  const checkScheduleInterval = setInterval(
    async () => {
      if (isAutomaticAPICallingActive(timeSchedule)) {
        const data = await fetch('http://appcorp.mobi:30081/portal/get/live-matches/489', {
          headers: {'application_key': '23209fd0-5e58-4ccb-869e-c3aef7184w70'}
        })
          .then(response => response.json())
          .then(response => JSON.stringify(response));
        console.log("Make an API call...");
        writeToJsonFile(data);
      }
      if (isTimeIsOver(timeSchedule)) {
        console.log("Stop API calling...");
        clearInterval(checkScheduleInterval)
      }
    },
    1000 * 60 * minutesInterval
  );
});
