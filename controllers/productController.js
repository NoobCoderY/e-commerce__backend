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

exports.createProductReview=catchAsyncEroor(async(req,res,next)=>{
    const{rating ,comment,productId}=req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
    const product= await Product.findById(productId);
      const isReviewed=product.reviews.find((rev)=>rev.user.toString()==req.user._id.toString())
      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        });
      } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
      }
    
      let avg = 0;
    
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
    
      product.ratings = avg / product.reviews.length;
    
      await product.save({ validateBeforeSave: false });
    
      res.status(200).json({
        success: true,
      });

    })

    // Get All Reviews of a product
exports.getProductReviews = catchAsyncEroor(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });


// Delete Review
exports.deleteReview = catchAsyncEroor(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });