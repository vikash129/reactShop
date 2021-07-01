const mongoose = require('mongoose')


const Schema = mongoose.Schema

const productSchema = new Schema({

    _id:  Number ,
    product: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at'
}
)


module.exports = mongoose.model('Product', productSchema)

