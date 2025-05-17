const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const signRouter = require('./routes/signRouter');
const loginRouter = require('./routes/loginRouter');
const secretRouter = require('./routes/secretRouter');
const createRouter = require("./routes/createRouter");
const db = require('./db/queries');

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
const initPassport = require("./passport");
initPassport(app);
app.use(express.urlencoded({ extended: false }));

app.get("/", async(req, res) => {
    const messages = await db.getMessages();
    res.render("index", { user: req.user, messages: messages });
});

app.use("/sign-up", signRouter);
app.use("/login", loginRouter);
app.use("/secret", secretRouter);
app.use("/create", createRouter);

app.listen(3002);