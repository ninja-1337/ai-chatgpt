import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { format } from "date-fns";
import Image from "next/image";

import { SocialIcon } from "react-social-icons";
const Home: NextPage = () => {
  const hello = trpc.example.getAll.useQuery();
  const addPost = trpc.auth.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
    },
  });

  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>Guestbook</title>
        <meta name="description" content="About" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-fit flex-col items-center justify-center p-2">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          <span className="text-orange-300">Reviews</span>
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise us!
        </p>

        {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <>
            <div className="rounded bg-orange-400 p-1" color="inherit">
              Login to post a message
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
        {session?.user && (
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
              const values = Object.fromEntries(new FormData($form));
              //    ^?

              try {
                await addPost.mutateAsync({
                  text: "" + `${e.currentTarget.body.value}`,
                });

                $form.reset();
                window.location.reload();
              } catch (cause) {
                console.error({ cause }, "Failed to add post");
              }
            }}
            className="relative my-4"
          >
            <input
              aria-label="Your message"
              placeholder="Your message..."
              id="body"
              name="body"
              required
              className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 pl-4 pr-32 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-500 dark:text-gray-100"
            />
            <button
              type="submit"
              className="absolute right-1 top-2 flex h-8 w-28 items-center justify-center rounded bg-gray-100   font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100"
            >
              Post
            </button>
          </form>
        )}

        <div className="w-8/12">
          {hello.data?.map((post) => {
            return (
              <>
                <div className="p-2 text-center align-middle ">
                  <p className="text-base text-gray-400 dark:text-gray-600"></p>
                  <p className="text-center">{post.body}</p>
                  <div className="inline-block align-middle text-xs text-gray-500">
                    <>
                      <Image
                        src={"" + post.created_by.image}
                        alt="Picture of the author"
                        width={20}
                        height={20}
                        style={{ borderRadius: 50, display: "inline" }}
                      />{" "}
                      {post.created_by.name} {" / "}
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
        </div>
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
