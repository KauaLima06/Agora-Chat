const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const axios = require('axios');
const urlBase = 'https://agora-api-rest.herokuapp.com';

const passaportLocalStrategy = (passport) => {

    const authenticateUser = async(email, password, done) => {

        const { data: user } = await axios.get(`${urlBase}/user/findByEmail/${email}`);
        
        if(!user || user === undefined || user === null) return done(null, false);

        try {
            
            const { password: userPass } = user;

            const comparePass = await bcrypt.compare(password, userPass);
            if(comparePass){
                return done(null, user);
            }else {
                console.log(user)
                return done(null, false);
            }

        } catch (error) {
            console.log(error);
            return done(error)
        }        
    }
    
    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.userId));
    passport.deserializeUser((userId, done) => 
        done(
        null, 
        axios.get(`${urlBase}/user/findById/${userId}`)
    ));

};

module.exports = passaportLocalStrategy;