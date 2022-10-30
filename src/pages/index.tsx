import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Todos from "../components/Todos";
import AddTodo from "../components/AddTodo";

interface Props {}

const Home: NextPage<Props> = ({}) => {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Todos</title>
        <meta name="description" content="todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header session={session} />
      <main className="mt-4">
        <p className="text-center font-medium text-base md:text-lg tracking-wider">
          Hi, {session?.user?.name}
        </p>
        <p className="mt-4 flex justify-center space-x-1 font-semibold text-sm md:text-base">
          <span>{format(new Date(), "dd LLL", { locale: enUS })}</span>
          <span>.</span>
          <span>Today</span>
          <span>.</span>
          <span>{format(new Date(), "eeee", { locale: enUS })}</span>
        </p>
        <AddTodo />
        <Todos />
      </main>
    </div>
  );
};

export default Home;
