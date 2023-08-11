require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT;
const { notFound, errorHandler } = require("./middleware/errorHandlers");

//configure cors
const cors = require("cors");
app.use(
  cors({
    origin: "https://team-eldon.vercel.app",
    credentials: true,
  })
);

//import routers
const plansRouter = require("./routes/plansRouter");
const adminRouter = require("./routes/adminRouter");
const usersRouter = require("./routes/usersRouter");
const applicationsRouter = require("./routes/applicationsRouter");
const logoutUser = require("./utils/destroyToken");

//connect to mongo db
const connectDB = require("./config/db");
connectDB();

//middlewares
app.use(express.json({ limit: "35mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//use routers
app.use("/api/plans", plansRouter);
app.use("/api/admin", adminRouter);
app.use("/api/users", usersRouter);
app.use("/api/applications", applicationsRouter);
app.post("/api/logout", logoutUser);

//error handlers
app.use(notFound);
app.use(errorHandler);

//create server
app.listen(PORT, () => console.log(`app running on port: ${PORT}`));

module.exports = app;
