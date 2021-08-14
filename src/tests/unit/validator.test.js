const Validate = require('../../lib/validator')

describe('Validate emails', () => {
  it('should return false if email is not valid', () => {
    const validateEmail = Validate.isEmail('test@ew')
    expect(validateEmail).toBeFalsy()
  })

  it('should return true if email is valid', () => {
    const validateEmail = Validate.isEmail('test@gmail.com')
    expect(validateEmail).toBeTruthy()
  })
})

describe('names validation', () => {
  it('should return false if name is not valid', () => {
    const validateName = Validate.isValidName('test@gmail')
    expect(validateName).toBeFalsy()
  })

  it('should return true if name is valid', () => {
    const validateName = Validate.isValidName('test')
    expect(validateName).toBeTruthy()
  })
})
