const dummy = (blogs) => {
    
    return 1
  }
  const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

  const favoriteOfBlogs = (blogs) => {
    let favorite = blogs[0]
    blogs.forEach((blog) => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }

    })
        delete favorite._id
        delete favorite._v
        return favorite
        
    }
    

  
  module.exports = {
    dummy, totalLikes, favoriteOfBlogs,
  }