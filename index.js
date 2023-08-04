require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//express initialization
const app = express();

//middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
//app.use(fileUpload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: true }));

//route imports
const tripRoutes = require("./routes/tripRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const quickEnquiryRoutes = require("./routes/quickEnquiryRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const continentRoutes = require("./routes/continentRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const searchRoutes = require("./routes/searchRoutes");
const teamMemberRoutes = require("./routes/teamMemberRoutes");
const slideRoutes = require("./routes/slideRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

//cors
app.use(cors());
//routes

app.use("/api/trip", tripRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/quick-enquiry", quickEnquiryRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use("/api/continent", continentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/team-member", teamMemberRoutes);
app.use("/api/slider", slideRoutes);
app.use("/api/gallery", galleryRoutes);

app.all("*", (req, res) => {
  res.status(400).send("invalid request, route doesn't exist");
});

//connect mongoose and listen on a port
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to db & listening on port",
        process.env.PORT || 3000
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
