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

    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
  
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

test('unique identifier named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()

})

test('add a valid blog', async () => {
  const newBlog = {
    title: 'this blog',
    author: "L.S",
    url: "www.thisBlog",
    likes: 5,
  }
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogs = await Blog.find({})
  expect(blogs).toHaveLength(initialBlogs.length + 1)

  const authors = blogs.map(aut => aut.author)
  expect(authors).toContain(newBlog.author)

})

afterAll(() => {
  mongoose.connection.close()
  
})