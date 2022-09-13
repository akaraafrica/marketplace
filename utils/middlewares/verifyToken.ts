import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../../types/user.interface";

interface JwtPayload {
  address: string;
}

interface Handler {
  (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    auth?: string
  ): Promise<void>;
  (req: NextApiRequest, res: NextApiResponse<any>): Promise<void>;
  (req: NextApiRequest, res: NextApiResponse<any>): Promise<void>;
  (
    arg0: NextApiRequest,
    arg1: NextApiResponse<any>,
    arg2: string | undefined
  ): any;
}

const verifyToken = (handler: Handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      console.log("verify token");

      console.log(req.headers.authorization);

      const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      const decodeToken = jwt.verify(
        token as string,
        process.env.JWT_KEY as Secret
      ) as JwtPayload;
      const address = decodeToken.address;
      const auth = address;
      // compare userId from request body to decoded userId

      return handler(req, res, auth);
    } catch (error) {
      return res.status(401).json(error);
    }
  };
};

export default verifyToken;
