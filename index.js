/* Your Code Here */

//createEmployeeRecord needs: 
//a blank array with for slots
//a javaScript Obj w/ 6 keys, last two keys are empty arrays
//returns an object with the array info loaded into it. 

info = [ , , , ,]

function createEmployeeRecord(info){
    let obj = {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

//createEmployeeRecords(arrOfarr) {loops through each infoArr and converts it into a employee record using previous function => new array}

function createEmployeeRecords(arr) {
    let newArr = []
    for(let i = 0; i < arr.length; i++){ 
        newArr.push(createEmployeeRecord(arr[i]))
    }
        return newArr
}

//createTimeInEvent(dateStamp/date and time){ returns an employeeRecord with added objkeys pushed in}
//createTimeOutEvent(dateStamp/date and time){ returns an employeeRecord with added objkeys pushed in}

 function createTimeInEvent(dateStamp){
    //console.log(record) //returns the employeeRecords function
    let dateTime = dateStamp.split(" ")
    let timeObj = {
        type: "TimeIn",
        hour: parseInt(dateTime[1]),
        date: dateTime[0] 
    }
    this.timeInEvents.push(timeObj)
    return this
      
}
function createTimeOutEvent(dateStamp){
    //console.log(record) //returns the employeeRecords function
    let dateTime = dateStamp.split(" ")
    let timeObj = {
        type: "TimeOut",
        hour: parseInt(dateTime[1]),
        date: dateTime[0] 
    }
    this.timeOutEvents.push(timeObj)
    return this

}

//hoursWorkedOnDate(date)(given a date, return the number of hours worked for that day)

function hoursWorkedOnDate(date){
    //console.log(date) //2044-03-15
    //console.log(this) //provides an employee record + timeIn and out deets
      let timeIn = this.timeInEvents.find(event => event.date === date)
      let timeOut = this.timeOutEvents.find(event => event.date === date)
     let value = (timeOut.hour - timeIn.hour)/100
     return value
    }

//wagesEarnedOnDate(date) {hoursWorkedOnDate * record's payRate = pay owed }

function wagesEarnedOnDate(date) {
    //console.log("this", this) //provides employee record
    //console.log(date) //2044-03-15
    //this.payPerHour //payrate: 27 
    let hours = hoursWorkedOnDate.call(this, date) //provides the number of hours worked
    //call calls the function and connects it to the emp hours worked at the same time
    return this.payPerHour * hours
}

//allWagesFor() has no arguement { wagesEarnedOnDate.reduce => pay for all dates worked}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function allWagesFor () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
//findEmployeeByFirstName(scrArr){you get loki }

function findEmployeeByFirstName(employee, firstNameString){
    return employee.find(emp => emp.firstName === firstNameString)
}       

//function calculatePayroll(employeeRecords)

function calculatePayroll(employeeRecords){
    return employeeRecords.map(employee => allWagesFor.call(employee)).reduce((currentValue, total) => currentValue + total)
}