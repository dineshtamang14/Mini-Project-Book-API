const express = require("express");
const app = express();
// const path = require("path");

// Database
const mongoose = require("mongoose");

// Middleware utilities
const morgan = require("morgan");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const expressValidator = require("express-validator");
const cors = require("cors");

// Config Variables
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");


const url = "mongodb+srv://dinesh:dinesh1997@cluster0.cuuqa.mongodb.net/BookDB-api?retryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected..."));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(expressValidator());
app.use(cors());


app.get("/", (req, res)=> {
  res.status(200).json({ 
      msg: "api is working"
  })
});

// Routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);


app.use((req, res)=> {
  res.status(404).json({
      msg: "404 NOT FOUND"
  })
});

// Serve Static Assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// Listening to the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
