require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDb = require("./connection/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

// const corsOptions = {
//   origin: ["http://localhost:5173", "https://mern-admin-dash-board-frontend.vercel.app"],
//   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//   credentials: true,
// };

// Define the whitelist of allowed origins
var whitelist = [
  "http://localhost:5173",
  "https://mern-admin-dash-board-frontend.vercel.app",
];

var corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming origin is in the whitelist
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

// handling the cors issue
app.use(cors(corsOptions));

// middleware to parse incoming body requests
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

// importing routes
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/adminRoutes");

// routes
app.use("/api/auth", userRoutes);
app.use("/api/form", contactRoutes);
app.use("/api/data", serviceRoutes);
app.use("/api/admin", adminRoutes);

// error middleware
app.use(errorMiddleware);

// Database connection
connectDb().then(() => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
