const Rating = require('../models/Rating');


module.exports.add = async (req, res) => {
    console.log(req.body);
    const { title, date, fileName, description, artist_id } = req.body;
    try {
        let rating = await Rating.findOne({
            title
        });
        if (rating) {
            return res.json({
                status: 0,
                payload: 'Music with associated title already exists'
            });
        }

        rating = new Rating({
            tsong_id ,
            rating ,
            rated_by ,
            
            status: 1
        });
       // user.password = await passwordUtil.encryptPassword(password);

        await rating.save();

        return res.json({
            status: 200,
            message: 'Rating Saved'
        });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            status: 500,
            message: 'Error saving Rating'
        });


    };
}

module.exports.fetchAll = async (req, res) => {
    try {
        const rating = await Rating.find();
        res.send({ success: 1, payload: rating });
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