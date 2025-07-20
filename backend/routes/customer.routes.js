const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/api/customer",
  [authMiddleware.verifToken, authMiddleware.isAdmin],
  customerController.createCustomer
);
router.get(
  "/api/customer",
  [authMiddleware.verifToken, authMiddleware.isAdmin],
  customerController.getCustomers
);
router.get(
  "/api/customer/search",
  [authMiddleware.verifToken, authMiddleware.isAdmin],
  customerController.searchCustomers
);
router.get(
  "/api/customer/:id",
  [authMiddleware.verifToken, authMiddleware.isAdmin],
  customerController.getCustomer
);
router.put(
  "/api/customer",
  [authMiddleware.verifToken, authMiddleware.isAdmin],
  customerController.updateCustomer
);
router.delete(
  "/api/customer/:id",
  [authMiddleware.verifToken, authMiddleware.isAdmin],
  customerController.deleteCustomer
);

module.exports = router;
