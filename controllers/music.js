
const Music = require('../models/Music');
const logger = require('../config/logger');
const Subscription = require('../models/Subscription');

/**
 * Add music by artist.
 *
 * @param req
 * @param res
 */

module.exports.add = async (req, res) => {
    console.log('Inside music controller');
    const fileName = req.fileName;
    const { title, description, artist_id, genre, stageName } = req.body;
    console.log({ title, description, artist_id, stageName, genre })
    // console.log(req.body);
    try {

        let music = new Music({
            title,
            date: new Date(),
            fileName,
            description,
            artist_id,
            genre,
            stageName 
        });

        music = await music.save();

        return res.json({
            status: 200,
            message: music
        });
    } catch (err) {
        console.log('I am inside catch in music controller');
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            status: 500,
            message: 'Error saving music'
        });


    };
}


/**
 * find user by id.
 *
 * @param req
 * @param res
 */
module.exports.findById = async (req, res) => {
    try {
        const musicId = req.params.id;

        const music = await Music.findById(musicId);
        if (music) {
            res.send({
                success: 1,
                payload: music.toJSON()
            });
        } else {
            res.send({
                success: 0,
                payload: 'music not found'
            });
        }

    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            status: 500,
            message: 'Error fetching the music details'
        });
    }

};


/**
 * find user by id.
 *
 * @param req
 * @param res
 */
module.exports.findAllSubscribedMusicForUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const subscribedArtists = await Subscription.find({ subscribed_by: userId });

        const artistsIds = subscribedArtists.map(artist => {
            return artist._id;
        });

        const musics = Music.find({
            'artist_id': { $in: artistsIds }
        });

        if (musics) {
            res.send({
                success: 1,
                payload: musics
            });
        } else {
            res.send({
                success: 0,
                payload: 'No musics to show yet. May be you have not subscribed to any musician.'
            });
        }

    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            status: 500,
            message: 'Error fetching the music details'
        });
    }

};

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

/**
 * Fetch all users.
 *
 * @param req
 * @param res
 */
module.exports.fetchAll = async (req, res) => {
    try {
        const musics = await Music.find();
        res.send({ success: 1, payload: musics });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            message: 'Error fetching the music details'
        });
    }

};


/**
 * Fetch all users.
 *
 * @param req
 * @param res
 */
module.exports.fetchAllForArtist = async (req, res) => {
    try {
        console.log('an artists music. artist_id ==' + req.params.id);
        const musics = await Music.find({ artist_id: req.params.id }).sort({date :-1});
        console.log(musics);
        res.send({ success: 1, payload: musics });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            message: 'Error fetching the music details'
        });
    }

};


