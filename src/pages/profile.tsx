import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Image from "next/image";

import { format } from "date-fns";
import { Navbar, Text, Avatar, Dropdown } from "@nextui-org/react";
const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const { data: session, status } = useSession();
  const userMessages = trpc.auth.getUserMessages.useQuery();
  const discoverable = trpc.auth.getUserDiscoverable.useQuery();
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="About" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-fit flex-col items-center justify-center p-2">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          {" "}
        </h1>
        <>
          {session?.user?.image && (
            <>
              <div className="flex-container flex items-center justify-center">
                <Avatar
                  bordered
                  size="xl"
                  as="button"
                  color="secondary"
                  src={session?.user.image}
                />
                <span className="md:text-[5rem]text-orange-300 text-5xl font-extrabold leading-normal text-orange-400">
                  Profile
                </span>
              </div>

              <>
                {discoverable.data?.discoverable && (
                  <p className="text-xl text-blue-300">
                    You are Discoverable by other Users
                  </p>
                )}
                {!discoverable.data?.discoverable && (
                  <>
                    <p className="text-xl text-blue-300">
                      ⚠You are not discoverable by other Users⚠
                    </p>

                    <p className="text-xl text-blue-300">
                      You can Change this by navigating to your Settings page
                    </p>
                  </>
                )}
              </>
              {/* <div
                  style={{
                    "--color-1": "orange",
                    "--color-2": "navy",
                    background: `
      linear-gradient(
        170deg,
        var(--color-1),
        var(--color-2) 80%
      )
    `,

                    // Unrelated styles:
                    color: "white",
                    textAlign: "center",
                    padding: 30,
                    borderRadius: 12,
                  }}
                >
                  Hello World
                </div> */}

              <div className="flex-container flex items-center justify-center">
                <p className="text-black-300 text-base text-3xl font-bold leading-normal ">
                  Messages to me
                </p>
              </div>
              {userMessages.data?.map((post) => {
                return (
                  <>
                    <div className="p-2 text-center align-middle ">
                      <p className="text-base text-gray-400 dark:text-gray-600"></p>
                      <p className="text-center">{post.body}</p>
                      <div className="inline-block align-middle text-xs text-gray-500">
                        <>
                          <Image
                            src={"" + post.sent_by.image}
                            alt="Picture of the author"
                            width={20}
                            height={20}
                            style={{ borderRadius: 50, display: "inline" }}
                          />{" "}
                          {post.sent_by.name} {" / "}
                          {format(
                            new Date(post.created_at + " "),
                            "d MMM yyyy 'at' h:mm bb"
                          )}
                        </>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
          {/* {!session?.user?.image && <Dropdown.Button>Login</Dropdown.Button>} */}
        </>

        <p className="text-2xl text-gray-700"></p>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage2.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {secretMessage && (
        <>
          <Link className="text-2xl text-blue-900" href="/stripe">
            Become a Paid Member
          </Link>
        </>
      )}
    </div>
  );
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <Link
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </Link>
    </section>
  );
};
