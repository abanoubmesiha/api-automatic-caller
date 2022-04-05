const { Console } = require('console');
const fs = require('fs');

const writeToJsonFile = (data) => {
    fs.writeFileSync(`responses/${new Date().toISOString().replace(/[.:]/g, '-')}.json`, data);
    console.log(`Write File: ${new Date().toISOString().replace(/[.:]/g, '-')}.json`);
}

const readTimeSchedule = () => {
    let rawdata = fs.readFileSync('time-schedule.json');
    const {from, to} = JSON.parse(rawdata);
    console.log("TimeSchedule: ", {from, to});
    return {from, to};
}

const isAutomaticAPICallingActive = ({from, to}) => {
    return new Date() > new Date(from) && new Date() < new Date(to);
}

const isTimeIsOver = ({from, to}) => {
    return new Date() > new Date(from) && new Date() > new Date(to);
}

module.exports = {
    writeToJsonFile,
    readTimeSchedule,
    isAutomaticAPICallingActive,
    isTimeIsOver,
};
