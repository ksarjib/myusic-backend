const Artist = require('../models/Artist');
const User = require('../models/User');
const logger = require('../config/logger');

module.exports.add = async (req, res) => {
    const { name, email, dob, songs } = req.body;

    const artist = new Artist({name, email, dob, songs });
    await artist.save();

    res.send({
        message: 'Saved',
        artist: artist.toJSON()
    });
};


/**
 * find artists
 *
 * @param req
 * @param res
 */
 module.exports.fetchAll = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.find({category: 1});
        if (user) {
            res.send({
                success: 1,
                payload: user
            });
        } else {
            res.send({
                success: 0,
                payload: 'Artist not found'
            });
        }

    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            status: 500,
            message: 'Error fetching the artists'
        });
    }

};



// module.exports.fetchAll = async (req, res) => {
//     try {
//         const artist = await Artist.find();
//         res.send({ success: 1, payload: artist });
//     } catch (err) {
//         logger.log({
//             level: 'error',
//             message: err.message
//         });
//         return res.json({
//             success: 0,
//             message: 'Error fetching the Artist details'
//         });
//     }

// };


module.exports.buildArtistSeachQuery = (name) => {
    const query = {};
    if (name) {
        query.name = new RegExp(`.*${name}.*`, 'i');
    }
    return query;
};


module.exports.findArtistByName = async (req, res)=>{
    const { name = undefined } = req.query;
    const query = this.buildArtistSeachQuery(name);
    try {
        const artist = await Artist.find(query);
        res.send({ success: 1, payload: artist });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            message: 'Can Not Find Artist With This Name'
        });
    }

}
