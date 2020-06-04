
const shellJs = require('shelljs');
//const simpleGitPromise = require('simple-git/promise')('./webpage/');
const path = require('path');

function deleteOriginalFile(filename){
    shellJs.rm(path.join(__dirname + `/webpage/src/images/menus/${filename}`))
}

function moveFileToRepo(filename){
    shellJs.mv(path.join(__dirname + `/upload/${filename}`),path.join(__dirname + `/webpage/src/images/menus`))
}

async function updateRepoAndPushToGitHub(){
    shellJs.cd('./webpage/');
    const {stdout:currentDirectory} = shellJs.pwd();
    if(currentDirectory.includes('webpage')){
        const simpleGitPromise = require('simple-git/promise')();
        console.log('We are in the correct dir')
        simpleGitPromise.add('.')
        .then(
           (addSuccess) => {
              console.log(addSuccess);
           }, (failedAdd) => {
              console.log('adding files failed', failedAdd);
        });
     simpleGitPromise.commit('Updated menus')
       .then(
          (successCommit) => {
            console.log(successCommit);
         }, (failed) => {
            console.log('failed commmit', failed);
     });
     simpleGitPromise.push('origin','master')
     .then((success) => {
        console.log('repo successfully pushed');
     },(failed)=> {
        console.log('repo push failed', failed);
  });
    }

}

module.exports = {
    deleteOriginalFile, 
    moveFileToRepo, 
    updateRepoAndPushToGitHub
};