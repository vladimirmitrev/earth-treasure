const util = require('util');
const jwt = require('jsonwebtoken');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

// jwt.sign(payload, SECRET, {expiresIn: '2h'});
module.exports = {
    sign,
    verify,
};