const express = require('express')
const app = express()
const port = 3456
const {writeToJsonFile, readTimeSchedule, isAutomaticAPICallingActive,
  isTimeIsOver} = require('./utils');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const data = JSON.stringify({student: '1'});
const timeSchedule = readTimeSchedule();

app.listen(port, () => {
  console.log(`App listening on port ${port}`)

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
