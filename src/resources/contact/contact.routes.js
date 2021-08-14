const { Router } = require('express')
const ContactController = require('./contact.controller.js')
const contactsExists = require('../../middlewares/contact.exists.js')
const validateContact = require('../../middlewares/validate.contact.js')

const contactRoutes = Router()

contactRoutes.get('/', ContactController.findAll)

contactRoutes.get('/:id', [contactsExists], ContactController.findOne)

contactRoutes.post('/', validateContact, ContactController.create)

contactRoutes.put(
  '/:id',
  [contactsExists, validateContact],
  ContactController.update
)

contactRoutes.delete('/:id', contactsExists, ContactController.destroy)

exports.contactRoutes = contactRoutes
