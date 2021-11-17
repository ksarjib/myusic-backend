const Subscription = require('../models/Subscription');
const logger = require('../config/logger');
const User = require('../models/User');
const Artist = require('../models/Artist');



module.exports.subscribe = async (req, res) => {
    console.log('Inside subscription controller');

    const { userId, artistId, artistStageName } = req.body;
    // const artist = Artist.schema.findOne(artist_id)
    const subs = await Subscription.find({ subscribed_by: userId, artist_id: artistId });
    if (subs.length > 0) {
        console.log(subs);
        return res.json({
            status: 400,
            message: 'Already subscribed'
        });
    }
    const artist = User.schema.findOne(artist_id);

    try {

        let subscription = new Subscription({
            subscribed_by: userId,
            artist_id: artistId,
            stage_name: artistStageName,

        });

        await subscription.save();

        return res.json({
            status: 200,
            message: 'subscribed'
        });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            status: 500,
            message: 'Error Saving Subscription'
        });
    };
}

module.exports.unsubscribe = async (req, res) => {
    const { userId, artistId } = req.body;
    try {
        await Subscription.remove({ subscribed_by: userId, artist_id: artistId })
        return res.json({
            status: 200,
            message: 'unSubscribed'
        });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            status: 500,
            message: 'Error while unsubscribing'
        });


    };
}


