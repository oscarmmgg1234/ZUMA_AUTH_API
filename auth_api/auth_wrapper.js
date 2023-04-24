const {signIn} = require('./auth');

const sing_in_wrapper = async (args,callback) => {
    return callback(await signIn(args));
}

exports.sign_in = sing_in_wrapper;
