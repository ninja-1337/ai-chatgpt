import clsx from "clsx";
import Balancer from "react-wrap-balancer";
import { Button } from "./Button";
import React, { useState } from "react";
import { useTheme as useNextTheme } from 'next-themes'
// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
  theme?:any;
};

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
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
    <span style={{ whiteSpace: "pre-wrap" }} key={i}>
      {line}
      <br />
    </span>
  ));

const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
export function ChatLine({ who = "bot", message, theme  }: Message  ) {
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
          className={who=="bot" ?clsx(
            "text ",
            who == "bot"
              ? "font- float-right mb-5 rounded-xl  px-4 py-5 font-semibold shadow-xl  sm:px-6"
              : "text-white-400   ",
           
              (who == "bot"&&theme=="dark")
              ? "font- float-right mb-5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-800 px-4 py-5 font-semibold shadow-lg ring-1 ring-zinc-100 sm:px-6"
              : "font- float-right mb-5 rounded-xl bg-gradient-to-r from-orange-400 to-orange-300 px-4 py-5 font-semibold shadow-lg ring-1 ring-zinc-100 sm:px-6",
             
             
          ):clsx(
            "text ",
           
              (who == "user"&&theme=="dark")
              ? "font- float-right mb-5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-5 font-semibold shadow-lg ring-1 ring-zinc-100 sm:px-6"
              : "font- float-right mb-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-5 font-semibold shadow-lg ring-1 ring-zinc-100 sm:px-6",
             
          )}
        >
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="font-large text-xxl text-gray-900">
                <a href="#" className="hover:underline">
                  {who == "bot" ? "AI" : "You"}
                </a>
              </p>
              <p
                className={clsx(
                  "text ",
                  who == "bot" ? "text-white-400" : "text-white-400"
                )}
              >
                {formatteMessage}
              </p>
            </div>
          </div>
          <div className=" flex flex-row">
            <svg
              fill="#000000"
              height="1em"
              width="1em"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className=" ml-1 mt-1 h-4 w-4 cursor-pointer  hover:rounded hover:bg-slate-200"
              onClick={() => {
                copyContent(message);
              }}
              enable-background="new 0 0 24 24"
            >
              <g id="save">
                <path
                  d="M22.083,24H1.917C0.86,24,0,23.14,0,22.083V1.917C0,0.86,0.86,0,1.917,0h16.914L24,5.169v16.914
		C24,23.14,23.14,24,22.083,24z M20,22h2V5.998l-3-3V9c0,1.103-0.897,2-2,2H7c-1.103,0-2-0.897-2-2V2H2v20h2v-7c0-1.103,0.897-2,2-2
		h12c1.103,0,2,0.897,2,2V22z M6,22h12v-7.001L6,15V22z M7,2v7h10V2H7z"
                />
                <path d="M15,8h-4V3h4V8z" />
              </g>
            </svg>
            <div>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                className=" ml-2 mt-1 h-4 w-4 cursor-pointer   hover:bg-slate-200"
                onClick={() => {
                  copyContent(message);
                }}
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                data-darkreader-inline-stroke=""
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  );
}
