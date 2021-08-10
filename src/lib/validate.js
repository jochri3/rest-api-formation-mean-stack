//server side

export class Validate {
  static isEmail(email) {
    var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return regex.test(email);
  }

  static isValidName(name) {
    var regex = /^[a-zA-Z]+[a-zA-Z ]+$/;
    return regex.test(name);
  }

  static isValidPhone(phone) {
    var regex = /^[0-9]{10,}$/;
    return regex.test(phone);
  }

  static isRequired(value) {
    return value.length > 0 && value !== "undefined";
  }
  static isMinMax(value, min, max) {
    return value >= min && value <= max;
  }
}
