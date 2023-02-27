import { z } from "zod" 

const movieCreateSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().optional().nullable(),
    duration: z.number().gt(0).int(), 
    price: z.number().int()
})

const movieUpdateSchema = movieCreateSchema.partial()

const  movieSchema = movieCreateSchema.extend({
    id: z.number(),
}) 

const returnMoviesSchema = movieSchema.array()

const arrayMoviesSchema = z.array(movieSchema)

  
export {
    movieSchema,
    movieCreateSchema,
    returnMoviesSchema,
    movieUpdateSchema,
    arrayMoviesSchema
    
}