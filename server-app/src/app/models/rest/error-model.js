class ErrorModel {
  code
  message
  info

  constructor(code, message, info) {
    this.code = code
    this.message = message
    this.info = info
  }

  get code() {
    return this.code
  }
  set code(value) {
    this.code = value
  }

  get message() {
    return this.message
  }
  set message(value) {
    this.message = value
  }

  get info() {
    return this.info
  }
  set info(value) {
    this.info = value
  }
}

module.exports = ErrorModel
