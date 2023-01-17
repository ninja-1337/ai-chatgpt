import { useEffect, useState } from "react";
import { Button } from "./Button";
import { type Message, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import Select from "react-select";
const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Hi! I’m A coding AI assistant. Ask me anything!",
  },
];

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="clear-both mt-6 flex">
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
      className="ml-4 flex-none"
      disabled="true"
      onClick={() => {
        ("");
      }}
    >
      Share-Chat
    </Button>
  </div>
);

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const [agent, setAgent] = useState({ value: "", label: "default" });
  const options = [
    { value: "analogy", label: "Analogy Generator" },
    { value: "LEA", label: "Code explainer" },
    { value: "CA", label: "Coding Assistant" },
    { value: "art", label: "Art prompt generator" },
    { value: "fantasyart", label: "Fantasy Art prompt generator" },
  ];
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
    const botNewMessage = data.text.trim();

    setMessages([
      ...newMessages,
      { message: botNewMessage, who: "bot" } as Message,
    ]);
    setLoading(false);
  };

  return (
    <>
      {" "}
      <Select
        onChange={(state) => {
          setAgent(state as any);
          setMessages([]);
        }}
        options={options}
      />
      <div className="rounded-2xl border-zinc-100 lg:border lg:p-6">
        {messages.map(({ message, who }, index) => (
          <>
            <ChatLine key={index} who={who} message={message} />
          </>
        ))}

        {loading && <LoadingChatLine />}

        {messages.length < 2 && (
          <span className="clear-both mx-auto flex flex-grow text-gray-600">
            Type a message to start the conversation
          </span>
        )}
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
}
