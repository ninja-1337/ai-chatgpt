import { Layout, Text, Page } from "@vercel/examples-ui";
import { Chat } from "../components/Chat";

function Home() {
  return (
    <Page className="flex flex-col gap-12">
      <section className="flex flex-col items-center gap-6">
        <Text variant="h1">OpenAI GPT-3</Text>
        <Text className="text-zinc-600">An A.I using GPT-3</Text>
      </section>

      <section className="flex flex-col items-center gap-3">
        <Text variant="h2">Chat</Text>
        <div className="lg:w-2/3">
          <Chat />
        </div>
      </section>
    </Page>
  );
}

Home.Layout = Layout;

export default Home;
