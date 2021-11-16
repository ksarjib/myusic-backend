const Minio = require("minio");
console.log(process.env.MONGO_URL);


function getMinioClient() {
    return new Minio.Client({
        
            endPoint: process.env.MINIO_URL,
        
            port: 9000,
        
            useSSL: true,
        
            accessKey: process.env.MINIO_ACCESS,
        
            secretKey: process.env.MINIO_SECRET
        
        });
}

module.exports.uploadFile = async function (file, fileName) {
    
console.log(process.env.MINIO_SECRET);
console.log(process.env.MINIO_ACCESS);
    console.log('Inside minio service');
    console.log(fileName);
    console.log('File');
    console.log(file);
    
console.log(process.env.MONGO_URL);
    await getMinioClient().putObject("myusic", fileName, file, function (error, etag) {

        if (error) {

            return console.log(error);

        }
        console.log('File uploaded successfully!');
        // res.send(req.file);

    });

}


module.exports.download = function (request, response) {

    minioClient.getObject("ed_2step.mp3", request.query.filename, function (error, stream) {

        if (error) {

            return response.status(500).send(error);

        }

        stream.pipe(response);

    });

};