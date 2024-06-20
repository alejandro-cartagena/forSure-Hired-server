import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SIGN_SECRET);
    req.user = verifiedUser.payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token is invalid or not Provided" });
  }
};

export default isAuth;
