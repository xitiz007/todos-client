import { NextPageContext } from "next";
import Router from "next/router";

const redirect = (context: NextPageContext, path: string) => {
  if (context.req) {
    context.res?.writeHead(302, { Location: path });
    context.res?.end();
  } else {
    Router.push(path);
  }
};

export default redirect;
