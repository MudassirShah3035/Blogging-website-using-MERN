const express = require("express")
const upload = require("../middleware/multer")
const authMiddleware = require("../middleware/authMiddleware")
const { createPost, editPost, deletePost, getAllPost, getPost, searchPosts } = require("../controllers/postController")

const postRoute = express.Router()

postRoute.post("/create", authMiddleware, upload.single("coverImage"), createPost)
postRoute.put("/update/:id", authMiddleware, upload.single("coverImage"), editPost)
postRoute.delete("/delete/:id", authMiddleware, deletePost)
postRoute.get("/", getAllPost)
postRoute.get("/search", searchPosts);
postRoute.get("/:id", getPost)


module.exports = postRoute