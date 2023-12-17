const returnController = require('../controllers/returnController');
const router = require('express').Router();

router.route('/newReturn').post(returnController.createNewReturn);


module.exports = router;