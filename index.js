const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const upload = require('express-fileupload')

const handleImagesOnRequest = require('./coreFunctions')

app.use(upload())

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use( express.static( __dirname + '/client' ));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

router.post('/', async (req, res, next) => {
    try{
        if (req.files) {
            await handleImagesOnRequest(req.files);
            res.send('Upload correctly')
        }
        next();
    }catch(err){
        next();
    }

    
})


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');