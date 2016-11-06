const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;
const app = express();

//Middleware
app.set("view engine", "ejs"); //templates for ejs
app.use(bodyParser.urlencoded({
  extended: false
})); //reads req body
 app.use(cookieParser());


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


// get home page
app.get("/", (req, res) => {
   let templateVars = {
    username: req.cookies.username,
     };
     console.log(templateVars.username);
  res.render("home", templateVars);
});

// app.get("/urls.json", (req, res) => {
//   res.json(urlDatabase);
// });

// Send user to urls
app.get("/urls", (req, res) => {
  let templateVars = {
  urls: urlDatabase,
  username: req.cookies.username
  };

  res.render("urls_index", templateVars);
});

//post info to /urls
app.post("/urls", (req, res) => {
  console.log(req.body.longURL);
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls/" + shortURL);
});

//go to urls_new(our URLs)

app.get("/urls/new", (req, res) => {
  let templateVars = {
    username: req.cookies.username
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let longURL = urlDatabase[req.params.id];
  console.log(longURL);
  let templateVars = {
    username: req.cookies.username,
    shortURL: req.params.id,
    longURL: longURL,
    urlDatabase: urlDatabase
  };
  res.render("urls_show", templateVars);
});



app.post("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls/" + shortURL);
});



app.get("/u/:id", (req, res) => {
  let longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});
//delete using delete operator
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});


//accept a POST to /login
app.post("/login", (req, res) => {
  console.log("logged in a username")
  res.cookie("username", req.body.username);
  res.redirect("/");
})
//post to /logout, redirect home
app.post("/logout", (req, res) => {
  console.log("logged out")
  res.clearCookie("username");
  res.redirect("/");
})

//generate shortURL

function generateRandomString() {
   var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var output = "";
for (var i = 0; i < 6; i++) {
   output += characters.charAt(Math.floor(Math.random() * characters.length))
} return output;
};


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});