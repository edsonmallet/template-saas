import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  upsert: publicProcedure
    .input(z.object({ where: z.string(), attributes: z.any() }))
    .query(async ({ input, ctx }) => {
      await ctx.db.user.upsert({
        where: { externalId: input.where as string },
        create: {
          externalId: input.where,
          attributes: input.attributes,
        },
        update: {
          attributes: input.attributes,
        },
      });
    }),
});
