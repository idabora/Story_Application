const express = require('express');
var bodyParser = require('body-parser');
const passport = require('passport');
const router = express.Router();



// Auth with GOOGLE
// route GET/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))


// GOOGLE auth callback
// route GET/auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req,res)=>{
    console.log("four");
    res.redirect(302,"/dashboard")
})

// Logout User
// route /auth/logout
router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { console.log(err); }
        res.redirect('/');
    })
})

module.exports = router;