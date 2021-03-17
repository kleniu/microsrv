var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let mydb, cloudant;
var dbName = 'mydb';

var insertOne = {};
var getAll = {};

insertOne.cloudant = function(doc, response) {
  mydb.insert(doc, function(err, body, header) {
    if (err) {
      console.log('[mydb.insert] ', err.message);
      response.send("Error");
      return;
    }
    doc._id = body.id;
    response.send(doc);
  });
}

getAll.cloudant = function(response) {
  var records = [];  
  mydb.list({ include_docs: true }, function(err, body) {
    if (!err) {
      body.rows.forEach(function(row) {
        if(row.doc)
          records.push(row.doc);
      });
      //console.log(JSON.stringify(records));
      var sortedRecords = records.sort(function (a, b){
        if (new Date(b.date)-new Date(a.date) !=0)
        {
            return new Date(b.date)-new Date(a.date)
        }
         else
         {
             return b.time.localeCompare(a.time)
         }
      });
      
      response.json(sortedRecords);
    }
  });
  //return names;
}

// Helper
IntTwoChars = function(i) {
  return (`0${i}`).slice(-2);
}

/* Endpoint to greet and add a new visitor to database.
* Send a POST request to localhost:3000/api/records with body
* {
*   "name": "Bob"
* }
* Example
* #> curl --header "Content-Type: application/json" --request POST --data '{"desc":"description of the record"}' localhost:3000/api/records
*/
app.post("/api/records", function (request, response) {
  var desc = request.body.desc;
  //console.log(request.body);
  let date_ob = new Date();
  let day = this.IntTwoChars(date_ob.getDate());
  let month = this.IntTwoChars(date_ob.getMonth() + 1);
  let year = date_ob.getFullYear();
  let hours = this.IntTwoChars(date_ob.getHours());
  let minutes = this.IntTwoChars(date_ob.getMinutes());
  let seconds = this.IntTwoChars(date_ob.getSeconds());
  let curDate = year + "-" + month + "-" + day;
  let curTime = hours + ":" + minutes + ":" + seconds;
  let id = Math.random().toString(36).substr(2, 5).toUpperCase();
  var doc = { "date" : curDate,
              "time" : curTime,
              "id"   : id,
              "desc" : desc};
  if(!mydb) {
    console.log("No database.");
    response.send(doc);
    return;
  }
  insertOne.cloudant(doc, response);
});

/**
 * Endpoint to get a JSON array of all records in the database
 * REST API example:
 * <code>
 * GET http://localhost:3000/api/records
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 * Example
 * #> curl --header "Content-Type: application/json" --request GET localhost:3000/api/records
 */
app.get("/api/records", function (request, response) {
  var records = [];
  if(!mydb) {
    response.json(records);
    return;
  }
  getAll.cloudant(response);
});

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/[Cc][Ll][Oo][Uu][Dd][Aa][Nn][Tt]/)) {
  // Load the Cloudant library.
  var Cloudant = require('@cloudant/cloudant');

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
    // CF service named 'cloudantNoSQLDB'
    cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
     // user-provided service with 'cloudant' in its name
     cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }
} else if (process.env.CLOUDANT_URL){
  cloudant = Cloudant(process.env.CLOUDANT_URL);
}
if(cloudant) {
  //database name
  dbName = 'mydb';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use(dbName);
}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));



var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
