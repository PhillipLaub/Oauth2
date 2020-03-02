const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
res.render('login');
});

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    res.send('logging out');
});

//auth with google
router.get('/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
}));

//callback route for linkedin to redirect to

router.get('/linkedin/redirect', (req, res) => {
    res.send('you reached the callback URI')
})


module.exports = router;