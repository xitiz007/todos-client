import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface Props {
  session: Session | null;
}

const Header: React.FC<Props> = ({ session }) => {
  return (
    <header>
      <nav>
        <ul className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] relative">
              <Image
                src="/icons/todo.png"
                className=""
                alt="icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h1 className="uppercase tracking-wide font-bold text-base lg:text-lg">
              TODOS
            </h1>
          </div>
          <div
            onClick={() => signOut()}
            title="Logout"
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] relative cursor-pointer"
          >
            {session?.user && (
              <Image
                src={session.user.image as string}
                className="rounded-full hover:brightness-50 transition duration-200 ease-in-out"
                alt="icon"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
