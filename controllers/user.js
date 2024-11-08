const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");

const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username / Password",
    });

  // const sessionId = uuidv4();
  const token = setUser(user);
  console.log(token);
  res.cookie("uid", token, {
    // domain: "www.google.com", // cookie for the mentioned domain only accissivle from that domain. no domain can access other domains cookiea
  }); //sending the token in the cookie
  return res.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
