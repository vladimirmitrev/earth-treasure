const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
    let message = '';
    if (err instanceof mongoose.Error.ValidationError && err.errors) {
        // message = Object.values(err.errors).at(0).message;
        message = Object.values(err.errors).map(e => e.message).join(', ');
    } else if (err instanceof Error) {
        message = err.message;
    } else {
        message = 'An unknown error occurred';
    }
    return message;
}