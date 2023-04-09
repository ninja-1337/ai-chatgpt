import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { json } from "stream/consumers";

const Home: NextPage = () => {
 
  const { data: savedChats } = trpc.auth.getUserSavedChat.useQuery();
  const chats = savedChats?.map((chat) => {
    console.log(chat)
    const json:any =chat.chat
   const message= JSON.parse(json?.input?.text)
    console.log(message)
   return  <><p>ChatID: {chat.id}</p>
              <p>Messages:
              {message.map((message:any)=>{
                <p>{message.who+":"+message.message}</p>
              })}
              </p>
   </>

  }
  );
  return (
    <>
      <Head>
        <title>Saved Chats</title>
        <meta name="description" content="About" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-fit flex-col items-center justify-center p-2">
        <>
        <h1 className="text-3xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          <span className="text-black-300">Saved Chats</span>
        
        </h1>
        <p>{savedChats?.map((chat) => {
    console.log(chat)
    const json:any =chat.chat
   const message= JSON.parse(json?.input?.text)
    console.log(message)
   return  <><p>ChatID: {chat.id}</p>
              <p>Messages:
              {message.map((msg:any)=>{
                <>
                {msg.toString()}
                <p>{msg.who.text+":"+msg.message.text}</p>
                </>
              })}
              </p>
   </>

  }
  )}</p>
       
        </>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

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
