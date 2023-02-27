import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { iMovieRepo} from "../interfaces/movies.interface"
import { arrayMoviesSchema } from "../schemas"


const readMoviesService = async (perPage: any, page: any) => {

    const moviesRopository: iMovieRepo = AppDataSource.getRepository(Movie)

    let take: number = Number(perPage) || 5
    let skip: number = Number(page) || 1 

    if(take < 0){
        take = 5
    }

    const[ findMovies, count ]= await moviesRopository.findAndCount({
        take,
        skip: take * (skip - 1),
    })

    const resultMovies =  arrayMoviesSchema.parse(findMovies)

   

    const baseUrl: string  = `http://localhost:3000/movies`
    let prevPage: string | null = `${baseUrl}?page=${skip -1}&perPage=${take}`
    let nextPage: string | null = `${baseUrl}?page=${skip +1}&perPage=${take}`


    if(skip <= 1){
        prevPage = null
    }

    const pagination = {
        prevPage,
        nextPage,
        count,
        data: resultMovies
    }

    return  pagination

}


export {
    readMoviesService
}
