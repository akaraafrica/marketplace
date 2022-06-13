import { Prisma } from "@prisma/client";

export function ParsePrismaError(
  e: Prisma.PrismaClientKnownRequestError
): string {
  let errMsg = "";
  switch (e.code) {
    case "P1000":
      errMsg =
        e.message ||
        "DB ERR: Authentication failed against database server. The provided database credentials are not valid";
      break;
    case "P2000":
      errMsg =
        e.message ||
        "DB ERR: The provided value for the column is too long for the column's type.";
      break;
    case "P2001":
      errMsg =
        e.message ||
        "DB ERR: The record searched for in the where condition does not exist.";
      break;
    case "P2007":
      errMsg = e.message || "DB ERR: Data validation error";
      break;
    case "P2008":
      errMsg = e.message || "DB ERR: Failed to parse the query";
      break;
    case "P2011":
      errMsg = e.message || "DB ERR: Null constraint violation on the";
      break;
    case "P2012":
      errMsg = e.message || "DB ERR: Missing a required value";
      break;
    case "P2014":
      errMsg =
        e.message ||
        "DB ERR: The change you are trying to make would violate the required relation";
      break;
    case "P2002":
      errMsg = e.message || "There is a unique constraint violation";
      break;

    default:
      errMsg = e.message;
      break;
  }
  return errMsg;
}
