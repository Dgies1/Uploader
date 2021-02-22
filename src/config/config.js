const path = require('path');
const rootPath = path.normalize(__dirname + '/..')
const env = process.env.NODE_ENV || 'development';

const config = {

    development: {
        root: rootPath,
        port:process.env.PORT || 3322
    }
};



module.exports = config[env];