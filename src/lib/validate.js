//server side

export const validate = {
  isEmail: function (email) {
    var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return regex.test(email);
  },

  isValidName: function (name) {
    var regex = /^[a-zA-Z]+[a-zA-Z ]+$/;
    return regex.test(name);
  },

  isValidPhone: function (phone) {
    var regex = /^[0-9]{10,}$/;
    return regex.test(phone);
  },

  isRequired: function (value) {
    return value.length > 0 && value !== "undefined";
  },
  isMinMax: function (value, min, max) {
    return value >= min && value <= max;
  },
};
