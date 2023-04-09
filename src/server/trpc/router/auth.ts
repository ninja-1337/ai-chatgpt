import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { connect } from "tls";
import { object, string } from "zod";
import { z } from "zod";
export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};
function validateArray(input: any): any {
  console.log("validateArray called with iput", input);
  return false;
}
type Value = {
  value1: string;
  value2: string;
};

function validateSingleValue(input: Value): any {
  console.log("validateSingleValue called with iput", input);
  return false;
}

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "Content just for authenticated Users";
  }),
  getSecretMessage2: protectedProcedure.query(() => {
    return "Content just for authenticated Users";
  }),
  getAgents: protectedProcedure.query(({ ctx }) => {
    return prisma.agents.findMany({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
  getUserAgents: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.agents.findMany({
          where: {
        OR: [
          {
            OR: [
           {userId: ctx.session.user.id}
            ]
          },
          {
            OR: [
             {userId:'clfspjtrl0000ld086bf6h44e'}
            ]
          }
        ]
        ,
      },
    });
  }),
  getUserMessages: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.message.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        sent_by: true, // Return all fields
      },
    });
  }),
  getUserSavedChat: protectedProcedure.query(({ ctx, input }) => {
    return ctx.prisma.aichats.findMany({
      where: {
        userId : ctx.session.user.id ,
      
      },
      // include: {
      //   sent_by: true, // Return all fields
      // },
    });
  }),
  getUserDiscoverable: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
  saveChat: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await prisma.aichats.create({
        data: {
          
        userId:ctx.session?.user.id,
        chat:{
          input
        }
        },
      });
    }),
  add: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await prisma.guestbook.create({
        data: {
          email: "" + ctx.session?.user?.email,
          body: input.text,
          userId: ctx.session?.user.id,
        },
      });
    }),
  messageMe: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.message.create({
        data: {
          email: "" + ctx.session?.user?.email,
          body: input.text,
          userId: ctx.session?.user.id,
        },
      });
    }),
  createUserAgent: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.agents.create({
        data: {
          name: "" + input.name,
          prompt: "" + input.prompt,
          userId: ctx.session?.user.id,
        },
      });
    }),
  updateDiscoverable: protectedProcedure
    .input(z.boolean())
    .mutation(async ({ ctx, input }) => {
      const post = await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: { discoverable: input },
      });
    }),
});
