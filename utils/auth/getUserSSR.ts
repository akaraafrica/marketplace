import { GetServerSidePropsContext, PreviewData } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";
import { UserDs } from "../../ds";

export const getUserSSR = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const cookies = parseCookies(ctx);
  const address = cookies["address"];
  const user = await UserDs.fetch(address);

  return user;
};
