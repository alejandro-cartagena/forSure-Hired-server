import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const verifiedUser = jwt.verify(token, process.env.TOKEN_SIGN_SECRET);
      req.user = verifiedUser.payload;
      next();
    } else {
      res.json({ message: "Token not provided" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "You are not Logged In!" });
  }
};
export default isAuth;
