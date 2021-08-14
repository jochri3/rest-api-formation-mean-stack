let server
const request = require('supertest')
const Contact = require('../../resources/contact/contact.model')
const { mongoose } = require('../../services/mongodb')
const BASE_URL = '/api/contacts'

describe(BASE_URL, () => {
  beforeEach(async () => {
    server = await require('../../app')
  })

  afterEach(async () => {
    await Contact.deleteMany({})
    await server.close()
  })

  describe(`GET ${BASE_URL}`, () => {
    it('should return all contacts', async () => {
      await Contact.collection.insertMany([
        {
          name: 'Jules Cesar',
          email: 'jules.cesar@gmail.com',
          phone: '0817788987',
        },
        {
          name: 'Alexandre LeGrand',
          email: 'alexandre.legrabd@gmail.com',
          phone: '0817368987',
        },
      ])

      const res = await request(server).get(BASE_URL)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
      expect(
        res.body.some((contact) => contact.name === 'Jules Cesar')
      ).toBeTruthy()
      expect(
        res.body.some((contact) => contact.name === 'Alexandre LeGrand')
      ).toBeTruthy()
    })
  })

  describe(`GET ${BASE_URL}/:id`, () => {
    it('should return a contact bases on his ID', async () => {
      const contact = await new Contact({
        name: 'Alexandre LeGrand',
        email: 'alexandre.legrabd@gmail.com',
        phone: '0817368987',
      }).save()

      const res = await request(server).get(`${BASE_URL}/${contact._id}`)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name', 'Alexandre LeGrand')
    })

    it('should return a 404 when contact is not found', async () => {
      const objectIt = new mongoose.Types.ObjectId()
      const res = await request(server).get(`${BASE_URL}/${objectIt}`)
      expect(res.status).toBe(404)
    })
  })

  describe(`POST ${BASE_URL} `, () => {
    const exec = async (body) => request(server).post(BASE_URL).send(body)
    it('should return 201 when contact is successfully created', async () => {
      const body = {
        name: 'Alexandre LeGrand',
        email: 'jean.paul@gmail.com',
        phone: '0817368987',
      }

      const res = await exec(body)
      expect(res.status).toBe(201)

      const contacts = await Contact.find({ phone: '0817368987' })
      expect(contacts.length).toBe(1)
      expect(contacts[0].name).toBe('Alexandre LeGrand')
      expect(contacts).not.toBeNull()
    })

    it('should return 422 when the form is not valid', async () => {
      const body = {
        name: 'Alexandre LeGrand',
      }
      const res = await exec(body)
      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('errors')
    })
  })

  describe(`PUT ${BASE_URL}/:id`, () => {
    const exec = async (id, body) =>
      request(server).put(`${BASE_URL}/${id}`).send(body)

    it("should return 404 when the user of the given id doesn't exist", async () => {
      const id = new mongoose.Types.ObjectId()
      const contact = { name: 'Jean' }
      const res = await exec(id, contact)
      expect(res.status).toBe(404)
    })

    it('should return 422 when incoming data is not valid', async () => {
      const id = new mongoose.Types.ObjectId()
      await new Contact({
        name: 'Jean',
        email: 'jean@gmail.com',
        phone: '0817368987',
        _id: id,
      }).save()

      const res = await exec(id, { name: 'Jean' })
      expect(res.status).toBe(422)
    })

    it('should return 200 if update is successfull', async () => {
      const id = new mongoose.Types.ObjectId()
      await new Contact({
        name: 'Jean',
        email: 'jean@gmail.com',
        phone: '0817368987',
        _id: id,
      }).save()
      const res = await exec(id, {
        name: 'Alexandre LeGrand',
        email: 'alexandre@gmail.com',
        phone: '0817368987',
      })
      expect(res.status).toBe(200)
    })
  })

  describe(`DELETE ${BASE_URL}/:id`, () => {
    it('should return 404 when the contact is not found', async () => {
      const id = new mongoose.Types.ObjectId()
      const res = await request(server).delete(`${BASE_URL}/${id}`)
      expect(res.status).toBe(404)
    })

    it('should return 200 when the contact is successfully deleted', async () => {
      const id = new mongoose.Types.ObjectId()
      const contact = await new Contact({
        name: 'Alexandre LeGrand',
        email: 'alexandre@gmail.com',
        phone: '0817368987',
        _id: id,
      }).save()

      const res = await request(server).delete(`${BASE_URL}/${id}`)
      expect(res.status).toBe(204)
    })
  })
})
