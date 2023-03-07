import { Configuration, OpenAIApi } from "openai";
import { prisma } from "../../server/db/client";
import { initialMessages, Chat } from "../../components/Chat";
import { type Message } from "../../components/ChatLine";

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const botName = "AI";
const userName = "User"; // TODO: move to ENV var
const firstMessge = [
  {
    who: "bot",
    message: "Hi! I’m an A.I. assistant. Ask me anything!",
  },
];

const openai = new OpenAIApi(configuration);

// @TODO: unit test this. good case for unit testing
const generatePromptFromMessages = (messages: Message[]) => {
  console.log("== INITIAL messages ==", messages);

  let prompt = "";

  // add first user message to prompt
  prompt += messages[1]?.message;

  // remove first conversaiton (first 2 messages)
  const messagesWithoutFirstConvo = messages.slice(2);

  // early return if no messages
  if (messagesWithoutFirstConvo.length == 0) {
    return prompt;
  }

  messagesWithoutFirstConvo.forEach((message: Message) => {
    const name = message.who === "user" ? userName : botName;
    prompt += `\n${name}: ${message.message}`;
  });
  return prompt;
};

export default async function handler(req: any, res: any) {
  const messages = req.body.messages;
  const agnt = req.body.agent;
  const messagesPrompt = generatePromptFromMessages(messages);

  const agent = await prisma.agents.findUnique({
    where: {
      id: agnt.toString(),
    },
    select: {
      prompt: true,
    },
  });

  const Prmpt = agent?.prompt.toString();
  console.log(Prmpt);
  // if (agent === "CA") {
  //   x = "You respond only with code for the given task prompted";
  // } else if (agent === "LEA") {
  //   x =
  //     "You respond only with code explanations of what the user provided or explanations of what you answered before";
  // } else if (agent === "analogy") {
  //   x =
  //     "Generate analogies like the ones after the dot .  Neural networks are like genetic algorithms in that both are systems that learn from experience.Social media is like a market in that both are systems that coordinate the actions of many individuals. A2E is like lipofuscin in that both are byproducts of the normal operation of a system.Haskell is like LISP in that both are functional languages.Quaternions are like matrices in that both are used to represent rotations in three dimensions.Quaternions are like octonions in that both are examples of non-commutative algebra. Memes are like viruses in that both are self-replicating ideas. Epidemics are like cascading failures in that both are cases where a small perturbation can trigger a large and unpredictable effect. Amorphous computing is like fermentation in that both rely on a network of microscopic agents interacting with each other.";
  // } else if (agent === "fantasyart") {
  //   x =
  //     "You respond only with an articulate and imaginative and fantasy like text prompt to be used as input into an AI art generation model.That would fit whatever the user described";
  // } else if (agent === "art") {
  //   x =
  //     "You respond only with an articulate and imaginative text prompts to be used as input into an AI art generation model MidJourney.That would fit whatever the user described";
  // } else if (agent === "") {
  //   x = "You are helpfull agent ";
  // } else if (agent === "TSIG") {
  //   x =
  //     "You respond only with new articulate and unique startup ideas around the text that the user provided.All ideas in your responses should be diffrent from each other.After listing all ideas suggest ways the user could improve his prompts.All ideas should be not similar with each other.Dont use thw same words often.The folowing are ideas for tech startups only to be used as reference and serve as a format of how to respond, software as a service and platforms utilising the t3 stack.#### A startup that lets people rent a suinbed on the beach. #### An Api as a service that offers statistics data for different job positions around the world from real time jobboards like LinkedIn and Glasdoor. #### A startup that lets people easily find nearby parking garages with free parking spots. #### A company that allows people to create and publish their own support chatbot #### ";
  // }

  const defaultPrompt = `\n${Prmpt}.\n\n${botName}: ${firstMessge}\n${userName}: ${messagesPrompt}\n${botName}: `;
  const finalPrompt = process.env.AI_PROMPT
    ? `${process.env.AI_PROMPT}${messagesPrompt}\n${botName}: `
    : defaultPrompt;
  console.log(finalPrompt);
  // const payload = {
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "user", content: finalPrompt }],
  //   temperature: 0.7,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   max_tokens: process.env.AI_MAX_TOKENS
  //     ? parseInt(process.env.AI_MAX_TOKENS)
  //     : 200,
  //   stream: false,
  //   n: 1,
  // };
  const payload = {
    model: "text-davinci-003",
    prompt: finalPrompt,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: [`${botName}:`, `${userName}:`],
    user: req.body?.user,
  };

  /**
   * @doc https://vercel.com/docs/concepts/limits/overview#serverless-function-execution-timeout
   * Serverless Function Execution Timeout
   * The maximum execution timeout is 10 seconds when deployed on a Personal Account (Hobby plan).
   * For Teams, the execution timeout is 60 seconds (Pro plan) or 900 seconds (Enterprise plan).
   */
  const response = await openai.createCompletion(payload);
  const firstResponse = response.data.choices[0]?.text;

  res.status(200).json({ text: firstResponse });
}
