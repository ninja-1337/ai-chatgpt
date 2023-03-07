import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { connect } from "tls";
import { object, string } from "zod";
import { z } from "zod";

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
    return prisma.agents.findMany({
      where: {
        id: ctx.session.user.id,
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
  getUserDiscoverable: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
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
      const post = await prisma.message.create({
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
      const agent = await prisma.agents.create({
        data: {
          name: input.name,
          prompt: input.prompt,
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
