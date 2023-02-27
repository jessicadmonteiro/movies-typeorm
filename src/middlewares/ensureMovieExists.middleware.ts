import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { AppError } from "../error"
import { iMovieRepo } from "../interfaces"

const ensureMovieExistsMiddlerware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const moviesRepository: iMovieRepo = AppDataSource.getRepository(Movie)

    const findMovie = await moviesRepository.findOne({
        where:{
            id: parseInt(req.params.id)
        }
    })

    if(!findMovie){

        throw new AppError("Movie not found", 404)
    }

    return next ()

}

export{
    ensureMovieExistsMiddlerware
}