const express=require('express');
const router=express.Router();
const {registerUser,loginUser,getCurrentUser}=require('../controllers/authController');
const requireAuth=require('../middleware/requireAuth');

router.post('/register',registerUser);
router.post('/login',loginUser);

router.get('/me',requireAuth,getCurrentUser);

module.exports=router;
