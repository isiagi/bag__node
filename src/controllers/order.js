import Order from '../models/Order'

const orderController = {
    getAll: async (req, res) => {
        try {
            const orders = await Order.find()
            if (orders.length === 0) {
                return res.status(400).json({message: "No Orders found"})
            }
            return res.status(200).json({data: orders})
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    },

    getById: async (req, res) => {
        const id = req.params.id
        try {
            const order = await Order.findById(id).populate('productId')
            if(!order) {
                return res.status(404).json({message: 'No Order with that ID'})
            }
            res.status(200).json({data: order})
        } catch (error) {
           return res.status(400).json({message: error.message})
        }
    },

    postOrder: async (req, res) => {
        try {
            const newOrder = await new Order({
                productId: req.body.productId,
                quantity: req.body.quantity,
            })
            const orderMade = await newOrder.save()
            return res.status(200).json({data: orderMade})
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }
}

export default orderController