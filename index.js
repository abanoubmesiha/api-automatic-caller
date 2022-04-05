import express from 'express';
import fetch from 'node-fetch';
import {
  writeToJsonFile,
  readTimeSchedule,
  isAutomaticAPICallingActive,
  isTimeIsOver
} from './utils.js';

const app = express();
const port = 3456;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const data = JSON.stringify({student: '1'});
const timeSchedule = readTimeSchedule();

app.listen(port, () => {
  console.log(`App listening on port ${port}`)

  fetch('http://appcorp.mobi:30081/portal/get/live-matches/489')
    .then(response => response.json())
    .then(data => console.log(data));

  const checkScheduleInterval = setInterval(
    () => {
      if (isAutomaticAPICallingActive(timeSchedule)) {
        console.log("Make an API call...");
        writeToJsonFile(data)
      }
      if (isTimeIsOver(timeSchedule)) {
        console.log("Stop API calling...");
        clearInterval(checkScheduleInterval)
      }
    },
    1000
  );
});
