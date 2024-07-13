import express from "express";
import morgan from "morgan";
import questionRoutes from "./routes/questionRoutes.js";
import optionRoutes from "./routes/optionRoutes.js";
import ApiError from "./utils/apiError.js";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Set base URL for link_to_vote
app.use((req, res, next) => {
  process.env.BASE_URL = `${req.protocol}://${req.get("host")}${
    process.env.API_PREFIX
  }`;
  next();
});

// Apply API prefix to all routes
const apiPrefix = process.env.API_PREFIX || "/api/v1";

// Routes
app.use(`${apiPrefix}/questions`, questionRoutes);
app.use(`${apiPrefix}/options`, optionRoutes);

// 404 handler
app.all(`${apiPrefix}/*`, (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
