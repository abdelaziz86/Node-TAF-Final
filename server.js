 const express = require("express");
 const dotenv = require("dotenv");
 const connectDB = require("./config/db");
 const bookRoutes = require("./routes/books");
 const methodOverride = require("method-override");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
 
 dotenv.config();
 connectDB();



 const app = express();
 app.set("view engine", "ejs");
 app.use(express.urlencoded({ extended: true }));
 app.use(express.static("public"));
 app.use(methodOverride("_method"));
 app.use((req, res, next) => {
   if (req.path === "/favicon.ico") {
     return res.status(204).end(); 
   }
   next();
 });

 app.use(cookieParser());

 app.use((req, res, next) => {
   const token = req.cookies.token;
   if (token) {
     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
     } catch (err) {
       req.user = null;
     }
   } else {
     req.user = null;
   }
   next();
 });

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

 app.use("/", bookRoutes);
 app.use("/auth", authRoutes);

 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () =>
   console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`)
 );

