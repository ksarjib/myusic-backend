const Subscription = require('../models/Subscription');
const logger = require('../config/logger');
const User = require('../models/User');
const Artist = require('../models/Artist');



module.exports.subscribe = async (req, res) => {
    console.log('Inside music controller');

    const { id, artist_id} = req.params;
    // const artist = Artist.schema.findOne(artist_id)
    const user = User.schema.findOne(id);
    console.log(user + "user *****************");

    try {

        let subscription = new Subscription({
            subscribed_by: id,
            artist_id: artist_id,
            name : user.fname,
          stage_name: user.username, 
            
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

module.exports.unsubscribe = async(req, res)=>{
    // const {id,artist_id} = req.params;
    try {
      await  Subscription.remove(id)
       

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
            message: 'Error Saving Subscription'
        });


    };
}


