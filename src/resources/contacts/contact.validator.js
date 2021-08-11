import Validate from "../../lib/validator.js";
import Contact from "./contact.model.js";

export default async function validate(body, method = "POST") {
  const valid = {
    errors: {},
    isValid: true,
  };
  if (!Validate.isRequired(body.name)) {
    valid.errors.name = "Please enter your name";
  }

  //   EMAIL
  const emailIsUsed = await emailExists(body.email);
  if (!Validate.isRequired(body.email)) {
    valid.errors.email = "Please enter your email";
  } else if (!Validate.isEmail(body.email)) {
    valid.errors.email = "Please enter a valid email";
  } else if (method === "POST" && emailIsUsed) {
    valid.errors.email = "Email already exists";
  }

  //   PHONE
  const phoneIsUsed = await phoneExists(body.phone);
  if (!Validate.isRequired(body.phone)) {
    valid.errors.phone = "Please enter your phone";
  } else if (!Validate.isValidPhone(body.phone)) {
    valid.errors.phone = "Please enter a valid phone";
  } else if (method === "POST" && phoneIsUsed) {
    valid.errors.phone = "Phone already exists";
  }

  // STATUS
  if (body.status && !Validate.isValidStatus(body.status)) {
    valid.errors.status = "Please enter a valid status";
  }

  if (
    valid.errors.email ||
    valid.errors.phone ||
    valid.errors.status ||
    valid.errors.name
  ) {
    valid.isValid = false;
  } else {
    valid.isValid = true;
  }
  return valid;
}

async function emailExists(email) {
  return (await Contact.find({ email: email }, { email: 1 }).count()) > 0;
}

async function phoneExists(phone) {
  return (await Contact.find({ phone: phone }, { phone: 1 }).count()) > 0;
}
