const router = require('express').Router();
const CategoryController = require('../controllers/category.controller');

router.get('/', CategoryController.getAllCategories);
router.get('/id/:categoryId', CategoryController.getCategory);
router.post('/', CategoryController.createCategory);
router.put('/id/:categoryId', CategoryController.updateCategory);
router.delete('/id/:categoryId', CategoryController.deleteCategory);

module.exports = router;
