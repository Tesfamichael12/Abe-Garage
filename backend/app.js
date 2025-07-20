const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes/index");
const rateLimit = require("express-rate-limit");

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

app.use(routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
