import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  price: z.coerce.number().positive('Цена должна быть строго больше 0'),
  category: z.string().optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
})

export type Product = z.infer<typeof ProductSchema> & {

  _isNew?: boolean
  _updated?: boolean
  _deleted?: boolean
}

export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number().optional(),
  skip: z.number().optional(),
  limit: z.number().optional(),
})