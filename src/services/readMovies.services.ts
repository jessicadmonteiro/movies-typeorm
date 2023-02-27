import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { iMovieRepo } from "../interfaces/movies.interface"
import { arrayMoviesSchema } from "../schemas"
import { FindOptionsOrder } from "typeorm/find-options/FindOptionsOrder"


const readMoviesService = async (perPage: any, page: any, sort: any,  order: any) => {

    const moviesRopository: iMovieRepo = AppDataSource.getRepository(Movie)

    let take: number = Number(perPage) || 5
    let skip: number = Number(page) || 1 

    if(take < 0){
        take = 5
    }
   
    const idSortOrder: FindOptionsOrder<Movie> = {
        id: {
            direction: "ASC"
        }
    }

    const arraySortOrder = [[sort, {direction: order} ]] 

    let newSortOrder: FindOptionsOrder<Movie> = Object.fromEntries(arraySortOrder)

    if(sort === undefined){
        newSortOrder = idSortOrder
    }

    const[ findMovies, count ]= await moviesRopository.findAndCount({
        order: newSortOrder,
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
