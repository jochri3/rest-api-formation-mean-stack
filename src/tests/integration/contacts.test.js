let server
import supertest from 'supertest'
import Contact from '../../resources/contact/contact.model'

describe('/api/contacts', () => {
  beforeEach(() => {
    server = require('../../app')
  })

  afterEach(async () => {
    await Contact.deleteMany({})
    await server.close()
  })

  describe('GET /', () => {
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

      const res = await request(server).get('/api/contacts')
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
})
