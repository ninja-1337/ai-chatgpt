import clsx from "clsx";
import Balancer from "react-wrap-balancer";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full px-4 py-5 animate-pulse sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 font-large text-xxl">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="pt-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 col-span-2 rounded bg-zinc-500"></div>
            <div className="h-2 col-span-1 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ who = "bot", message }: Message) {
  if (!message) {
    return null;
  }
  const formatteMessage = convertNewLines(message);

  return (
    <div
      className={
        who != "bot" ? "float-right clear-both" : "float-left clear-both"
      }
    >
      <BalancerWrapper>
        <div
          className={clsx(
            "text ",
            who == "bot"
              ? "font-semibold font- bg-zinc-400 float-right px-4 py-5 mb-5 rounded-xl shadow-xl ring-1 ring-zinc-100 sm:px-6"
              : "text-white-400 bg-orange-300",
            who == "user"
              ? "font-semibold font- bg-cyan-200 float-right px-4 py-5 mb-5 rounded-xl shadow-lg ring-1 ring-zinc-100 sm:px-6"
              : "text-white-400 bg-orange-300"
          )}
        >
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="text-gray-900 font-large text-xxl">
                <a href="#" className="hover:underline">
                  {who == "bot" ? "AI" : "You"}
                </a>
              </p>
              <p
                className={clsx(
                  "text ",
                  who == "bot" ? "font-semibold font-" : "text-white-400"
                )}
              >
                {formatteMessage}
              </p>
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  );
}
