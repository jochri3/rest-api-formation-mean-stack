class Validate {
  static isEmail(email) {
    const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return regex.test(email)
  }

  static isValidName(name) {
    const regex = /^[a-zA-Z]+[a-zA-Z ]+$/
    return regex.test(name)
  }

  static isValidPhone(phone) {
    const regex = /^[0-9]{10,}$/
    return regex.test(phone)
  }

  static isRequired(value) {
    return value?.length > 0 && value !== 'undefined'
  }

  static isMinMax(value, min, max) {
    return value >= min && value <= max
  }

  static isValidStatus(value) {
    return value === 'active' || value === 'inactive'
  }
}

module.exports = Validate
