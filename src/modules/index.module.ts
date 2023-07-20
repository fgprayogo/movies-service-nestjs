import { Module } from '@nestjs/common';
import { MovieService } from './movie/movie.service';
import { MovieDao } from './movie/movie.dao';
import { PrismaService } from '../database/prisma/prisma.service';
import { MovieController } from './movie/movie.controller';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [PrismaService, MovieService, MovieDao],
})
export class IndexModule {}
