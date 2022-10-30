import type { NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface Props {}

const Login: NextPage<Props> = ({}) => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Login|Todos</title>
      </Head>
      <div className="flex flex-col items-center">
        <h1 className="uppercase tracking-widest font-semibold text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          todos
        </h1>
        <div className="w-[150px] h-[250px] md:w-[200px] md:h-[300px] relative">
          <Image
            src="/icons/todo.png"
            className=""
            alt="icon"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <button onClick={() => signIn("google")} className="flex items-center space-x-2 bg-gray-100 rounded-sm px-4 py-2 hover:bg-gray-200 transition-colors duration-200 ease-in-out">
          <div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] relative">
            <Image
              src="/icons/google.png"
              className=""
              alt="icon"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className="text-gray-800 font-semibold text-base">Login with Google</span>
        </button>
      </div>
    </main>
  );
};

export default Login;
