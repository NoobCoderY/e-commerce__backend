const express = require("express");
const { getAllProduct,createproduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/product").get( getAllProduct);
router.route("/product/new").post( isAuthenticatedUser, authorizeRoles("admin"),createproduct);
router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.route("/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct).get(isAuthenticatedUser, authorizeRoles("admin"), getProductDetails)
// router.route("/product/:id").get(getProductDetails);

module.exports = router;
