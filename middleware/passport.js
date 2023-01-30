const { googleClientId, googleClientSecret } = require('../config')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user.model');
const Counter = require('../model/counter.model');


module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
    async function (accessToken, refreshToken,token, profile,cb) {
    //console.log('trying to access google account',profile);
    // console.log('...........',token.id_token)
      try {
        const user = await User.findOne({ googleUserId: profile.id })

        if (user) {
          // const toLook = e.includes({ googleUserId: profile.id });
          // if (toLook) {
          //   reason = 'Email already exists';
          // }
          const sequence = await Counter.find({ id: "userId" }, { seq: 1 }).lean();
          const getSequence = await User.find().sort({ userId: -1 }).limit(1).lean();

          const value = sequence[0].seq - 1;
          if (sequence[0].seq > getSequence[0].userId) {

            result = await Counter.updateMany(
              { id: "userId" },
              {
                $set: {
                  seq: value
                }
              })
          }
          const userData ={
            user:user,
            token:token.id_token
          }
          return cb(null,userData)
        }

        const newUser = await User.create({
          googleUserId: profile.id,
          userFirstName: profile.name.givenName,
          userLastName: profile.name.familyName,
          userEmail : profile.emails[0].value,
          userPhoto: profile.photos[0].value
        })
        const userData ={
          user:newUser,
          token:token.id_token
        }
        return cb(null,userData);
      }
      catch (err) {
        console.log('pass...',err)
      }
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null,user);
  });
}