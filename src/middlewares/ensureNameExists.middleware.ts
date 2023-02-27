import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { AppError } from "../error"
import { iMovieRepo} from "../interfaces/movies.interface"
import { returnMoviesSchema } from "../schemas"

const ensureNameExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const moviesRopository: iMovieRepo = AppDataSource.getRepository(Movie)

    const findMovies = await moviesRopository.find()

    const movies = returnMoviesSchema.parse(findMovies)

   const name = movies.map((element) => element.name).find((element) => element === req.body.name)
    
    if(name !== undefined){
        
        throw new AppError("Movie already exists.", 409)
    }

    next()
}

export {
    ensureNameExistsMiddleware
}