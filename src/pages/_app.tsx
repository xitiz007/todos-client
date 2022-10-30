import "../../styles/globals.css";
import { AppContext, AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import redirect from "../utils/redirect";
import protectedRoutes from "../config/protectedRoutes";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/apollo-client";
import TodoProvider from "../state/TodoProvider";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <TodoProvider>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <div className="max-w-7xl mx-auto p-2">
            <Toaster />
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </ApolloProvider>
    </TodoProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx } = context;
  const { pathname } = ctx;
  const session = await getSession(ctx);
  const isProtectedRoute = protectedRoutes.includes(pathname);
  if (isProtectedRoute && !session?.user) {
    redirect(ctx, "/login");
  } else if (!isProtectedRoute && session?.user) {
    redirect(ctx, "/");
  }
  return { pageProps: { session } };
};

export default MyApp;
