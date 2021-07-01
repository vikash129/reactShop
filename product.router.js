const router = require('express').Router()
const express = require('express')
const app = express()

var path = require('path')

const productModel = require('../modals/product.model')

const upload = require('../upload')


//to get the product by id
router.route('/:id').get((req, res) => {

    productModel.findById(req.params.id)

        .then(product => res.json(product))
        .catch(err => res.status(400).json('my product Error : ' + err))
})


//all products
router.route('/').get((req, res) => {

    productModel.find()

        .then(product => res.json(product))
        .catch(err => res.status(400).json(err))
})

//to delete the product
router.route('/:id').delete((req, res) => {

    productModel.findByIdAndDelete(req.params.id)

        .then(() => res.json({deletedData :req.params.id }))
        .catch(err => res.status(400).json({deleError :  err } ))
})


//to update the product
router.route('/update/:id').post( (req, res) => {

    productModel.findById(req.params.id)

        .then(product => {

            product.product = req.body.product
            product.description = req.body.description
            product.price = Number(req.body.price)
            product.postdate = new Date().getTime()
            product.type = req.body.type
            product.date = req.body.date


            product.save()
                .then((result) => res.json( {Updateproduct :  result } ))
                .catch(err => res.status(400).json( {ErrorinSave :err } ))
        })

        .catch(
            err => res.status(400).json({ErrorinUpdate :err } )
        )

})






//to add a new product
router.route('/add').post(upload.single('myImage') ,(req, res) => {


    const product = req.body.product
    const description = req.body.description
    const price = Number(req.body.price)
    const type = req.body.type
    const image =  req?.file?.filename  ?  req?.file?.filename  : 'placeholder.png'

    const _id  =  Math.floor(Math.random() * 1000)

    const date = new Date().getTime()

    const newProduct = new productModel({
        _id , 
        product,
        description,
        price,
        type,
        date ,
        image
    })



    newProduct.save()
        .then((result) => res.json( result ))
        .catch(err => res.status(400).json(err))

    // newProduct.save()
    //     .then((result) => res.json(console.log(result)))
    //     .catch(err => res.status(400).json(console.log(err)))
})


module.exports = router


