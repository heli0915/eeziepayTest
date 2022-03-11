import express from 'express'
const router = express.Router()

router
    .route('/:id')
    .get((req, res) => {
        const post_error = req.flash('post_error')
        res.send('hi' + req.params.id)
        res.render('get page', { message: {}, post_error })
    })
    .put()
    .post((req, res) => {
        let img, uploadPath, newImg
        if (!req.files || Object.keys(req.files).length === 0) {
            req.flash('need choose img')
        } else {
            img = req.files.image
            newImg = Date.now() + img.name
            uploadPath = require('path').resolve('./') + '/public/uploads' + newImg
            img.mv(uploadPath, function(err) {

            })
        }
        req.flash('post_error', 'test error')
    })
    .delete()

router.param('id', (req, res, next) => {
    next()
})

export default router