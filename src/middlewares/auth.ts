import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  email: string;
}

interface CustomRequest extends Request {
  userId?: string;
  email?: string;
}

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({ error: "Authentication token is not provided" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      token,
      config.jwt.secret,
    ) as CustomJwtPayload;
    const { userId: userIdToken, email: emailToken } = decodedToken;
    const { userId: userIdBody, email: emailBody } = req.body;

    if (
      (userIdBody && userIdBody !== userIdToken) ||
      (emailBody && emailBody !== emailToken)
    ) {
      res.status(401).json({ error: "User id is invalid" });
      return;
    }

    req.userId = userIdToken;
    req.email = emailToken;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "User is not authorized to access this resource" });
    return;
  }
};

export default auth;
