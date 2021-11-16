const express = require('express');
const Multer = require("multer");
const musicController = require('../controllers/music');
const router = express.Router();
const { add,fetchAll,findById} = musicController;
const fileUploadService = require('../service/minioService');

/**
 * Add a music
 * 
 */

 router.post('/', (req, res, next) => {

     let upload = Multer({ storage: Multer.memoryStorage() }).single("music");
     upload(req, res, async function(err) {
        console.log(req);
        const file = req.files.music;
        const fileName = 'music-' + Date.now().toString();
        console.log('FileName =================');
        console.log(file);
        console.log('Request body logged');
        console.log(req.body);
        let buffer = Buffer.from(file.data);

        await fileUploadService.uploadFile(buffer, fileName);
        req.filename = fileName;
        next();
     })
 }, add);

// // /**
// //  * User Login.
// //  */
// // router.post('/login', login);

/**
 * Get all musics.
 */
router.get('/', fetchAll);

/**
 * Search a music by id.
 */
router.get('/:id', findById);





// /**
//  * Update a music by id.
//  */
// router.put('/:id', updateMusicById);

// /**
//  * Delete a music by id.
//  */
// router.delete('/:id', deleteMusicById);
// /**
//  * Delete all musics.
//  */

// router.delete('/',removeAll);

module.exports = router;
