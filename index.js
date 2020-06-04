const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const upload = require('express-fileupload')

const {deleteOriginalFile, moveFileToRepo, updateRepoAndPushToGitHub} = require('./gitScript')

app.use(upload())

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
    //__dirname : It will resolve to your project folder.
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