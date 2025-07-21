const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes/index");
const rateLimit = require("express-rate-limit");
const installRoutes = require("./routes/install.routes");
const customerRoutes = require("./routes/customer.routes");
const employeeRoutes = require("./routes/employee.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const orderRoutes = require("./routes/order.routes");
const serviceRoutes = require("./routes/service.routes");
const loginRoutes = require("./routes/login.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const errorHandler = require("./middlewares/errorHandler");

const allowedOrigins = [
  "http://localhost:3000",
  "https://abe-garage-one.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

app.use(installRoutes);
app.use(customerRoutes);
app.use(employeeRoutes);
app.use(vehicleRoutes);
app.use(orderRoutes);
app.use(serviceRoutes);
app.use(loginRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(dashboardRoutes);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
