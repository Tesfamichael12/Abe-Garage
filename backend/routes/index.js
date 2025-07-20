const express = require("express");
const router = express.Router();

router.use(require("./install.routes"));
router.use(require("./employee.routes"));
router.use(require("./login.routes"));
router.use(require("./service.routes"));
router.use(require("./customer.routes"));
router.use(require("./vehicle.routes"));
router.use(require("./order.routes"));
router.use(require("./dashboard.routes"));

// Route not found (404) handler
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
