import { Router } from "express"
import { createMovieController, deleteMovieController, readMoviesController, updateMovieController } from "../controllers/movies.controllers"
import { ensureDataValidMiddleware } from "../middlewares/ensureDataValid.middleware"
import { ensureMovieExistsMiddlerware } from "../middlewares/ensureMovieExists.middleware"
import { ensureNameExistsMiddleware } from "../middlewares/ensureNameExists.middleware"
import { movieCreateSchema, movieUpdateSchema } from "../schemas"

const movieRouter: Router = Router()

movieRouter.post("", ensureDataValidMiddleware(movieCreateSchema), ensureNameExistsMiddleware, createMovieController)
movieRouter.get("", readMoviesController)
movieRouter.delete("/:id", ensureMovieExistsMiddlerware, deleteMovieController)
movieRouter.patch("/:id", ensureMovieExistsMiddlerware, ensureDataValidMiddleware(movieUpdateSchema), ensureNameExistsMiddleware, updateMovieController)

export default movieRouter
