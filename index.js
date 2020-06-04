const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const upload = require('express-fileupload')

const {deleteOriginalFile, moveFileToRepo, updateRepoAndPushToGitHub} = require('./coreFunctions')

app.use(upload())

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use( express.static( __dirname + '/client' ));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

router.post('/', (req, res, next) => {
    if (req.files) {
        const CORRECT_NAME = 'menu_ENG.jpg'
        const file = req.files.filename;

        file.name = CORRECT_NAME;

        file.mv("./upload/" + file.name, async (err) => {
            try {
                if (err) {
                    console.log(err)
                    res.send('Error on unpload file')
                    next(err)
                } else {
                    deleteOriginalFile(CORRECT_NAME);
                    moveFileToRepo(CORRECT_NAME);
                    await updateRepoAndPushToGitHub();
                    res.send('Upload correctly')
                }
            } catch (err) {
                console.error('catch err', err)
            }

        })
    }
})


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');