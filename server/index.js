require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDb = require("./connection/db");
const errorMiddleware = require("./middlewares/error-middleware");

// middleware to parse incoming body requests
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

// importing routes
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");

// routes
app.use("/api/auth", userRoutes);
app.use("/api/form", contactRoutes);

// error middleware
app.use(errorMiddleware);

// Database connection
connectDb().then(() => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
