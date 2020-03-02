const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const keys = require('./keys');

passport.use(
    new LinkedInStrategy({
    //options for linkedin strategy
    callbackURL:'/auth/linkedin/redirect',
    clientID: keys.linkedin.clientID,
    clientSecret: keys.linkedin.clientSecret
}, (acessToken, refreshToken, profile, done) => {
    //passport callback function
    console.log('passport callback function fired')
    console.log(profile)
})
)