const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userController = require('./userController');
const exerciseController = require('./exerciseController');
const morgan = require("morgan");
const session = require('express-session');
const passport = require('passport');
const cookieParser = require("cookie-parser");
const app = express();
const Users = require('./Models/Users');
const passportLocalMongoose = require('passport-local-mongoose');
const proxy = require('http-proxy-middleware');
const path = require('path');

mongoose.set("debug", true);


app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan("dev"));  
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.use(cookieParser());
app.use(session({ secret: 'Insert randomized text here',    resave: false,
    saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.post('/api/register', userController.register);
app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/api/me'
}));

app.post('/api/changePassword',userController.changePassword);
app.post('/api/recoverPassword',userController.recoverPassword);
const authenticationFilter = (request, response, next) => {
    // passport adds this to the request object
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect("/login");
};


app.get("/login", (req, res) => res.sendFile("templates/login.html",  {root: "./public"}));
app.get("/register", (req, res) => res.sendFile("templates/register.html",  {root: "./public"}));
app.get("/recoverPassword", (req, res) => res.sendFile("templates/recoverPassword.html",  {root: "./public"}));
app.get("/changePassword", (req, res) => res.sendFile("templates/changePassword.html",  {root: "./public"}));
app.get("/passwordSent", (req, res) => res.sendFile("templates/passwordSent.html",  {root: "./public"}));
app.get("/passwordChanged", (req, res) => res.sendFile("templates/passwordChanged.html",  {root: "./public"}));



//app.use(express.static(__dirname + '/public'));
passport.use(Users.createStrategy());
 
// use static serialize and deserialize of model for passport session support
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
mongoose.connect('mongodb://localhost:27017/tests');

Users.countAsync({ username: "invitado" })
  .tap(count => createOrNot(count))

const createOrNot = (count) => {
  if(count == 0)
    return Users.register({ email: "invitado@invitado.com", username: "invitado", fullPermissions: false }, "invitado123")
}

app.use('/staticos', express.static('public'));

app.get("/api/me", (req, res) => req.isAuthenticated()? res.send(req.user) : res.status(401).end());

app.use(authenticationFilter);
app.get("/", (req, res) => res.redirect("/inicio"));


app.post('/api/logout', (request, response) => {
  request.logout();
  response.redirect("/");
});

app.post('/api/level', exerciseController.create);
app.get('/api/level', exerciseController.getAll);
app.get('/api/level/:id', exerciseController.getOne);
app.post('/api/publishedLevels/:id/comments', exerciseController.comment);
app.post('/api/publishedLevels', exerciseController.publish);
app.get('/api/publishedLevels', exerciseController.getAllPublished);
app.delete('/api/publishedLevels/:id', exerciseController.depublish);
app.delete('/api/level/:id', exerciseController.delete);

app.post('/api/stats/downloads/:id', exerciseController.download);
app.post('/api/stats/rates/:id', exerciseController.rate);

app.use("*", proxy({
 logLevel: "debug",
 headers: {
    "host": "http://localhost:3000"
  },
 target: 'http://localhost:3000',
 changeOrigin: true,
 xfwd: true,
 ws: true,
}));


app.listen(9001);
