// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());

// mongoose.connect(
//   "mongodb+srv://nitinsharma4424:nitinsharma4424@nodecurd.vs5dwtf.mongodb.net/Vishal",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log("DB connected");
//   }
// );

// const userSchema = new mongoose.Schema({
//   fname: String,
//   lname: String,
//   email: String,
//   password: String,
// });

// const User = new mongoose.model("User", userSchema);

// const sessionSchema = new mongoose.Schema({
//   userId: {
//     type: DataTypes.UUID,
//     allowNull: false
//   },
//   token: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   status: {
//     type: DataTypes.ENUM('active', 'deleted'),
//     allowNull: false,
//     defaultValue: 'active'
//   },
// })

// const Session = new mongoose.model("Session", sessionSchema)

//Routes
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
  //check email
//   User.findOne({ email: email }, (err, user) => {
//     if (user) {
//       //check password
//       if (password === user.password) {
//         res.send({ message: "Login successfully", user: user });
//       } else {
//         res.send({ message: "Password and confirm password didn't match" });
//       }
//     } else {
//       res.send({ message: "Please login to proceed" });
//     }
//   });
// });

// app.post("/signup", (req, res) => {
//   const { userName, email, password } = req.body;
//   if (!userName || !email || !password) {
//     res.status(400);
//     throw new Error("All fields are mandatory");
//   }
//   const isUserExist =  User.findOne({
//     where: {
//       email: email,
//     },
//   });

//   if (isUserExist) {
//     res.status(400);
//     throw new Error("Oops User Already exist with this email");
//   }

//   const hashedPassword = bcrypt.hash(password, 10);
//   let user =  User.create({
//     username: userName,
//     email: email,
//     password: hashedPassword,
//   });

//   if (user) {
//     return res.data(userMapper.newModel(user));
//     // return res.data(user)
//   } else {
//     return res.status(400).json({
//       message: "invalid user data",
//     });
//   }

  // res.send("register");
  //   console.log(req.body);
// });

// app.listen(8000, () => {
//   console.log("Server starting at 8000");
// });
