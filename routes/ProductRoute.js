const express = require("express");
const {
  getAllProduct,
  createproduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/product").get(getAllProduct);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createproduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);

// router.route("/product/:id").get(getProductDetails);

module.exports = router;
