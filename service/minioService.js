const Minio = require("minio");
console.log(process.env.MONGO_URL);
let minioClient = new Minio.Client({
//     MINIO_ACCESS=Q3AM3UQ867SPQQA43P2F
// MINIO_SECRET=zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG
// MINIO_PORT=9000
// MINIO_URL=play.minio.io

    endPoint: 'play.minio.io',

    port: 9000,

    useSSL: true,

    accessKey: 'Q3AM3UQ867SPQQA43P2F',

    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'

});

module.exports.uploadFile = async function (file, fileName) {
    console.log('Inside minio service');
    console.log(fileName);
    console.log('File');
    console.log(file);
    await minioClient.putObject("myusic", fileName, file, function (error, etag) {

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