import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { MovieService } from '../movie.service';
import { movieStub } from './movie.stub';
import { MovieDao } from '../movie.dao';
import { PrismaService } from '../../../database/prisma/prisma.service';

describe('MovieDao', () => {
  let prismaService: PrismaService;
  let movieDao: MovieDao;

  beforeEach(async () => {
    const prismaMock = {
      movies: {
        create: jest.fn().mockResolvedValue(movieStub()),
        findMany: jest.fn().mockResolvedValue([movieStub()]),
        findUniqueOrThrow: jest.fn().mockResolvedValue(movieStub()),
        update: jest.fn().mockResolvedValue(movieStub()),
        delete: jest.fn().mockResolvedValue(movieStub()),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    prismaService = module.get<PrismaService>(PrismaService);
    movieDao = module.get<MovieDao>(MovieDao);
    module.close();
  });

  describe('create', () => {
    describe('when create is called', () => {
      test('should return a new record if successful', async () => {
        const result = await movieDao.createMovie(movieStub());
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      test('should return all movies if successful', async () => {
        const result = await movieDao.getAllMovies();
        expect(result).toBeDefined();
        expect(result).toEqual([movieStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      test('should return a record if successful', async () => {
        const result = await movieDao.getMovieById(1);
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      test('should return a record if successful', async () => {
        const result = await movieDao.updateMovie(1, movieStub());
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      test('should return a record that has been deleted if successful', async () => {
        const result = await movieDao.deleteMovie(1);
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });
});
