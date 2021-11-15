
// const Music = require('../models/Music');
// const logger = require('../config/logger');
// const jwtutil = require('../utils/jwtUtils')
// const passwordUtil = require('../utils/passwordUtils')

// /**
//  * Add users.
//  *
//  * @param req
//  * @param res
//  */

// module.exports.add = async (req, res) => {
//     console.log(req.body);
//     const { title, date, fileName, description, artist_id } = req.body;
//     try {
//         let music = await Music.findOne({
//             title
//         });
//         if (music) {
//             return res.json({
//                 status: 0,
//                 payload: 'Music with associated title already exists'
//             });
//         }

//         music = new Music({
//             title, 
//             date, 
//             fileName, 
//             description, 
//             artist_id,
//             status: 1
//         });
//        // user.password = await passwordUtil.encryptPassword(password);

//         await music.save();

//         return res.json({
//             status: 200,
//             message: 'music Saved'
//         });
//     } catch (err) {
//         logger.log({
//             level: 'error',
//             message: err.message
//         });
//         return res.json({
//             status: 500,
//             message: 'Error saving music'
//         });


//     };
// }


// /**
//  * find user by id.
//  *
//  * @param req
//  * @param res
//  */
// module.exports.findById = async (req, res) => {
//     try {
//         const musicId = req.params.id;

//         const music = await Music.findById(musicId);
//         if (music) {
//             res.send({
//                 success: 1,
//                 payload: music.toJSON()
//             });
//         } else {
//             res.send({
//                 success: 0,
//                 payload: 'music not found'
//             });
//         }

//     } catch (err) {
//         logger.log({
//             level: 'error',
//             message: err.message
//         });
//         return res.json({
//             status: 500,
//             message: 'Error fetching the music details'
//         });
//     }

// };

// /**
//  * Update user details by id.
//  *
//  * @param req
//  * @param res
//  */
// module.exports.updateMusicById = async (req, res) => {
//     try {
//         await Music.findByIdAndUpdate(req.params.id, req.body);
//         return res.send({
//             success: 1,
//             message: 'music details has been updated.'
//         });
//     } catch (err) {
//         logger.log({
//             level: 'error',
//             message: err.message
//         });
//         return res.json({
//             success: 0,
//             message: 'Error updating the music details.'
//         });
//     }
// };

// /**
//  * Delete user by id.
//  *
//  * @param req
//  * @param res
//  */
// module.exports.deleteMusicById = async (req, res) => {
//     try {
//         await Music.findByIdAndDelete(req.params.id);
//         return res.send({
//             success: 1,
//             message: 'Music details has been deleted.'
//         });
//     } catch (err) {
//         logger.log({
//             level: 'error',
//             message: err.message
//         });
//         return res.json({
//             status: 500,
//             message: 'Error deleting the music details.'
//         });
//     }
// };

// /**
//  * Fetch all users.
//  *
//  * @param req
//  * @param res
//  */
// module.exports.fetchAll = async (req, res) => {
//     try {
//         const musics = await Music.find();
//         res.send({ success: 1, payload: musics });
//     } catch (err) {
//         logger.log({
//             level: 'error',
//             message: err.message
//         });
//         return res.json({
//             success: 0,
//             message: 'Error fetching the music details'
//         });
//     }

// };

// module.exports.removeAll = async (req, res) => {
//     try {
//         await Music.deleteMany();
// const response = {"deleted" : "delete success"};
//         res.send({ success: 1, payload: response });
//     } catch (err) {
//         logger.log({
//             level: 'error',
//             message: err.message
//         });
//         return res.json({
//             success: 0,
//             message: 'Error fetching the music details'
//         });
//     }

// };


