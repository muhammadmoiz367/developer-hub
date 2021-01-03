const express=require('express');
const {check, validationResult}=require('express-validator');
const router=express.Router();

const auth=require('../../middleware/auth');
const User=require('../../models/user');
const Post=require('../../models/posts');

//create new post
router.post('/', [ auth, [
    check('text', 'Text is required').not().isEmpty()
    ] ], async (req, res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const user=await User.findById(req.user.id).select('-password');
            const newPost=new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id  
            })
            const post=await newPost.save()
            res.json(post)
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error')
        }
})

//get all posts
router.get('/', auth, async (req, res)=>{
    try {
        const posts=await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
})

//get specific post 
router.get('/:postId', auth, async (req, res)=>{
    try {
        const post=await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        }
        res.json(post)
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server error')
    }
})

//delete post
router.delete('/:postId', auth, async (req, res)=>{
  try {
    const post=await Post.findById(req.params.postId);
    if(!post){
        return res.status(404).json({msg: 'Post not found'});
    }
    if(post.user.toString() !== req.user.id){
        return res.status(401).json({msg: 'User not unauthorized'});
    }
    await post.remove();
    res.json({ msg: 'Post deleted'});
  } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server error')
  }  
})

//like post
router.put('/like/:postId', auth, async (req, res)=>{
    try {
        const post=await Post.findById(req.params.postId);
        //check if post has been already liked
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length>0){
            return res.status(400).json({msg: 'Post has already been liked'});
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
})

//unlike post
router.put('/unlike/:postId', auth, async (req, res)=>{
    try {
        const post=await Post.findById(req.params.postId);
        //check if post has been liked
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: 'Post has not yet been liked'});
        }
        //get remove index
        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
})

//add comment on specific post
router.post('/comment/:postId', [ auth, [
    check('text', 'Text is required').not().isEmpty()
    ] ], async (req, res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const user=await User.findById(req.user.id).select('-password');
            const post=await Post.findById(req.params.postId);

            const newComment={
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id  
            }
            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error')
        }
})

//delete comment on specific post
router.delete('/comment/:postId/:commentId', auth, async (req, res)=>{
    try {
        const post=await Post.findById(req.params.postId);
        const comment=post.comments.find(comment=>comment.id === req.params.commentId);
        if(!comment){
            return res.status(404).json({ msg: 'Comment does not exist' })
        }
        if(comment.user.toString() !== req.user.id ){
            return res.status(401).json({ msg: 'User not authorized' })
        }
        
        //get remove index
        const removeIndex=post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post.comments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
})

module.exports=router