const jwt = require("jsonwebtoken");

export const decodedToken = (token) => {
  
  const _token = token.split("|")[1];
  try {
    var decoded = jwt.verify(_token, "valaSecret", {
      algorithms: ["HS256"],
    });
    localStorage.setItem("User", JSON.stringify(decoded.user));
    // check user
  } catch (err) {
    // return res.status(401).send({ message: "Invalid Token" });
    console.log(err)
  }
};
