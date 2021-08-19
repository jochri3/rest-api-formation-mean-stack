const Contact = require('./contact.model.js')
const _ = require('lodash')

const findAll = async (_, res) => {
  try {
    const contacts = await Contact.find().select('name phone email status')
    res.json(contacts)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const findOne = async (req, res) => {
  const contact = req.contact
  res.status(200).json(contact)
}

const create = async (req, res) => {
  const io = req.app.get('socketio')
  try {
    const contact = new Contact(req.body)
    await contact.save()
    io.emit('contact:create', contact)
    res
      .status(201)
      .send(_.pick(contact, ['_id', 'name', 'phone', 'email', 'status']))
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const update = async (req, res) => {
  const io = req.app.get('socketio')
  const contact = req.contact
  try {
    _.merge(contact, req.body)
    await contact.save()
    io.emit('contact:update', contact)
    res
      .status(200)
      .send(_.pick(contact, ['_id', 'name', 'phone', 'email', 'status']))
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const destroy = async (req, res) => {
  const io = req.app.get('socketio')
  const contact = req.contact
  try {
    await contact.remove()
    io.emit('contact:destroy')
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
}
