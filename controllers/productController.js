const Product=require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncEroor=require("../middleware/catchAsyncErrors")
const ApiFeature =require("../utils/apifeatures")


// create product admin route
exports.createproduct=catchAsyncEroor(async(req,res,next)=>{
    req.body.user=req.user.id
    const product= await Product.create(req.body)
   
    res.status(201).json({
       success:true,
       product
    })
   
   })

//get single product

exports.getProductDetails=catchAsyncEroor(async(req,res,next)=>{
    let product= await Product.findById(req.params.id)
    if(!product)
    {
        return next(new ErrorHandler("product not found ",404))
        
    }
    res.status(200).json({
        success:true,
        product
    })

            
});

// get all product
exports.getAllProduct=catchAsyncEroor(async(req,res,next)=>{
    const resultPerPage=5;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeature(Product.find(), req.query)
    .search().filter().pagination(resultPerPage);
    

  let products = await apiFeature.query;
    res.json({
        success:true,
        products,
        productsCount
    })
    
});

//update product
exports.updateProduct=catchAsyncEroor(async(req,res,next)=>{
    let product= await Product.findById(req.params.id)
    if(!product)
    {
        return next(new ErrorHandler("product not found ",404))
        
    }

    product= await Product.findByIdAndUpdate(req.params.id ,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    

    res.status(200).json({
        success:true,
        product
    })
});

//delete product
exports.deleteProduct=catchAsyncEroor(async(req,res,next)=>{

    let product= await Product.findById(req.params.id)
    if(!product)
    {
        return next(new ErrorHandler("product not found ",404))
        
    }
    await product.remove();

    res.status(200).json({
        success:true,
        message:"product delete"
    })

       
});