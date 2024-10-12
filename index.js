function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dataStamp) {
    let [date, hour] = dataStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

function createTimeOutEvent(dataStamp) {
    let [date, hour] = dataStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(event => event.date === date);
    let timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    
    if (!timeInEvent || !timeOutEvent) return 0; 
    return (timeOutEvent.hour - timeInEvent.hour) / 100; 
}

function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
}

function allWagesFor() {
    const datesWorked = this.timeInEvents.map(e => e.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor.call(record), 0);
}
