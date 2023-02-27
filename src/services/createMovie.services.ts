import { imovie, iMovieCreate, iMovieRepo } from "../interfaces/movies.interface"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { movieSchema } from "../schemas"

const createMoviesService = async (MovieData: iMovieCreate): Promise<imovie> => {

    const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie)

    const movie: Movie = movieRepository.create(MovieData)

    await movieRepository.save(movie)

    const newMovie = movieSchema.parse(movie)

    return newMovie
}

export default createMoviesService