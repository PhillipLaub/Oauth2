const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    //id from mongodb
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
    
});

passport.use(
    new LinkedInStrategy({
    //options for linkedin strategy
    callbackURL:'/auth/linkedin/redirect',
    clientID: keys.linkedin.clientID,
    clientSecret: keys.linkedin.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    //check if user already exists in database

    User.findOne({linkedinId: profile.id}).then((currentUser) => {
        if (currentUser) {
            //already have the user
            console.log('User is: ' + currentUser)
            done(null, currentUser);
        }
        else {

            //if not create user in database
            new User({
                username: profile.displayName,
                linkedinId: profile.id
            }).save().then((newUser) => {
                console.log('new user created: ' + newUser);
                done(null, newUser);
            })
        }
    })

    
})
)