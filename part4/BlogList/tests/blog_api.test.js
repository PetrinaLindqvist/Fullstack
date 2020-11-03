const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'Java',
      author: 'N.M.',
      url: 'wwww.java',
      likes: 76,
    },
    {
      title: 'Script',
      author: 'L.S.',
      url: 'www.script',
      likes: 123,
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

test('add a blog', async () => {
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

test('if no likes, default to 0', async () => {
  const newBlog = {
    title: 'no likes',
    author: "S.S",
    url: "www.NoLikesBlog",
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  

  const blogs = await Blog.find({})
  expect(blogs[initialBlogs.length].likes).toBe(0)
})

test('succeeds if the id is valid with code 204', async () => {
  const blogs = await Blog.find({})
  const blogToDelete = blogs[0]

  await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const blog = blogsAtEnd.map(b => b.title)
    expect(blog).not.toContain(blogToDelete.title)
})

  
afterAll(() => {
  mongoose.connection.close()
  
})