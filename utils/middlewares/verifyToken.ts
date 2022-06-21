import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";

interface JwtPayload {
  user: string;
}

interface Handler {
  (req: NextApiRequest, res: NextApiResponse<any>, auth: any): Promise<void>;
  (req: NextApiRequest, res: NextApiResponse<any>): Promise<void>;
  (req: NextApiRequest, res: NextApiResponse<any>): Promise<void>;
  (
    arg0: NextApiRequest,
    arg1: NextApiResponse<any>,
    arg2: { user: string } | undefined
  ): any;
}

const verifyToken = (handler: Handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      const decodeToken = jwt.verify(
        token as string,
        process.env.JWT_KEY as Secret
      ) as JwtPayload;
      const user = decodeToken.user;
      const auth = { user };

      if (req.method === "DELETE") {
        return handler(req, res, auth);
      }

      // compare userId from request body to decoded userId
      if (req.body.address !== user) {
        res.status(401).json({
          error: "Invalid user Id",
        });
        return;
      } else {
        return handler(req, res);
      }
    } catch (error) {
      res.status(401).json({
        error: error,
      });
      return;
    }
  };
};

export default verifyToken;
