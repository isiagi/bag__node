import Product from '../models/Product';

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await Product.find();
      if (products.length === 0) {
        return res.status(400).json({ message: 'No Products Available' });
      }
      return res.status(200).json({ data: products });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ message: 'No Products Available' });
      }
      return res.status(200).json({ data: product });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  postProduct: async (req, res) => {
    const add = new Product({
      productName: req.body.name,
      productDescription: req.body.descr,
      price: req.body.price,
      quantity: req.body.quantity,
      productImage: req.file.path,
    });
    try {
      const added = await add.save();
      res.status(201).send(added);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      const deleteProduct = await Product.findByIdAndRemove(productId);
      if (!deleteProduct) {
        return res.status(400).json({ message: 'No Products Available' });
      }
      return res.status(200).json({ data: deleteProduct });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

export default productController;
