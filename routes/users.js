var express = require('express');
var router = express.Router();
const Post = require('../models/Post')
const dbloop = require('../models/Post')

function NotFound(msg){
    this.name = 'EntityNotFound';
    // Error.call(this, msg);
    // Error.captureStackTrace(this, arguments.callee);
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
      const posts = await Post.find()
      res.json(posts)
  } catch (err) {
      res.status(500).json({message: err})
  }
});

/* Post */
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
      const savedPost = await post.save()
      res.json(savedPost)
  } catch (err) {
      res.json({message: err})
  }

  // post.save()
  //     .then(data => {
  //       res.json(data)
  //     })
  //     .catch(err => {
  //       res.json({message: err})
  //     });
});

// Get Post by Id
router.get('/:postId', async (req, res) => {
    try {
        const postById = await Post.findById(req.params.postId)
        if (!postById) {
            // res.status(404).send('Entity not Found')
            res.status(404)
            throw new NotFound;
        }
        else
            res.json(postById)
    } catch (err) {
        res.json({message: err})
    }

})

// Del Post by Id
router.delete('/:postId', async (req, res) => {
    try {
        const removedPostById = await Post.remove({_id: req.params.postId})
        res.json(removedPostById)
    } catch (err) {
        res.json({message: err})
    }

})

// Update Post by Id
router.put('/:postId', async (req, res) => {
    try {
        const findById = await Post.findById(req.params.postId)

        if(findById == null) {
            res.status(404)
            throw new NotFound()
        }
        else {

            const updatedPostById = await Post.updateOne(
                {_id: req.params.postId},
                {$set: {title: req.body.title}}
            )

            const result = await Post.findById(req.params.postId)
            res.json(result)
        }
    } catch (err) {
        res.json({message: err})
    }

})

module.exports = router;
