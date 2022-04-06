import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import {
  writeToJsonFile,
  readTimeSchedule,
  isAutomaticAPICallingActive,
  isTimeIsOver,
  readMinutesInterval
} from './utils/index.js';

const app = express();
const port = 3456;
const {API_LINK, APP_KEY} = process.env;

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
        const data = await fetch(API_LINK, {headers: {'application_key': API_LINK}})
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
