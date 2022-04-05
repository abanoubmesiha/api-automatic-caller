import fs from 'fs';

export const writeToJsonFile = (data) => {
    if (!fs.existsSync('responses')){
        fs.mkdirSync('responses');
    }
    fs.writeFileSync(`responses/${new Date().toISOString().replace(/[.:]/g, '-')}.json`, data);
    console.log(`Write File: ${new Date().toISOString().replace(/[.:]/g, '-')}.json`);
}

export const readTimeSchedule = () => {
    let rawdata = fs.readFileSync('time-schedule.json');
    const {from, to} = JSON.parse(rawdata);
    console.log("TimeSchedule: ", {from, to});
    return {from, to};
}

export const isAutomaticAPICallingActive = ({from, to}) => {
    return new Date() > new Date(from) && new Date() < new Date(to);
}

export const isTimeIsOver = ({from, to}) => {
    return new Date() > new Date(from) && new Date() > new Date(to);
}
