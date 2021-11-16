
const Multer = require("multer");
const fileUploadService = require('../service/minioService');

module.exports = (req, res, next) => {

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
       req.fileName = fileName;
       next();
    })
}