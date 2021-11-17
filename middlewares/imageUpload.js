
const Multer = require("multer");
const fileUploadService = require('../service/minioService');

module.exports = async (req, res, next) => {
    console.log(`good`, req.body);
    // let upload = Multer({ storage: Multer.memoryStorage() }).single("music");
    // upload(req, res, async function (err) {
    // console.log(`bad`,req.body);
    console.log(req.files);
    // return res.json({done: 1})
    const file = req.files.music;
    const fileName = 'music-' + Date.now().toString();
    console.log('FileName =================');
    console.log(file);
    console.log('Request body logged');
    console.log(req.body);
    let buffer = Buffer.from(file.data);
    const { title, description, artist_id, genre } = req.body;
    console.log(`title ${title}`);
    console.log(`description ${description}`);
    console.log(`artist_id ${artist_id}`);
    if (title && description && artist_id && genre) {
        await fileUploadService.uploadFile(buffer, fileName);
        req.fileName = fileName;
        next();
    } else {
        return res.json({
            success: 0,
            msg: "not uploaded"
        });
    }

    // })
}