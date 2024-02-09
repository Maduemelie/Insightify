const ProductController = require('../controllers/productController');
const router = require('express').Router();

router.route("/newProduct").post(ProductController.createNewProduct);

module.exports = router;