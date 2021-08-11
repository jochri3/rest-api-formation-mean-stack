import Validate from "../../lib/validator";
import Contact from "../resources/contacts/contact.model";

export default function validateContact(body) {
  const errors = {};
  if (!Validate.isRequired(body.name)) {
    errors.name = "Please enter your name";
  }

  //   EMAIL
  if (!Validate.isRequired(body.email)) {
    errors.email = "Please enter your email";
  }
  if (!Validate.isEmail(body.email)) {
    errors.email = "Please enter a valid email";
  }

  if (emailExists(body.email)) {
    errors.email = "Email already exists";
  }

  //   PHONE
  if (!Validate.isRequired(body.phone)) {
    errors.phone = "Please enter your phone";
  }
  if (!Validate.isValidPhone(body.phone)) {
    errors.phone = "Please enter a valid phone";
  }

  if (phoneExists(body.phone)) {
    errors.phone = "Phone already exists";
  }

  // STATUS
  if (!Validate.isRequired(body.status)) {
    errors.status = "Please enter your status";
  }
  if (!Validate.isValidStatus(body.status)) {
    errors.status = "Please enter a valid status";
  }
  return errors;
}

function emailExists(email) {
  return Contact.find({ email: email }, { email: 1 }).count() > 0;
}

function phoneExists(phone) {
  return Contact.find({ phone: phone }, { phone: 1 }).count() > 0;
}
