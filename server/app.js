require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db")
const app = express();
const port = process.env.PORT || 4000;
const passport = require("passport")
const session = require("express-session");
const OAuth2 = require("passport-google-oauth2").Strategy
const userdb = require("./models/userSchema")
const MongoStore = require('connect-mongo');
const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;

//cors middleware
app.use(cors({
    origin: process.env.REACT_APP_FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));


app.use(express.json());

//session setup
app.use(session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } 
}));


//passport setup
app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new OAuth2({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: `${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`,
        scope: ["profile","email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            
            try {
                let user = await userdb.findOne({ googleId: profile.id })
                
                if (!user) {
                    user = new userdb({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value
                    });
                    await user.save();
                }
                return done(null, user);

            } catch (error) {
                return done(error,null);
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userdb.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

//initial google login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: `${process.env.REACT_APP_FRONTEND_URL}/`,
    failureRedirect: `${process.env.REACT_APP_FRONTEND_URL}/login`
}))

app.get('/login/success', (req, res) => {
  console.log("User in session:", req.user);
  if (req.user) {
    res.status(200).json({ success: true, message: "User logged in successfully", user: req.user });
  } else {
    res.status(400).json({ success: false, message: "Not Authorized User" });
  }
});


// Logout route in your server
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(`${process.env.REACT_APP_FRONTEND_URL}/login`);
  });
});


// Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);    
})
