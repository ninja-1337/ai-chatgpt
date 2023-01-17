import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Image from "next/image";
import { format } from "date-fns";
import { SocialIcon } from "react-social-icons";
const Home: NextPage = () => {
  const userMessages = trpc.auth.getUserMessages.useQuery();

  const { data: session, status } = useSession();
  const messageMe = trpc.auth.messageMe.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
    },
  });

  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="About" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl text-blue-300">Your messages are private</p>
        {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <>
            <div className="rounded bg-orange-400 p-1" color="inherit">
              Please login to send me a message
            </div>
            <div>
              <button onClick={() => signIn("google")}>
                <SocialIcon
                  network="google"
                  style={{ height: 25, width: 25 }}
                />
              </button>
              <button onClick={() => signIn("discord")}>
                <SocialIcon
                  network="discord"
                  style={{ height: 25, width: 25 }}
                />
              </button>
            </div>
          </>
        )}
        {session && (
          <>
            <form
              onSubmit={async (e) => {
                /**
                 * In a real app you probably don't want to use this manually
                 * Checkout React Hook Form - it works great with tRPC
                 * @see https://react-hook-form.com/
                 * @see https://kitchen-sink.trpc.io/react-hook-form
                 */
                e.preventDefault();
                const $form = e.currentTarget;

                try {
                  await messageMe.mutateAsync({
                    text: "" + `${e.currentTarget.body.value}`,
                  });

                  $form.reset();
                  window.location.reload();
                } catch (cause) {
                  console.error({ cause }, "Failed to add post");
                }
              }}
              className="flex w-1/2 min-w-fit flex-col items-center justify-center rounded p-3"
            >
              {" "}
              <input
                aria-label="Your message"
                placeholder="Your message..."
                id="body"
                name="body"
                required
                className="h-30v mt-1 block w-3/5 w-full min-w-fit  rounded-md border-gray-300 bg-white py-2 pl-4  text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-500 dark:text-gray-100"
              />
              <button
                className="w-1/6 items-center justify-center rounded p-3 align-middle hover:bg-orange-400"
                type="submit"
              >
                Send
              </button>
            </form>

            <p className="text-black-600  bold text-3xl">Previous Messages</p>
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
      </div>
    </>
  );
};

export default Home;
