import { DeepPartial, Repository } from "typeorm"
import { z } from "zod"
import { Movie } from "../entities"
import { movieCreateSchema, movieSchema, returnMoviesSchema, movieUpdateSchema, arrayMoviesSchema } from "../schemas"

type imovie = z.infer<typeof movieSchema>
type imovieUpdate = z.infer<typeof movieUpdateSchema>
type imoviesReturn = z.infer<typeof returnMoviesSchema>
type iMovieCreate = z.infer<typeof movieCreateSchema>
type iMovieUpdate = DeepPartial<Movie>
type iMovieRepo = Repository<Movie>
type iMovieArray = z.infer<typeof arrayMoviesSchema>

export { 
    imovie,
    iMovieCreate,
    iMovieUpdate, 
    iMovieRepo,
    imoviesReturn,
    imovieUpdate,
    iMovieArray
}