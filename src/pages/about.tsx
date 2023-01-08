import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0b3bd6] to-[#f8a221]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            About <span className="text-[hsl(280,100%,70%)]">Agent</span> App
          </h1>
          <h1 className="text-5xl font-extrabold leading-normal text-white md:text-[5rem]">
            <span className="text-2xl font-bold text-white"></span>
          </h1>

          <p className="text-2xl font-bold text-white">
            Our app allows you to generate high-quality, human-like text for a
            variety of use cases. Whether you need a summary of a long article,
            a translation of a document, or an answer to a difficult question,
            our app can help. Simply enter your text or query and let our
            app&apos;s GPT-3-powered agent do the rest. You&apos;ll be amazed at
            how accurate and natural the generated text is.
          </p>
          <p className="text-2xl font-bold text-white">
            Thank you for trying out our app. We hope you find it useful and
            convenient to use.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
