const express=require('express');
const router=express.Router();
const requireAuth=require('../middleware/requireAuth');
const {getApplications,addApplication,updateApplication,deleteApplication}=require('../controllers/applicationController');

router.use(requireAuth);

router.get('/',getApplications);
router.post('/',addApplication);
router.patch('/:id',updateApplication);
router.delete('/:id',deleteApplication);

module.exports=router;



























