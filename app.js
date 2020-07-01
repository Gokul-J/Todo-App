const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  mongoose = require("mongoose"),
  todoRoutes = require("./routes/todo"),
  indexRoutes = require("./routes/index"),
  User = require("./models/user");

//MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/todo_app", { useNewUrlParser: true, useUnifiedTopology: true });

//APP CONFIG
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": "false" }));

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
app.use(todoRoutes);
app.use(indexRoutes);

//LOGIN USER
app.use((req,res,user) => {
  res.locals.currentUser = req.user;
})

app.listen(5000, () => {
  console.log("Server is Live on 5000");
})