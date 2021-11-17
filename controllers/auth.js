const User = require('../models/User');
const logger = require('../config/logger');
const jwtutil = require('../utils/jwtUtils')
const passwordUtil = require('../utils/passwordUtils')

/**
 * Add users.
 *
 * @param req
 * @param res
 */
module.exports.add = async (req, res) => {
    console.log(req.body);
    const { fName, lName, username, password, dob, email, gender, category } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.json({
                status: 0,
                payload: 'User with associated email already exists'
            });
        }
        console.log(req.body);
        user = new User({
            fName,
            lName,
            email,
            gender: parseInt(gender),
            username,
            password,
            category: parseInt(category),
            dob,
            status: 1
        });
        user.password = await passwordUtil.encryptPassword(password);

        await user.save();

        return res.json({
            success: 1,
            payload: {
                access_token: jwtutil.generateAccessToken('ACCESS_TOKEN', user.email),
                role: user.category,
                email: user.email,
                _id: user._id
            }

        });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            payload: 'Error saving user'
        });


    };
}

/**
 * login
 *
 * @param req
 * @param res
 */
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log(req.body);

        const user = await User.findOne({ "email": email });
        console.log(user);
        const match = await passwordUtil.comparePasswords(password, user.password);

        if (match) {
            res.send({
                success: 1,
                payload: {
                    access_token: jwtutil.generateAccessToken('ACCESS_TOKEN', user.email),
                    role: user.category,
                    username: user.username,
                    email: user.email,
                    _id: user._id
                }
            });
        } else {
            res.send({
                success: 0,
                payload: 'User not found'
            });
        }

    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            payload: 'Error logging in'
        });
    }

};

/**
 * find user by id.
 *
 * @param req
 * @param res
 */
module.exports.findById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (user) {
            res.send({
                success: 1,
                payload: user.toJSON()
            });
        } else {
            res.send({
                success: 0,
                payload: 'User not found'
            });
        }

    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            payload: 'Error fetching the user details'
        });
    }

};


/**
 * fetch all artist.
 *
 * @param req
 * @param res
 */
module.exports.fetchAllArtists = async (req, res) => {
    try {
        const users = await User.find({ category: 1 });
        if (users.length > 0) {
            res.send({
                success: 1,
                payload: users
            });
        } else {
            res.send({
                success: 0,
                payload: 'User not found'
            });
        }

    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            payload: 'Error fetching the user details'
        });
    }

};


/**
 * Update user details by id.
 *
 * @param req
 * @param res
 */
module.exports.updateUserById = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.send({
            success: 1,
            message: 'User details has been updated.'
        });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            payload: 'Error updating the user details.'
        });
    }
};

/**
 * Delete user by id.
 *
 * @param req
 * @param res
 */
module.exports.deleteUserById = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.send({
            success: 1,
            message: 'User details has been deleted.'
        });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            status: 500,
            message: 'Error deleting the user details.'
        });
    }
};

/**
 * Fetch all users.
 *
 * @param req
 * @param res
 */
module.exports.fetchAll = async (req, res) => {
    try {
        const users = await User.find();
        res.send({ success: 1, payload: users });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            success: 0,
            message: 'Error fetching the user details'
        });
    }

};


