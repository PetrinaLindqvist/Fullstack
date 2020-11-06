const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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

test('blogs must have url and title', async () => {
  const newBlog = {
    author: "A.L"
  }
  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  const bloglist = await Blog.find({})
  expect(bloglist).toHaveLength(initialBlogs.length)
  
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

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'Hannes', passwordHash })
  await user.save()
})

test('succeeded with a new username', async () => {
  const usersStart = await User.find({})
  const usersAtStart = await usersStart.map(u => u.toJSON())

  const newUser = {
    username: 'Lisa',
    name: 'Lisa L.',
    password: 'Lissu',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersEnd = await User.find({})
  const usersAtEnd = await usersEnd.map(u => u.toJSON())
  expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

/*test('if username already is in system, creation fails with proper statuscode and message', async () => {
  const usersStart= await User.find({})
  const usersAtStart = await usersStart.map(u => u.toJSON())

  const newUser = {
    username: 'Hannes',
    name: 'Hannes Ö.',
    password: 'Hanski',
}

const result = await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
  .expect('Content-Type', /application\/json/)

expect(result.body.error).toContain('`username` to be unique')

const usersEnd = await User.find({})
const usersAtEnd = await usersEnd.map(u => u.toJSON())

expect(usersAtEnd).toHaveLength(usersAtStart.length)

})*/


afterAll(() => {
  mongoose.connection.close()
  
})