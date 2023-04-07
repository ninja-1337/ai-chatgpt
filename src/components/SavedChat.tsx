import { useEffect, useState } from "react";
import { Button } from "./Button";
import { type Message, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import Select from "react-select";

import { trpc } from "../utils/trpc";
const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Hi! I’m an A.I. assistant. Ask me anything!",
  },
];

const Agent = ({
  agentName,
  setAgentName,
  agentPrompt,
  setAgentPrompt,
  createNewAgent,
}: any) => (
  <div className="clear-both mt-0 flex w-full">
    Agent Name:
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={agentName}
      onChange={(e) => {
        setAgentName(e.target.value);
      }}
    />
    Prompt :
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={agentPrompt}
      onChange={(e) => {
        setAgentPrompt(e.target.value);
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        createNewAgent(agentName, agentPrompt);
        setAgentName("");
        setAgentPrompt("");
      }}
    >
      Add Agent
    </Button>
  </div>
);

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="clear-both mt-6 flex w-full">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={input}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      Say
    </Button>
    <Button
      type=""
      className="ml-2 flex-none text-xs"
      disabled="true"
      onClick={() => {
        ("");
      }}
    >
      Share-Chat
    </Button>
  </div>
);

export function Chat(chatId:string) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentPrompt, setNewAgentPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const [agent, setAgent] = useState({ value: "", label: "default" });
  const create = trpc.auth.createUserAgent.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
    },
  });
  const agents = trpc.auth.getUserAgents.useQuery();
  const options = [
    { value: "clexc7czm0008u17ocdxk8eve", label: "Analogy Generator" },
  ];

  agents.data?.forEach(function (agent) {
    options.push({ value: agent.id, label: agent.name });
  });
  console.log(options);
  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { message: message, who: "user" } as Message,
    ];
    setMessages(newMessages);
    const last10mesages = newMessages.slice(-10);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10mesages,
        user: cookie[COOKIE_NAME],
        agent: agent.value,
      }),
    });
    const data = await response.json();

    // strip out white spaces from the bot message
    const botNewMessage = data.text;
    console.log(botNewMessage);
    setMessages([
      ...newMessages,
      { message: botNewMessage, who: "bot" } as Message,
    ]);
    setLoading(false);
  };

  const createAgent = async (AgentName: string, AgentPrompt: string) => {
    try {
      await create.mutateAsync({
        name: AgentName,
        prompt: AgentPrompt,
      });
      window.location.reload();
    } catch (cause) {
      console.error({ cause }, "Failed to add post");
    }
  };

  return (
    <div className="w-11/12">
      <Agent
        agentName={newAgentName}
        setAgentName={setNewAgentName}
        agentPrompt={newAgentPrompt}
        setAgentPrompt={setNewAgentPrompt}
        createNewAgent={createAgent}
      />
      <Select
        onChange={(state) => {
          setAgent(state as any);
          setMessages(initialMessages);
        }}
        options={options}
        isSearchable={false}
      />
      <div>
        <div className="rounded-2xl border-zinc-100 lg:border lg:p-6">
          {messages.map(({ message, who }, index) => (
            <>
              <ChatLine key={index} who={who} message={message} />
            </>
          ))}

          {loading && <LoadingChatLine />}

          {messages.length < 2 && (
            <span className="clear-both mx-4 flex  text-gray-600">
              Type a message to start the conversation
            </span>
          )}
          <InputMessage
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
