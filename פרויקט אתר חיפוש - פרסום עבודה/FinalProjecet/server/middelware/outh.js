
import jwt  from "jsonwebtoken";
import '../Routs/worker.js';

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//בדיקת מפתח זיהוי

const verifyToken = (req, res, next) => {

    console.log("verifyToken");
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
console.log(token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "PickAJob");
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export default  verifyToken;