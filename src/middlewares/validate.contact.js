import validate from "../resources/contact/contact.validator.js";

export default async function validateContact({ body, method }, res, next) {
  const valid = await validate(body, method);
  if (!valid.isValid) {
    return res.status(422).json({ errors: valid.errors });
  }
  next();
}
