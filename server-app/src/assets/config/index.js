configFilename = './config.' + process.env.NODE_ENV + '.js'
console.log(configFilename)
module.exports = require(configFilename)
