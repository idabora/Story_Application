const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const User = require('../Models/UserSchema')


module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        // passReqToCallback:true

    },
    async (accessToken, refreshToken, profile, done) => {
            console.log(profile);   //consoles the user loggged in google account details
            console.log("one")
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                FirstName: profile.name.givenName,
                lastname: profile.name.familyName,
                image: profile.photos[0].value
            }
            try {
                let user = await User.findOne({ googleId: profile.id })
                if (user) {

                    done(null,user)

                }
                else {
                    user = await User.create(newUser);
                    done(null,user);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    )
    )
    passport.serializeUser((user, done) => {
        console.log("two");
        done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
        // console.log("thro");
        User.findById(id)
        .then((user)=>{
            done(null,user);
        })
        .catch((err)=>{
            console.log(err);
        })
    })
}