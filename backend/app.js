const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
dotenv.config();
const db = require("./src/config/dbConnection");

//import Routes
const globalErrorHandler = require("./src/middleware/globalErrorHandler");
const logs = require("./src/middleware/loggerMiddlerware");
const userRoutes = require("./src/user/router");
const aboutRoute = require("./src/about/router");
const mainSectionRoute = require("./src/mainSection/router");
const servicesRoute = require("./src/services/router");
const logoRoute = require("./src/logos/router");
const contactRoute = require("./src/contactUs/router");
const capabilitiesRoute = require("./src/capabilites/router");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(logs);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use((req, res, next) => {
  console.log(`Route called: ${req.originalUrl}`);
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/about", aboutRoute);
app.use("/api/mainSection", mainSectionRoute);
app.use("/api/services", servicesRoute);
app.use("/api/logos", logoRoute);
app.use("/api/contact", contactRoute);
app.use("/api/capabilities", capabilitiesRoute);

app.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Welcome To papaya" });
});
app.use("*", (req, res) => {
  res.status(404).send({ msg: "Route Not found" });
});

// Start the server
app.use(globalErrorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
