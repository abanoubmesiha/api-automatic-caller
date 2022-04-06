import fetch from 'node-fetch';
import {
    writeToJsonFile,
    readTimeSchedule,
    isAutomaticAPICallingActive,
    isTimeIsOver,
    readMinutesInterval
} from '../utils/index.js';

const {API_LINK, APP_KEY} = process.env;

const timeSchedule = readTimeSchedule();
const minutesInterval = readMinutesInterval();

export const dataGathering = () => {
    const checkScheduleInterval = setInterval(
        async () => {
            if (isAutomaticAPICallingActive(timeSchedule)) {
                const data = await fetch(API_LINK, {headers: {'application_key': APP_KEY}})
                    .then(response => response.json())
                    .then(response => JSON.stringify(response));
                console.log("Make an API call...");
                writeToJsonFile(data, 'responses/');
            }
            if (isTimeIsOver(timeSchedule)) {
                console.log("Stop API calling...");
                clearInterval(checkScheduleInterval)
            }
        },
        1000 * 60 * minutesInterval
    );
};
