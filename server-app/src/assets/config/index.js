if (process.env.NODE_ENV === 'production') {
  module.exports = require('./config.prod')
}
// if (process.env.NODE_ENV === 'prod-local') {
//   module.exports = require('./config.prod-local')
// } else {
//   module.exports = require('./config.dev')
// }
