require("dotenv").config();

const express = require("express");
const aiRoutes = require("./routes/aiRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/", aiRoutes);

// 404 + centralized error handling (must be registered last)
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Server Running on Port ${PORT}`);
});
