const LocalStrategy = require("passport-local").Strategy;
import bcrypt from "bcrypt";

const passport = (passport: any) => {
    passport.use(
        new LocalStrategy({ usernameField: "username" }, (username: string, password: string, done: any) => {
            // User.findOne({ username: username }).then(user => {
            //     if (!user) {
            //         return done(null, false, { message: "Username is not exist" });
            //     }
            //     bcrypt.compare(password, user.password, (err, isMatch) => {
            //         if (err) throw err;
            //         if (isMatch) {
            //             return done(null, user);
            //         } else {
            //             return done(null, false, { message: "Password incorrect" });
            //         }
            //     });
            // });
        })
    );

    passport.serializeUser((user: string, done: any) => {});

    passport.deserializeUser((id: string, done: any) => {});
};

export = passport;
