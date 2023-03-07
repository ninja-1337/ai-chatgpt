import { Layout, Text, Page } from "@vercel/examples-ui";
import { Chat } from "../components/Chat";
import { signIn, signOut, useSession } from "next-auth/react";
function Home() {
  const { data: session, status } = useSession();

  return (
    <Page className="flex flex-col gap-12">
      {!session && (
        <section className="flex flex-col items-center gap-6">
          <Text variant="h1">Please login to use App</Text>
        </section>
      )}
      {session && (
        <>
          <section className="flex flex-col items-center gap-6">
            <Text variant="h1">Verbal Agents</Text>
            <Text variant="h2">Chat</Text>
          </section>
          <section className="flex flex-col items-center gap-3">
            <Chat />
          </section>
        </>
      )}
    </Page>
  );
}

Home.Layout = Layout;

export default Home;
