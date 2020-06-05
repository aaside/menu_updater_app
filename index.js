const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const upload = require('express-fileupload')

const handleImagesOnRequest = require('./coreFunctions')
const errorHandler = require('./errorMiddleware')
const checkAuth = require('./authLogin')
 
app.use(express.urlencoded({ extended: true }));

app.use(upload())

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use( express.static( __dirname + '/client' ));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/login.html'));
    //res.sendFile(path.join(__dirname + '/client/imageUploader.html'));
});

router.post('/login',async (req, res, next) => {
    console.log('REQUEST...',req.body)
    try{
        const user = req.body.user;    
        const password = req.body.password;  

        const authRes = await checkAuth(user,password)
        
        if(authRes.result){
            res.sendFile(path.join(__dirname + '/client/imageUploader.html')); 
        }else{
            res.send(authRes.message);
        }
    }catch(err){
        res.send(authRes.message);
    }
})

router.post('/', async (req, res, next) => {
    try{
        if (req.files) {
            const success = await handleImagesOnRequest(req.files,next);
            if(success){
                res.sendFile(path.join(__dirname + '/client/uploadedCorrectly.html'));                
            }
        }else{
            next(`No s'han trobat imatges`)
        }
    }catch(err){}

    
})


//add the router
app.use('/', router);
app.use(errorHandler);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');