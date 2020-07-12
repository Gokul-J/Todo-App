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
// mongoose.connect("mongodb://localhost/todo_app", { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb+srv://Gokul-J:<password>@todo-app.o8wqz.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
// const mongoose = require('mongoose');
const connection = "mongodb+srv://Gokul-J:jothi@2009@todo-app.o8wqz.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log("Catch"+err));


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

app.use(express.static('/build'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build'))
})

//ROUTES CONFIG
app.use(todoRoutes);
app.use(indexRoutes);

//LOGIN USER
app.use((req,res,user) => {
  res.locals.currentUser = req.user;
})

//SERVER LISTEN PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is Live on ${port}");
})