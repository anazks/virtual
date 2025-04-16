var express = require('express');
// const app = require('../app');
var 
router = express.Router();
var con = require('../config/config');
var nodemailer = require('nodemailer');

const {
  getUserHomePage,
  getUserLoginPage,
  getUserSignupPage,
  doLogin,
  doSignup,
  logout,
  getAllProducts,
  getAllMedBlogs,
  addToCart,
  getCartProducts,
  removeCartProduct,
  goToPayment,
  getMyOrders,
  confirmPayment,
  addLike,
  searchProduct,
  getFestivalItems,
  getOneProduct,
  getSizeDress,
  relatedView
} = require("../controllers/user-controller")

const { checkUser } = require("../middlewares/checkUser");




/* GET users listing. */
router.get("/", (req, res) => { res.redirect("/users/home") })

router.get('/home', checkUser, getUserHomePage);
router.get('/signup', getUserSignupPage)
router.post('/signup', doSignup)
router.post('/login', doLogin)
router.get('/login', getUserLoginPage)
router.get('/logout', logout)

router.get('/all-products', checkUser, getAllProducts)
router.get('/all-med-blogs', checkUser, getAllMedBlogs)

router.get("/addtoCart/:id", checkUser, addToCart);
router.get("/cart", checkUser, getCartProducts)
router.get("/remove-product/:id", checkUser, removeCartProduct)
router.get('/buynow/:id/:qty', checkUser, goToPayment)
router.get("/myorders", checkUser, getMyOrders)
router.post('/payment', checkUser, confirmPayment)

router.get('/getVestivalItems/:festival',checkUser,getFestivalItems)
router.get('/like/:id', checkUser, addLike)

router.get('/product/:id', checkUser, getOneProduct)
router.post('/search', checkUser, searchProduct)
router.get('/getSizeDress/:size', checkUser, getSizeDress)
router.get('/Customize',checkUser, (req, res) => {
  let user = req.session.user
  res.render('user/customize',{user})
})
router.get('/relatedView/:id',checkUser,relatedView)
module.exports = router;

