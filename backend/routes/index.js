const express = require("express");

const router = express.Router();

const installRouter = require("./install.routes");

const employeeRouter = require("./employee.routes");

const loginRouter = require("./login.routes");

const serviceRouter = require("./service.routes");

//import customer routes
const customerRouter = require("./customer.routes");

const vehicleRouter = require("./vehicle.routes");

const orderRouter = require("./order.routes");

//import dashboard routes
const dashboardRouter = require("./dashboard.routes");

router.use(dashboardRouter);
router.use(installRouter);

router.use(loginRouter);

router.use(employeeRouter);

router.use(serviceRouter);

//use customer routes
router.use(customerRouter);

router.use(vehicleRouter);

router.use(orderRouter);

// Route not found (404) handler
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
