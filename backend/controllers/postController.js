const uploadOnCloudinary = require("../config/cloudinary.js")
const postModel = require("../models/postModel.js")

const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body
    
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content and category are required!"
      })
    }

    let coverImage = ""

    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path)
      if (!image) {
        return res.status(400).json({
          success: false,
          message: "Cover image upload failed",
        })
      }
      coverImage = image.secure_url || image
    }

    const post = await postModel.create({
      title,
      content,
      category,
      coverImage,
      author: req.user.userId
    })

    return res.status(200).json({
      success: true,
      message: "Post created successfully!",
      post
    })

  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const editPost = async (req, res)=>{
  try{
    const {id} = req.params
    const {title, content, category} = req.body

    const post = await postModel.findById(id)
    if(!post){
      return res.status(404).json({
        success : false,
        message : "Post not found!"
      })
    }

    if(post.author.toString() !== req.user.userId.toString()){
      return res.status(401).json({
        success : false,
        message : "You are not able to edit the post!"
      })
    }

    post.title = title || post.title
    post.content = content || post.content
    post.category = category || post.category
    if(req.file){
      const image = await uploadOnCloudinary(req.file.path)
      if(!image){
        return res.status(401).json({
          success : false,
          message : "Image uploading failed"
        })
      }
      post.coverImage = image
    }

    const updatedPost = await post.save()

    return res.status(201).json({
      success : true,
      message : "Post update successfully",
      post : updatedPost
    })

  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

const deletePost = async(req, res)=>{
  try {
    const {id} = req.params
    const post = await postModel.findById(id)
    if(!post){
      return res.status(404).json({
        success : false,
        message : "Post not found!"
      })
    }

    if(post.author.toString() !== req.user.userId.toString()){
      return res.status(401).json({
        success : false,
        message : "You are not able to delete the Post"
      })
    }

    await postModel.findByIdAndDelete(id)
    return res.status(204).json({
      success : true,
      message : "Post delete successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}


const getPost = async (req, res) => {
  try {
    console.log("GET POST API CALLED");

    const { id } = req.params;

    console.log("POST ID:", id);

    const post = await postModel.findById(id);

    console.log("POST FROM DATABASE:", post);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });

  } catch (error) {
    console.error("GET POST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllPost = async(req, res) =>{
  try {
    const allPost = await postModel.find()
    if(allPost.length === 0){
      return res.status(404).json({
        success : false,
        message : "No post available!"
      })
    }

    return res.status(200).json({
      success : true,
      post : allPost
    })
    
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}


const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const search = q.trim();

    const posts = await postModel
      .find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } }
        ]
      })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {createPost, editPost, deletePost, getPost, getAllPost, searchPosts}