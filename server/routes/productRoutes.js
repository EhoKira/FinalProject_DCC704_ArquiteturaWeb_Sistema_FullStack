const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Público
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  productController.createProduct
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  productController.updateProduct
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  productController.deleteProduct
);

module.exports = router;