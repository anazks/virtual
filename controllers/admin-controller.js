const AdminModel = require("../models/admin-model");
const SellerModel = require('../models/seller-model');
const ProductModel = require('../models/product-model');
const ConsultantModel = require("../models/consultant-model");
const medBlogModel = require("../models/medicinal-blog-model");
const UserModel = require("../models/user-model");
const newsModel = require('../models/news-model')

const bcrypt = require("bcrypt");
const productModel = require("../models/product-model");
const orderModel = require("../models/order-model");


const getMainHomePage = async (req, res) => {
    try {
        let news = await newsModel.find({});
        console.log(news,"news")
        if (news.length > 1) {
            // Shift the array to change the position
            const shiftedNews = news.slice(1).concat(news.slice(0, 1));
            let sending_news = news[news.length-1];
            res.render('admin/homeIndex', { sending_news });
        } else if (news) {
            let sending_news = news[news.length-1];
            res.render('admin/homeIndex', { sending_news });
        } else {
            // Handle the case when there are no news items
            res.render('admin/homeIndex', { sending_news: null });
        }
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const getLoginPage = async (req, res) => {
    if (req.session.alertMessage) {
        let { alertMessage } = req.session;
        res.render("admin/adminlogin", { alertMessage })
        delete req.session.alertMessage
    } else {
        res.render("admin/adminlogin")
    }
}
const doLogin = async (req, res) => {
    try {
        // console.log(req.body, req.body.password);
        let { password, userId } = req.body;
        let admin = true;
        if(password == "admin" && userId == 1234){
            req.session.admin = admin;
            return res.redirect("/home")
        }else{
            req.session.alertMessage = "Invalid admin Credentials";
            res.redirect("/login");
        }
        // const admin = await AdminModel.findOne({ userId });
        // if (admin) {
        //     const exist = await bcrypt.compare(password, admin.password);
        //     if (exist) {
        //         req.session.admin = admin;
        //         return res.redirect("/home")
        //     }
        // }
        
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/login")
    }
}
const logout = (req, res) => {
    req.session.admin = false;
    res.redirect('/')
}
const getHomePage = async function (req, res, next) {
    //fetch all products from products model
    try {
        let { admin } = req.session;
        let products = await ProductModel.find({});
        let medBlogs = await medBlogModel.find({ });
        res.render('admin/index', { products, admin, medBlogs });
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/login")
    }
}
const getAllSellers = async (req, res) => {
    try {
        let { admin } = req.session;
        let sellers = await SellerModel.find({ status: "approved" });
        res.render("admin/sellers", { admin, sellers })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const getAllConsultants = async (req, res) => {
    try {
        let { admin } = req.session;
        let consultants = await ConsultantModel.find({ status: "approved" });
        res.render("admin/consultants", { admin, consultants })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const getAllUsers = async (req, res) => {
    try {
        let { admin } = req.session;
        let users = await UserModel.find({ status: "approved" });
        res.render("admin/users", { admin, users })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const getAllApprovedProducts = async (req, res) => {
    try {
        let { admin } = req.session;
        let products = await ProductModel.find({ status: 'approved' });
        res.render("admin/products", { admin, products })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const approveProduct = async (req, res) => {
    let { id } = req.params;
    console.log(id)
    try {
        let product = await ProductModel.findOneAndUpdate({ _id: id }, { $set: { status: "approved" } });
        console.log(product)
        res.redirect("/product-list")
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const rejectProduct = async (req, res) => {
    let { id } = req.params;
    try {
        await ProductModel.findOneAndUpdate({ _id: id }, { $set: { status: "rejected" } })
        res.redirect("/home")
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const deleteProduct = async (req, res) => {
    let { id } = req.params;
    try {
        await ProductModel.findOneAndUpdate({ _id: id }, { $set: { status: "removed by admin" } })
        res.redirect("/product-list")
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const getAllMedBlogs = async (req, res) => {
    try {
        let { admin } = req.session;
        let medBlogs = await medBlogModel.find({});
        res.render("admin/medBlogs", { admin, medBlogs })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const approveMedBlog = async (req, res) => {
    let { id } = req.params;
    console.log(id)
    try {
        let product = await medBlogModel.findOneAndUpdate({ _id: id }, { $set: { status: "approved" } });
        console.log(product)
        res.redirect("/med-blog-list")
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const rejectMedBlog = async (req, res) => {
    let { id } = req.params;
    try {
        await medBlogModel.findOneAndUpdate({ _id: id }, { $set: { status: "rejected" } })
        res.redirect("/home")
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const deleteMedBlog = async (req, res) => {
    let { id } = req.params;
    try {
        await medBlogModel.findOneAndUpdate({ _id: id }, { $set: { status: "removed by admin" } })
        res.redirect("/med-blog-list")
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}

const blockUser = async (req, res) => {
    let { id } = req.params;
    try {
        await UserModel.findOneAndUpdate({ _id: id }, { $set: { status: "blocked" } })
        res.redirect("/user-list")
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const blockMedConsultant = async (req, res) => {
    let { id } = req.params;
    try {
        await ConsultantModel.findOneAndUpdate({ _id: id }, { $set: { status: "blocked" } })
        res.redirect("/consultant-list")
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const blockSeller = async (req, res) => {
    let { id } = req.params;
    try {
        await SellerModel.findOneAndUpdate({ _id: id }, { $set: { status: "blocked" } })
        res.redirect("/sellers-list")
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/home")
    }
}
const deleteFromProduct= async(req,res)=>{
    let id = req.params.id;
    try {
        console.log(id,"id")
        await ProductModel.findOneAndDelete({_id:id})
        res.redirect("/home")
    } catch (error) {
        console.log(error)
        res.redirect("/home")
        
    }
}
const reports = async(req,res)=>{
    try {
       let orders = await orderModel.find({})
       let { admin } = req.session;

       console.log(orders)
       res.render('admin/Report',{orders,admin})
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
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
    deleteFromProduct,
    reports
}