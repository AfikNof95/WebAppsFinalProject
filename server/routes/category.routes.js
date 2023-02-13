const router = require('express').Router();
const CategoryController = require('../controllers/category.controller');
const { isAdmin } = require('../middlewares/auth');

router.get('/', CategoryController.getAllCategories);
router.get('/id/:categoryId', CategoryController.getCategory);
router.post('/', isAdmin,CategoryController.createCategory);
router.put('/id/:categoryId', isAdmin,CategoryController.updateCategory);
router.delete('/id/:categoryId', isAdmin ,CategoryController.deleteCategory);

module.exports = router;
