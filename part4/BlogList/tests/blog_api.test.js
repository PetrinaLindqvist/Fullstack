const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      content: 'HTML is easy',
      date: new Date(),
      important: false,
    },
    {
      content: 'Browser can execute only Javascript',
      date: new Date(),
      important: true,
    },
  ]
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    //jest.setTimeout(10000)
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })
 

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

})

afterAll(() => {
  mongoose.connection.close()
  
})