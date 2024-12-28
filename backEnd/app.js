const express = require('express');
const bp = require('body-parser');
const database = require('./database');
const cors = require('cors');

const session = require("express-session");



const app = express();

app.use(express.json());
app.use(bp.urlencoded({extended: true}));
const corsOptions = {
  origin: "http://localhost:3000", // React app's URL (make sure this matches your frontend URL)
  methods: ["GET", "POST"],
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));


app.use(
  session({
    secret: "your-secret-key", // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Make sure this is false in non-https environments
      httpOnly: true,
      maxAge: 60000 * 60 * 24, // 1 day
    },
  })
);

app.listen(80, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("server is running at port 80"); 
});



// Middleware to check session
app.get("/session-check", (req, res) => {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
    }
});


const registerRouter = require('./Routers/registerRouter') ; 
app.use('/register' , registerRouter); 


const loginRouter = require('./Routers/loginRouter'); 
app.use('/login', loginRouter);

const logoutRouter = require('./Routers/logoutRouter');
app.use('/logout', logoutRouter);
