import { Request, Response} from "express"
import { iMovieCreate } from "../interfaces/movies.interface"
import createMoviesService from "../services/createMovie.services"
import { deleteMovieService } from "../services/deleteMovie.services"
import { readMoviesService } from "../services/readMovies.services"
import updateMovieService from "../services/updateMovie.services"


const createMovieController = async ( req: Request, res: Response): Promise<Response> => {
    const movieData: iMovieCreate = req.body

    const newMovie = await createMoviesService(movieData)

    return res.status(201).json(newMovie)
}

const readMoviesController = async ( req: Request, res: Response): Promise<Response> => {
    const { perPage, page } = req.query
    
    const movies = await readMoviesService(
        perPage,
        page
    )

    return res.status(200).json(movies)

}

const deleteMovieController = async ( req: Request, res: Response): Promise<Response> => {

    await deleteMovieService(parseInt(req.params.id))

    return res.status(204).send()
}

const updateMovieController = async ( req: Request, res: Response): Promise<Response> =>{
    const movieData = req.body
    const idMovie = parseInt(req.params.id)

    const updateMovie = await updateMovieService(movieData, idMovie)

    return res.json(updateMovie)
}

export {
    createMovieController,
    readMoviesController,
    deleteMovieController,
    updateMovieController
}