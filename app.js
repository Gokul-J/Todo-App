const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  mongoose = require("mongoose"),
  todoRoutes = require("./routes/todo"),
  indexRoutes = require("./routes/index"),
  User = require("./models/user"),
  path = require('path');

//MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/todo_app", { useNewUrlParser: true, useUnifiedTopology: true });

//APP CONFIG
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": "false" }));
app.use('/', express.static(path.join(__dirname, './build')));

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "I Love Coding",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES CONFIG
app.use("/api/todo",todoRoutes);
app.use("/api/user",indexRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

//LOGIN USER
app.use((req,res,user) => {
  res.locals.currentUser = req.user;
})

//SERVER LISTEN PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is Live on "+port);
})
