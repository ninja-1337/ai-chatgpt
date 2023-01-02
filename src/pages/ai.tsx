import { Layout, Text, Page } from "@vercel/examples-ui";
import { Chat } from "../components/Chat";

function Home() {
  return (
    <Page className="flex flex-col pt-3 pb-0">
      <div className="flex flex-col items-center gap-2">
        <Text className="text-3xl" variant="h1">
          OpenAI GPT-3
        </Text>
        <Text className="text-zinc-600">An A.I using GPT-3</Text>
      </div>

      <section className="flex flex-col items-center ">
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
