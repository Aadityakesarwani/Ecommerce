const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Encrypt the password
  const encryptedPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.PASS_SEC
  ).toString();


  const newUser = new User({
    name : req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {


    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get("/logout", async (req, res) => {
//   // Destroy the user's session
//   req.session.destroy();

//   // Remove the user's authentication tokens
//   res.clearCookie("access_token");
//   res.clearCookie("refresh_token");

//   // Redirect the user to the homepage
//   res.redirect("/");
// });



module.exports = router;
