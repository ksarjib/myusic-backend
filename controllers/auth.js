const User = require('../models/User');
const logger = require('../config/logger');
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

        user = new User({
            fName,
            lName,
            email,
            gender,
            username,
            password,
            category,
            dob,
            status: 1
        });
        user.password = await passwordUtil.encryptPassword(password);

        await user.save();

        return res.json({
            status: 200,
            message: 'User Saved'
        });
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        return res.json({
            status: 500,
            message: 'Error saving user'
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
        const match = await passwordUtil.comparePasswords(password, user.password);

        if (match) {
            res.send({
                success: 1,
                payload: user
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
            status: 500,
            message: 'Error logging in'
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
            status: 500,
            message: 'Error fetching the user details'
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
            message: 'Error updating the user details.'
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


