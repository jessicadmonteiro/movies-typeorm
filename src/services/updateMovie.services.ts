import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { imovie, iMovieRepo } from "../interfaces/movies.interface"
import { movieSchema } from "../schemas"

const updateMovieService = async (movieData: any, idMovie: number): Promise<imovie> => {

    const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie)

    const oldMovieData = await movieRepository.findOneBy({
        id: idMovie
    })

    const movie = movieRepository.create({
        ...oldMovieData,
        ...movieData
    })

    await movieRepository.save(movie)

    const updateMovie = movieSchema.parse(movie)

    return updateMovie 

    
}

export default updateMovieService