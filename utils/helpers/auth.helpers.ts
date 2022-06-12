import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secretKey = process.env.JWT_KEY || "";

export default class AuthServices {
  static async generateJwt(payload: {}, secret = secretKey) {
    const token = await jwt.sign({ payload }, secret, { expiresIn: "1d" });
    return token;
  }

  static async hashPassword(password: string) {
    const hashPass = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hashPass;
  }

  static async passwordCompare(hashPassword: string, password: string) {
    const compareHash = await bcrypt.compareSync(password, hashPassword);
    return compareHash;
  }

  static async verifyToken(token: string) {
    const vToken = await jwt.verify(token, secretKey);
    return vToken;
  }
}
