const Artist = require('../models/Artist')


module.exports.add = async (req, res) => {
    const { name, email, dob, songs } = req.body;

    const artist = new Artist({name, email, dob, songs });
    await artist.save();

    res.send({
        message: 'Saved',
        artist: artist.toJSON()
    });
};


module.exports.fetchAll = async (req, res) => {
    try {
        const artist = await Artist.find();
        res.send({ success: 1, payload: artist });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            message: 'Error fetching the Artist details'
        });
    }

};


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
