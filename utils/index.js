import fs from 'fs';

export const writeToJsonFile = (data) => {
    if (!fs.existsSync('responses')){
        fs.mkdirSync('responses');
    }
    fs.writeFileSync(`responses/${new Date().toISOString().replace(/[.:]/g, '-')}.json`, data);
    console.log(`Write File: ${new Date().toISOString().replace(/[.:]/g, '-')}.json`);
}

const hourDif = (dateA, dateB) => `${((dateA - dateB) / 1000 / 60 / 60).toFixed(2)} Hours`;
const addHours = (date, n) => {
    date.setHours( date.getHours() + 2 );
    return date;
}

export const readTimeSchedule = () => {
    let rawdata = fs.readFileSync('settings/index.json');
    const {from, to} = JSON.parse(rawdata);
    console.log("Time Schedule in Server: ", new Date(from).toGMTString(), new Date(to).toGMTString());
    console.log("Time Schedule in Egypt: ", addHours(new Date(from), 2).toGMTString(), addHours(new Date(to), 2).toGMTString());
    console.log("Starting after: ", hourDif(new Date(from), new Date()));
    console.log("Ending after: ", hourDif(new Date(to), new Date()));
    return {from, to};
}

export const readMinutesInterval = () => {
    let rawdata = fs.readFileSync('settings/index.json');
    const {minutesInterval} = JSON.parse(rawdata);
    console.log("Minutes Interval: ", minutesInterval);
    return minutesInterval;
}

export const isAutomaticAPICallingActive = ({from, to}) => {
    return new Date() > new Date(from) && new Date() < new Date(to);
}

export const isTimeIsOver = ({from, to}) => {
    return new Date() > new Date(from) && new Date() > new Date(to);
}
