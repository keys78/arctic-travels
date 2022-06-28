const express = require('express');
const { getUser, deleteUser, getAllVerifiedUsers, getAllUnverifiedUsers, activate2FA, deactivate2FA } = require('../controllers/private');
const router = express.Router();



router.route('/user').get(getUser);

router.route('/all-verified-users').get(getAllVerifiedUsers);
router.route('/all-unverified-users').get(getAllUnverifiedUsers);
router.route('/admin/delete-user/:id').delete(deleteUser);

router.route("/activate2FA/:id").post(activate2FA)
router.route("/deactivate2FA/:id").post(deactivate2FA)



module.exports = router