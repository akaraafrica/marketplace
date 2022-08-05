import { GetServerSidePropsContext, PreviewData } from "next";
import { getCookies, setCookies, removeCookies } from "cookies-next";
import { ParsedUrlQuery } from "querystring";
import { UserDs } from "../../ds";

export const getUserSSR = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const cookies = getCookies(ctx);
  const address = cookies["address"];
  const user = await UserDs.fetch(address || "");

  return user;
};
