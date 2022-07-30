const express = require('express');
const { getUser, deleteUser, getAllVerifiedUsers, getAllUnverifiedUsers, activate2FA, deactivate2FA } = require('../controllers/private');
const { protect, isAdmin } = require('../middlewares/authProtect');
const router = express.Router();



router.route('/user').get(protect, getUser);
router.route("/activate2FA/:id").post(protect, activate2FA)
router.route("/deactivate2FA/:id").post(protect, deactivate2FA)

router.route('/admin/all-verified-users').get(protect, isAdmin, getAllVerifiedUsers);
router.route('/admin/all-unverified-users').get(protect, isAdmin, getAllUnverifiedUsers);
router.route('/admin/delete-user/:id').delete(protect, isAdmin, deleteUser);



 

module.exports = router