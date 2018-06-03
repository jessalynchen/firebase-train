
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBD_TZQPrpif6X2RzQHIaAWQ8sTlwkH2Yk",
    authDomain: "timesheetexample-e5220.firebaseapp.com",
    databaseURL: "https://timesheetexample-e5220.firebaseio.com",
    projectId: "timesheetexample-e5220",
    storageBucket: "timesheetexample-e5220.appspot.com",
    messagingSenderId: "303039056438"
  };
  firebase.initializeApp(config);
var database = firebase.database();
  firebase.database().ref().on("value",function(snapshot){
    console.log(snapshot.val());
  });

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  console.log("Submitted").
  event.preventDefault();

  // Grabs user train input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#role-input").val().trim();
  var trainFreq = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainArrival = $("#rate-input").val().trim();
  var minuteAway = $("#minutes-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    "name": trainName,
    "destination": trainDestination,
    "frequency": trainFreq,
    "arrival": trainArrival,
    "minutes": minutesAway
  };

  // Uploads train data to the firebase database
  database.ref("https://timesheetexample-e5220.firebaseio.com/").push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.arrival);
  console.log(newTrain.minutes);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
  $("#minute-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFreq = childSnapshot.val().frequency;
  var trainArrival = childSnapshot.val().arrival;
  var minutesAway = childSnapshot.val().minutes;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFreq);
  console.log(trainArrival);
  console.log(minutesAway);

  // Prettify the Train time arrival
  var trainTimePretty = moment.unix(trainFreq).format("HH:mm");


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFreq + "</td><td>" + trainTimePretty);
});

