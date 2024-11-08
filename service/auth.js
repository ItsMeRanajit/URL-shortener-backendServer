const jwt = require("jsonwebtoken");
const secret = "Ilikeher12@";
//secret in JWT makes sure that the token is real and hasn’t been tampered with. It acts like a password between the server and the token, allowing the server to confirm that the data in the token is genuine and hasn’t been faked by someone else
function setUser(user) {
  // sessionIdToUserMap.set(id, user);
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
  console.log("token :::", token);
  return token; // this will generate and return a token, which contains user object and the secret
}
function getUser(token) {
  // return sessionIdToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret); // verifying the token
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
