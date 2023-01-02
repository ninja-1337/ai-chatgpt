import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Under Construction`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.guestbook.findMany({
      include: {
        created_by: true, // Return all fields
      },
    });
  }),
});
