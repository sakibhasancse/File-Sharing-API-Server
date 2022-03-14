export class GenaralError extends Error {
  constructor(message) {
    super()

    this.message = message
  }
  getCode() { return 400 }

}

export class BadRequest extends GenaralError {
  constructor(message) {
    super(message)
    this.name = 'BadRequest'
  }
  getCode() { return 400 }
}

export class NotFound extends GenaralError {
  constructor(message) {
    super(message)
    this.name = 'Not Found'

  }
  getCode() { return 404 }
}