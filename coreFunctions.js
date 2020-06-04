
const shellJs = require('shelljs');
const path = require('path');


async function handleImagesOnRequest(files) {
      try{
         const allPromises = checkFilesAndReturnAllPromises(files);
         if(allPromises.length > 0){
            await Promise.all(allPromises)
            console.log('All promises resolved.')
            deleteAllFilesFromUploads();
            updateRepoAndPushToGitHub();
         }   
      }catch(err){
         console.log('ERROR PROMISE ALL', err)
      }
}

function checkFilesAndReturnAllPromises(files){
   const allPromises = [];
   if (files.cat_1) {
      const CAT_1_FILENAME = 'menu_CAT_1.jpg'
      files.cat_1.name = CAT_1_FILENAME;

      const catPromise = createPromise(files.cat_1)
      allPromises.push(catPromise);
   }
   if (files.cat_2) {
      const CAT_2_FILENAME = 'menu_CAT_2.jpg'
      files.cat_2.name = CAT_2_FILENAME;

      const catPromise = createPromise(files.cat_2)
      allPromises.push(catPromise);
   }
   if (files.esp_1) {
      const ESP_1_FILENAME = 'menu_ESP_1.jpg'
      files.esp_1.name = esp_1_FILENAME;

      const espPromise = createPromise(files.esp_1)
      allPromises.push(espPromise);
   }
   if (files.esp_2) {
      const ESP_2_FILENAME = 'menu_ESP_2.jpg'
      files.esp_2.name = esp_2_FILENAME;

      const espPromise = createPromise(files.esp_2)
      allPromises.push(espPromise);
   }
   if (files.eng) {
      const ENG_FILENAME = 'menu_ENG.jpg'
      files.eng.name = ENG_FILENAME;

      const engPromise = createPromise(files.eng)
      allPromises.push(engPromise);
   }
   if (files.de) {
      const DE_FILENAME = 'menu_DE.jpg'
      files.de.name = DE_FILENAME;

      const dePromise = createPromise(files.de)
      allPromises.push(dePromise);
   }
   if (files.ita) {
      const ITA_FILENAME = 'menu_ITA.jpg'
      files.ita.name = ITA_FILENAME;

      const itaPromise = createPromise(files.ita)
      allPromises.push(itaPromise);
   }
   if (files.fr) {
      const FR_FILENAME = 'menu_FR.jpg'
      files.fr.name = FR_FILENAME;

      const frPromise = createPromise(files.fr)
      allPromises.push(frPromise);
   }
   if (files.nl) {
      const NL_FILENAME = 'menu_NL.jpg'
      files.nl.name = NL_FILENAME;

      const nlPromise = createPromise(files.nl)
      allPromises.push(nlPromise);
   }
   if (files.ru) {
      const RU_FILENAME = 'menu_RU.jpg'
      files.ru.name = RU_FILENAME;

      const ruPromise = createPromise(files.ru)
      allPromises.push(ruPromise);
   }
   return allPromises;
}

function createPromise(file) {
   return new Promise(async (resolve, reject) => {
      const succeed = await deleteOgAndMoveToRepo(file)
      if(succeed){
         resolve(true);
      }else{
         reject(new Error("…????"));
      }
   });
}

function deleteAllFilesFromUploads() {
   const rm = shellJs.rm(path.join(__dirname + `/uploads/*`))
}

function deleteOriginalFile(filename) {
   const rm = shellJs.rm(path.join(__dirname + `/webpage/src/images/menus/${filename}`))
   return shellJs.error();
}

function moveFileToRepo(filename) {
   shellJs.mv(path.join(__dirname + `/uploads/${filename}`), path.join(__dirname + `/webpage/src/images/menus`))
   return shellJs.error();
}


async function deleteOgAndMoveToRepo(file) {

   try{
      await file.mv("./uploads/" + file.name)
      const errorOnDelete = deleteOriginalFile(file.name);
      if (errorOnDelete === null) {
         const errorOnMove = moveFileToRepo(file.name);
         if (errorOnMove === null) {
            console.log(`Successfully deleted og and moved file ${file.name}`)
            return true;
         }
         console.log(`Error on move file${file.name}`)
        return false;
      }
      console.log(`Error on delete file${file.name}`)
      return false
   }catch(err){
      console.error(`Error on unpload file${file.name}`)
      return false;
   }
}

function updateRepoAndPushToGitHub() {
   shellJs.cd('./webpage/');
   const { stdout: currentDirectory } = shellJs.pwd();
   if (currentDirectory.includes('webpage')) {
      const simpleGitPromise = require('simple-git/promise')();
      console.log('Switched to webpage dir')
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
      simpleGitPromise.push('origin', 'master')
         .then((success) => {
            console.log('repo successfully pushed');
         }, (failed) => {
            console.log('repo push failed', failed);
         });
   }

}

module.exports = handleImagesOnRequest;