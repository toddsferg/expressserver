//dependancies

var express = require("express");
var bodyParser = require("body-parser");

// setting app to express
var app = express();

//configuration

app.set('port', process.env.PORT || 8080); // default port 8080
app.set("view engine", "ejs");

//middleware

app.use(bodyParser.urlencoded({
  extended: false
}));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
  "8JLaoC": "http://www.tsn.ca"
};

// app.get("/", (req, res) => {
//   res.end("Hello!");
// });

app.get("/urls", (req, res) => {
  var templateVars = { urls: urlDatabase };
  res.render("urls_show.ejs", templateVars);
});

app.get("/urls/new", (req, res) => {
  var templateVars = { urls: urlDatabase };
  res.render("urls_new.ejs", templateVars);
});

// app.get("/urls/:id", (req, res) => {
//   var templateVars = { shortURL: req.params.id };
//   res.render("urls_show.ejs", templateVars);
// });

app.post("/urls", (req, res) => {
  console.log(urlDatabase[generateRandomString()] = req.body.longURL);  // debug statement to see POST parameters
  res.redirect("/urls/new");         // Respond with 'Ok' (we will replace this)
});

app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${app.get('port')}!`);
});

var generateRandomString = function(){
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var output = "";
for (var i = 0; i < 6; i++) {
   output += characters.charAt(Math.floor(Math.random() * characters.length))
} return output;
}

console.log(generateRandomString());