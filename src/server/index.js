let mysql = require('mysql');
const express = require('express');

const app = express();

app.use(express.json());

const port = 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "($urviv0R)",
    database: "gymdbms"
});

// initiating a connection to the db
connection.connect(function(err) {
    if (err) {
        return console.error('Error: ' + err.message);
    }

    console.log("Connected!");
    
});

app.get("/api/students-2", (req, res) => {
    sql = "SELECT * FROM student";

    connection.query(sql, function(err, result){
        let students2= [];

        if(err) return console.log('Error: ' + err.message);

        result.forEach(tuple => {
            students2.push(tuple);
            //console.log(students2)
        })

        res.send(students2);
    })
});

app.post('/api/renewMembership/', (req, res) => {
    /*let name = req.params.name;
    let month = req.params.month;
    let day = req.params.day;
    let year = req.params.year;
    let date = req.body;
    //let date = month + '/' + day + '/' + year;*/
  
    let sql = req.body;
  
    connection.query(sql, function(err){
      if(err) {
        return console.log('Error: ' + err.message);
      }
  
      res.send('Year updated');
    });
  });

// can also get names now
app.get("/api/students", (req, res) => {

    sql = "SELECT accountID FROM student";

    connection.query(sql, function(err, result) {

        let students = [];

        if (err) {
            return console.log('Error: ' + err.message);
        }

        result.forEach(tuple => {
            students.push(tuple.accountID);
            //console.log(students)
        });

        // send the response as the sessions array
        res.send(students);

    })

})

// Getting body weight
app.get("/api/weight/:student", (req, res) => {

    let student = req.params.student;

    //WHERE accountID = \'" + student + "\'"
    bwSQL = "SELECT bodyWeight FROM student WHERE accountID = \'" + student + "\'";
    
    // bwSQL query sent to the mySQL server, sends appropriate data as a response

    try {
        connection.query(bwSQL, function(err, result) {

            if (err) {
                return console.error('Error: ' + err.message);
            }
            
            if(result[0].bodyWeight != undefined){
                res.send(`${result[0].bodyWeight}`);
            } 
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Error Occured`)
    }

});

// getting previous body weight
app.get("/api/prevWeight/:student", (req, res) => {

    let student = req.params.student;

    let pbwSQL = "SELECT previousBodyWeight FROM student WHERE accountID = \'" + student + "\'";
    
    // pbwSQL query sent to the mySQL server, sends appropriate data as a response
    connection.query(pbwSQL, function(err, result) {

        if(err) {
            return console.error('Error: ' + err.message);
        }

        res.send(`${result[0].previousBodyWeight}`);
       
    });
});

// getting session titles
app.get("/api/sessionTitles/:student", (req, res) => {

    let student = req.params.student;

    let sessionSQL = "SELECT o.sessionTitle FROM offering o JOIN studentoffering so ON so.offeringID = o.offeringID WHERE so.accountID = \'" + student  + "\'";

    // sessionSQL query sent to the mySQL server, sends appropriate data as a response
    connection.query(sessionSQL, function(err, result) {

        let sessions = [];

        if(err) {
            return console.error('Error: ' + err.message);
        }

        // for each session title, add it to the sessions array
        result.forEach(tuple => {
            sessions.push(tuple.sessionTitle);
            //console.log("Session Title: " + sessions)
        });

        // send the response as the sessions array
        res.send(sessions);

    });
});


// getting offerings
app.get("/api/offerings/:student", (req, res) => {

    let student = req.params.student;

    let offeringSQL = "SELECT o.offeringID, o.date, o.time FROM studentoffering so, offering o WHERE o.offeringID = so.offeringID AND so.accountID = \'" + student  + "\'";

    // offeringSQL query sent to the mySQL server, sends appropriate data as a response
    connection.query(offeringSQL, function(err, result) {

        let offerings = [];

        if(err) {
            return console.error('Error: ' + err.message);
        }

        result.forEach(tuple => {
            offerings.push({offeringID: tuple.offeringID, date: tuple.date, time: tuple.time})
            //console.log("Offerings: " + tuple.offeringID + " Date: " + tuple.date + " Time: " + tuple.time);
            console.log(offerings);
        });

        res.send(offerings);

    });
});

// getting instructors
app.get("/api/instructors/:student", (req, res) => {

    let student = req.params.student;

    let instructorSQL = "SELECT DISTINCT i.name, i.email FROM offering o, instructor i, studentoffering so WHERE so.offeringID = o.offeringID AND o.instructorID = i.instructorID AND so.accountID = \'" + student  + "\'";

    // instructorSQL query sent to the mySQL server, sends appropriate data as a response
    connection.query(instructorSQL, function(err, result) {
        
        let instructors = [];

        if(err) {
            return console.error('Error: ' + err.message);
        }
    
        result.forEach(tuple => {
            instructors.push({name: tuple.name, email: tuple.email});
            //console.log("Name: " + tuple.name + " Email: " + tuple.email);
            console.log(instructors);
        });

        res.send(instructors);

    })
});

// getting equipment
app.get("/api/equipment/:student", (req, res) => {

    let student = req.params.student;

    let equipmentSQL = "SELECT DISTINCT oe.equipmentName, e.weight FROM offeringequipment oe JOIN equipment e ON e.equipmentname = oe.equipmentName JOIN offering o ON o.offeringID = oe.offeringID JOIN studentoffering so ON so.offeringID = o.offeringID JOIN student s ON so.accountID = \'" + student + "\'";

    // equipmentSQL query sent to the mySQL server, sends appropriate data as a response
    connection.query(equipmentSQL, function(err, result) {

        let equipment = [];

        if(err) {
            return console.error('Error: ' + err.message);
        }
    
        result.forEach(tuple => {
            equipment.push({name: tuple.equipmentName, weight: tuple.weight});
            //console.log("Name: " + tuple.equipmentName + " Weight: " + tuple.weight);
            console.log(equipment);
        });

        res.send(equipment);

    });
});

//find all workouts longer than 1 hour where the person was in the gym on a given day of the week - (sunday/userInput) in december
app.get(`/api/workout/:day`, (req, res) => { 
    let dayOfWeek = req.params.day;      
    let days;
    if (dayOfWeek.toLowerCase() == "sunday") { days = ['04', '11', '18', '25']; }
    else if (dayOfWeek.toLowerCase() == "monday") { days = ['05', '12', '19', '26']; }
    else if (dayOfWeek.toLowerCase() == "tuesday") { days = ['06', '13', '20', '27']; }
    else if (dayOfWeek.toLowerCase() == "wednesay") { days = ['07', '14', '21', '28']; }
    else if (dayOfWeek.toLowerCase() == "thursday") { days = ['01', '08', "15", "22"]; }
    else if (dayOfWeek.toLowerCase() == "friday") { days = ["02", "09", "16", "23"]; }
    else if (dayOfWeek.toLowerCase() == "saturday") { days = ["03", "10", "17", "24"]; }
    else { console.log("Incompatible entry for dayOfWeek, field auto set to sunday");  days = [04, 11, 18, 25]; }

    let workoutSQL = `SELECT accountID, date, signInTime, signOutTime, TIMESTAMPDIFF(MINUTE, signInTime, signOutTime) AS "LengthOfWorkoutInMinutes"
    FROM Workout
WHERE (date = '2022-12-${days[0]}' OR date = '2022-12-${days[1]}' OR date = '2022-12-${days[2]}' OR date = '2022-12-${days[3]}')
        AND (TIMESTAMPDIFF(MINUTE, signInTime, signOutTime) > 60)
    ORDER BY date, signInTime;`;
   
    connection.query(workoutSQL, function(err, result){

        let workouts = [];

        if(err) {
            return console.error('Error: ' + err.message);
        }

        result.forEach(tuple => {
            console.log(tuple.date);
            tuple.date = tuple.date + '';
            tuple.date.slice(0,10);
            workouts.push({accountID: tuple.accountID, date: tuple.date, signInTime: tuple.signInTime, signOutTime: tuple.signOutTime, LengthOfWorkOutInMinutes: tuple.LengthOfWorkoutInMinutes });
        });

        res.send(workouts);
    
    });

});


// find number of ppl who work out daily / per gym / more than 5 times per month - no difference seen until > ~12
app.get("/api/workout/daily/:attendanceThreshold", (req, res) => {

    let threshold = Number(req.params.attendanceThreshold);
    if ((typeof threshold) != "number" )
    {
        threshold = 15;
        console.log("Invalid, threshold must be a number. Threshold automatically set to 15");
    }
    let workoutSQL = `SELECT gymAddress, COUNT(DISTINCT accountID) AS 'numOfRegularVisitors' FROM (SELECT accountID, COUNT(DISTINCT date) AS 'daysVisitedTheGymInDEC', gymAddress FROM Workout AS numberOfPeopleInGym GROUP BY accountID ORDER BY COUNT(DISTINCT date) DESC) AS numberOfPeopleInGym WHERE daysVisitedTheGymInDEC > ${threshold} GROUP BY gymAddress ORDER BY gymAddress;`;

    // workoutSQL query sent to the mySQL server, sends appropriate data as a response
    connection.query(workoutSQL, function(err, result) {

        let workout = [];

        if(err) {
            return console.error('Error: ' + err.message);
        }
    
        result.forEach(tuple => {
            workout.push({address: tuple.gymAddress, numberOfRegularCustomers: tuple.numOfRegularVisitors, AttendanceThresholdForRegularStatus: threshold + " days"});
            console.log(workout + "from /api/workout/daily/:attendanceThreshold => connection.query");
        });

        res.send(workout);

    });
});

app.get('/api/:skillLevel', (req, res) => {
  const skillLevel = req.params.skillLevel;
  let sql = `SELECT i.name,i.skillLevel,instructorID from instructor i where skillLevel = '${skillLevel}'`;
  connection.query(sql, (err,result) =>{
      if(err) {
          throw err 
      }
      res.send(result)
  });
});

//Function 1: Show Instructor for class
app.get('/getInstructor/:offeringID', (req, res) => {
    //let sql = 'SELECT instructorID FROM offering WHERE offeringID = 1' //test for id=1
    //let sql = SELECT instructorID FROM offering WHERE offeringID = ${req.params.offeringID} //get instructor ID
    let sql = `SELECT name, instructor.instructorID FROM instructor INNER JOIN offering ON offering.instructorID = instructor.instructorID AND offeringID = ${req.params.offeringID}`  //get instructor name and ID
    let query = connection.query (sql, (err, results) =>{
        if(err) {
            throw err 
        }
        console.log(results)
        res.send(results)
        //res.send('Instructor data fetched')
    })   
});
//Function 2: Show count of students in class

app.get('/getStudents/:offeringID', (req, res) => {
    console.log('test')
    //let sql = 'SELECT instructorID FROM offering WHERE offeringID = 1' //test for id=1
    //let sql = SELECT instructorID FROM offering WHERE offeringID = ${req.params.offeringID} //get instructor ID
    let sql = `SELECT name, so.offeringID FROM student s, studentOffering so WHERE so.offeringID = ${req.params.offeringID} AND so.accountID = s.accountID` //get instructor name and ID
    let query = connection.query (sql, (err, results) =>{
        if(err) {
            throw err 
        }
        console.log(results)
        //res.send('Student data fetched')
        res.send(results)
    })   
});

//Function 3: Show class statistics

app.get('/classInfo', (req, res) => {
    let sql = 'SELECT o.offeringID, i.instructorID, i.name, i.email, count(so.accountID) FROM offering o INNER JOIN instructor i ON o.instructorID = i.instructorID LEFT OUTER JOIN studentOffering so ON o.offeringID = so.offeringID GROUP BY offeringID' //get instructor name and ID
    let query = connection.query (sql, (err, results) => {
        if(err) {
            throw err 
        }
        console.log(results)
        //res.send('Student data fetched')
        res.send(results)
    })   
});

