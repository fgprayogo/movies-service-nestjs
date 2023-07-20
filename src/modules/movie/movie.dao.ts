import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Prisma } from '@prisma/client';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieDao {
  constructor(private prisma: PrismaService) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    try {
      return await this.prisma.movies.create({ data: createMovieDto });
    } catch (error) {
      await this.catchPrismaCreateError(error, createMovieDto.title);
    }
  }

  async getAllMovies() {
    return await this.prisma.movies.findMany();
  }

  async getMovieById(id: number) {
    try {
      return await this.prisma.movies.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      await this.catchPrismaFindError(error, id);
    }
  }

  async updateMovie(id: number, data: UpdateMovieDto) {
    try {
      return await this.prisma.movies.update({ where: { id }, data });
    } catch (error) {
      await this.catchPrismaFindError(error, id);
    }
  }

  async deleteMovie(id: number) {
    try {
      return await this.prisma.movies.delete({ where: { id } });
    } catch (error) {
      await this.catchPrismaFindError(error, id);
    }
  }

  private async catchPrismaFindError(error: any, id: number) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      // P2025: The record with the specified ID was not found
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    // If it's not a known Prisma error or not related to record not found, re-throw the original error
    throw error;
  }

  private async catchPrismaCreateError(error: any, title: string) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      // P2002: The record with the specified title already exist
      throw new ForbiddenException(`Movie with title ${title} already exist`);
    }
    // If it's not a known Prisma error or not related to record not found, re-throw the original error
    throw error;
  }
}
