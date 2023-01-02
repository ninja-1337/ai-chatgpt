import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { Checkbox, Spacer } from "@nextui-org/react";
import { useState, useEffect } from "react";
const Home: NextPage = () => {
  const hello = trpc.auth.getUserDiscoverable.useQuery();
  const [discoverable, setDiscoverable] = useState(hello.data?.discoverable);
  const messageMe = trpc.auth.updateDiscoverable.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
    },
  });
  useEffect(() => {
    setDiscoverable(hello.data?.discoverable);
  }, [hello.data?.discoverable]);
  useEffect(() => {
    if (discoverable != null) {
      messageMe.mutate(discoverable);
    }
  }, [discoverable]);

  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="About" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-fit flex-col items-center justify-center p-2">
        <>
          <h1 className="text-3xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            <span className="text-black-300">My Settings</span>
          </h1>
          <Checkbox
            color="gradient"
            isSelected={discoverable}
            onChange={setDiscoverable}
            defaultSelected={discoverable}
          >
            Discoverable by others
          </Checkbox>
        </>
      </main>
    </>
  );
};

export default Home;
