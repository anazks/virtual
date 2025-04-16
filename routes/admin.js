const express = require('express');
const router = express.Router();
const { checkAdmin } = require("../middlewares/checkAdmin")
const { checkAdminExist } = require("../middlewares/checkAdminExist")
const {
  getMainHomePage,
  getLoginPage,
  doLogin,
  logout,
  getHomePage,
  getAllSellers,
  getAllUsers,
  blockSeller,
  deleteProduct,
  getAllConsultants,
  getAllApprovedProducts,
  getAllMedBlogs,
  rejectProduct,
  approveProduct,
  approveMedBlog,
  rejectMedBlog,
  deleteMedBlog,
  blockMedConsultant,
  blockUser,
  deleteFromProduct
} = require("../controllers/admin-controller")


/* GET home page. */
router.get('/', checkAdminExist, getMainHomePage)
router.get('/login', getLoginPage)
router.post('/login', doLogin)
router.get('/logout', checkAdmin, logout)
router.get('/home', checkAdmin, getHomePage);

router.get('/sellers-list', checkAdmin, getAllSellers)
router.get('/user-list', checkAdmin, getAllUsers)
router.get('/product-list', checkAdmin, getAllApprovedProducts)
router.get('/med-blog-list', checkAdmin, getAllMedBlogs)
router.get('/consultant-list', checkAdmin, getAllConsultants)

router.get("/approve-product/:id", checkAdmin, approveProduct)
router.get("/reject-product/:id", checkAdmin, rejectProduct)
router.get('/delete-product/:id', checkAdmin, deleteProduct)
router.get("/approve-med-blog/:id", checkAdmin, approveMedBlog)
router.get("/reject-med-blog/:id", checkAdmin, rejectMedBlog)
router.get('/delete-med-blog/:id', checkAdmin, deleteMedBlog)

router.get("/block-seller/:id", checkAdmin, blockSeller)
router.get("/block-med-consultant/:id", checkAdmin, blockMedConsultant)
router.get("/block-user/:id", checkAdmin, blockUser)

router.get("/deleteProduct/:id",checkAdmin,deleteFromProduct)

module.exports = router;

