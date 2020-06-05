const bcrypt = require('bcryptjs');
require('dotenv').config();

function hashpassword(){
   bcrypt.hash(process.env.USER_PASSWORD, 12).then((password)=>{
       console.log('PASSWORD->',password)
   })
}

hashpassword();