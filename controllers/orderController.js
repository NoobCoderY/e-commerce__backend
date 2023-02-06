const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create new order
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

 const order=await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id,
 })

 res.status(201).json({
    success:true,
    order
 })
})

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id);
    const order = await Order.findById(req.params.id)
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      order,
    });
  });
  
  // get logged in user  Orders
  exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });// jha jha user id same hai jo req.id se mili sare order de do
    res.status(200).json({
      success: true,
      orders,
    });
  });

  // get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });