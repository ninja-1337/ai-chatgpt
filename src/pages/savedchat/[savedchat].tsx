import { Layout, Text, Page } from "@vercel/examples-ui";
import { Chat } from "../../components/Chat";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router'

function Home() {
  const { data: session, status } = useSession();
    const router = useRouter()
    const { savedchat } = router.query
  return (
    <Page className="flex h-screen flex-col gap-6">
      {!session && (
        <section className="flex flex-col items-center gap-6">
             <p><>Slug: {savedchat}</></p>
          <Text variant="h1">Please login to use App</Text>
        </section>
      )}
      {session && (
        <section className="flex h-3/4 flex-col items-center gap-3">
           <p>Chat Slug: {savedchat}</p>
          <Chat />
        </section>
      )}
    </Page>
  );
}

Home.Layout = Layout;

export default Home;
