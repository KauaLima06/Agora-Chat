const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const axios = require('axios');
const urlBase = 'https://agora-api-rest.herokuapp.com';

const passaportLocalStrategy = (passport) => {

    const authenticateUser = async(email, password, done) => {
    
        try {
            const { data: user } = await axios.get(`${urlBase}/user/findByEmail/${email}`);
            
            if(!user || user == undefined || user == null) return done(null, false);
            
            const { password: userPass } = user;

            const comparePass = await bcrypt.compare(password, userPass);
            if(comparePass){
                return done(null, user);
            }else {
                return done(null, false);
            }

        } catch (error) {
            console.log(error)
            return done(null, false)
        }        
    }
    
    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user, done) => {
        const { _id, userName, userId, email, contactList, chats, isConfirmed } = user;
        const userToSession = {
            _id,
            userId,
            isConfirmed,
        };
        done(null, userToSession)
    });
    passport.deserializeUser((userObj, done) => {
        const userId = userObj.userId;
        done(
        null, 
        axios.get(`${urlBase}/user/findById/${userId}`)
    )});

};

module.exports = passaportLocalStrategy;