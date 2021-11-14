
const bcrypt = require('bcryptjs');

module.exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(password, salt);
    return encrypted;
}

module.exports.comparePasswords = async (pass1, pass2) => {
    return await bcrypt.compare(pass1, pass2);
} 