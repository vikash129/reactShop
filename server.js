const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('express').Router()

const userRouter = require('./routes/users.router')
const paymentRouter = require('./routes/payment.router')
const productRouter = require('./routes/product.router')


require('dotenv').config()

const app = express()

const port = process.env.PORT || 4000
const host = '0.0.0.0';

const port = process.env.port || 4000


app.use(cors())

//alternative of body parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));


app.use('/user', userRouter)

app.use('/product', productRouter)

app.use('/payment', paymentRouter)

app.use(router)


app.get('*', (req, res) => {

    res.send('you are in server of reactShop world.. bhaad mein jao')
})



// if(process.env.NODE_ENV === 'production'){

//     app.use(express.static(path.join(__dirname, 'cd client/build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'cd client/build', 'index.html'))
//     })
// }


// const uri = process.env.ATLAS_URI
const uri = 'mongodb+srv://vikash129:vikash..@reactshop.8ozqt.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    err && console.log('mongo not connected error', err)
})

const connection = mongoose.connection

connection.once('open', () => {
    console.log('mongo conneted')
})

app.listen(port, host,() => {
    console.log('listening at port ', port)
})

