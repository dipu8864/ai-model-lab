const express = require("express");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/", aiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Server Running on Port ${PORT}`);
});
