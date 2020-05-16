class RestOutDto {
  data
  error

  constructor(data, error) {
    this.data = data
    this.error = error
  }

  get data() {
    return this.data
  }
  set data(value) {
    this.data = value
  }

  get error() {
    return this.error
  }
  set error(value) {
    this.error = value
  }
}

module.exports = RestOutDto
