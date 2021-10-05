import {Schema, model} from 'mongoose'

const orderSchema = new Schema({
    productId: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    }],
    quantity: {
        type: String,
        require: true
    }
}, {timestamps: {createdAt: 'created_at'}})

const order = model('order', orderSchema)

export default order