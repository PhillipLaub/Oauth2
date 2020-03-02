const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
//setup view engine
app.set('view engine','ejs');

app.use(cookieSession({
    //one day
    maxAge: 24 * 60 * 60 * 1000,
    //encrypt cookie when sent to browser
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("connected to mongodb")
});

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get('/', (req, res)=> {
res.render('home', {user:req.user});
});

app.listen(3000,() => {
    console.log('app now listening for requests on port 3000')
});