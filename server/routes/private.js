const express = require('express');
const { getUser, deleteUser, getAllVerifiedUsers, getAllUnverifiedUsers } = require('../controllers/private');
const router = express.Router();



router.route('/user').get(getUser);

router.route('/all-verified-users').get(getAllVerifiedUsers);
router.route('/all-unverified-users').get(getAllUnverifiedUsers);
router.route('/admin/delete-user/:id').delete(deleteUser);



module.exports = router