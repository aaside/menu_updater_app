const bcrypt = require('bcryptjs');
require('dotenv').config();



async function checkAuth(user,password){
    try{
        if(user !== process.env.USER_USER){
            return {
                result: false,
                message: `L'usuari no és correcte`
            }
        }
        const hashedPassword = process.env.USER_PASSWORD;
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        console.log('CORRECT?',isPasswordCorrect);
        
        if(isPasswordCorrect){
            return {
                result: true,
                message: `S' ha loggejat correctament`
            }
        }else {
            return {
                result: false,
                message: `La password no és correcte`
            }
        }
    }catch(err){
        console.error(err);
        return {
            result: false,
            message: `Hi ha agut un error. Torna a intentar-ho`
        }
    }
}

module.exports = checkAuth;