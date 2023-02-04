const AddressController = require('../controllers/address.controller');
const router = require('express').Router();

router.get('/User/:userId', AddressController.getAddressByUserId);
router.get('/id/:addressId', AddressController.getAddress);

router.post('/', AddressController.createAddress);
router.put('/id/:addressId', AddressController.updateAddress);
router.delete('/id/:addressId', AddressController.deleteAddress);

module.exports = router;
