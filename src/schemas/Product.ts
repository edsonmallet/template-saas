import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  price: z.number().nullable(),
  name: z.string(),
  quantity: z.number().optional(),
  image: z.string(),
  description: z.string().nullable(),
  currency: z.string().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
