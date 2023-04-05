var firebaseConfig = {
    apiKey: "AIzaSyCIca-jjb3dGq96CDIwOOWuG2ho-YlLIkA",
    authDomain: "github-projects-2c11f.firebaseapp.com",
    databaseURL: "https://github-projects-2c11f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "github-projects-2c11f",
    storageBucket: "github-projects-2c11f.appspot.com",
    messagingSenderId: "212799080029",
    appId: "1:212799080029:web:10ae9b3df9c299f66d6fb4",
    measurementId: "G-8DKGNMDS8H"
};
              
firebase.initializeApp(firebaseConfig);
              
var database = firebase.database();
                    
var allowedNames = ["USER2"];

var senderName = document.querySelector("#name-input").value;

document.querySelector("#chat-form").addEventListener("submit", function(event) {
event.preventDefault();

var messageInput = document.querySelector("#message-input");
var message = messageInput.value;
messageInput.value = "";

var chatRef = database.ref("chat");
chatRef.push({
message: message,
timestamp: Date.now(),
senderName: senderName
  });
});

var chatRef = database.ref("chat");
chatRef.on("child_added", function(snapshot) {
var message = snapshot.val().message;
var timestamp = snapshot.val().timestamp;
var messageSenderName = snapshot.val().senderName;

var chatDisplay = document.querySelector("#chat-display");
chatDisplay.innerHTML += "<p><strong>" + messageSenderName + ":</strong> " + message + "</p>";

if (allowedNames.includes(messageSenderName)) {
senderName = messageSenderName;
document.querySelector("#name-input").value = senderName;
  }
});

document.querySelector("#clear-btn").addEventListener("click", function(event) {
event.preventDefault();

var chatRef = database.ref("chat");
chatRef.remove();

var chatDisplay = document.querySelector("#chat-display");
chatDisplay.innerHTML = "";
});
