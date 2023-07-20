import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieDao } from './movie.dao';

@Injectable()
export class MovieService {
  constructor(private movieDao: MovieDao) {}

  create(createMovieDto: CreateMovieDto) {
    return this.movieDao.createMovie(createMovieDto);
  }

  findAll() {
    return this.movieDao.getAllMovies();
  }

  findOne(id: number) {
    return this.movieDao.getMovieById(id);
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    updateMovieDto['updated_at'] = new Date(Date.now());
    return this.movieDao.updateMovie(id, updateMovieDto);
  }

  remove(id: number) {
    return this.movieDao.deleteMovie(id);
  }
}
