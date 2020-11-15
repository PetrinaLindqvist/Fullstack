import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [viewInfo, setViewInfo] = useState(false)


  const hideViewInfo = { display: viewInfo ? 'none' : '' }
  const showViewInfo = { display: viewInfo ? '' : 'none' }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleOnClick = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }

    updateBlog(blogObject.id, blogObject)
  }
  //console.log('blog', blog.username)
  return (
    <div style={blogStyle}>
      <div style={hideViewInfo}className='blog'>
        {blog.title} {blog.author}<button onClick={() => setViewInfo(true)}>view</button>
      </div>
      <div style={showViewInfo}className='detail'>
        {blog.title} {blog.author} <button onClick={() => setViewInfo(false)}>hide</button>
        <div>{blog.url}</div>
        <div id='likes'> likes {blog.likes} <button id='likeButton' onClick={() => {handleOnClick()}}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )

}

export default Blog
