import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { MovieService } from '../movie.service';
import { movieStub } from './movie.stub';
import { MovieDao } from '../movie.dao';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieDao: MovieDao;

  beforeEach(async () => {
    const movieDaoMock = {
      createMovie: jest.fn().mockResolvedValue(movieStub()),
      getAllMovies: jest.fn().mockResolvedValue([movieStub()]),
      getMovieById: jest.fn().mockResolvedValue(movieStub()),
      updateMovie: jest.fn().mockResolvedValue(movieStub()),
      deleteMovie: jest.fn().mockResolvedValue(movieStub()),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(MovieDao)
      .useValue(movieDaoMock)
      .compile();

    movieService = module.get<MovieService>(MovieService);
    movieDao = module.get<MovieDao>(MovieDao);
    module.close();
  });

  describe('create', () => {
    describe('when create is called', () => {
      test('should return a new record if successful', async () => {
        const result = await movieService.create(movieStub());
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      test('should return all movies if successful', async () => {
        const result = await movieService.findAll();
        expect(result).toBeDefined();
        expect(result).toEqual([movieStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      test('should return a record if successful', async () => {
        const result = await movieService.findOne(1);
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      test('should return a record if successful', async () => {
        const result = await movieService.update(1, movieStub());
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      test('should return a record that has been deleted if successful', async () => {
        const result = await movieService.remove(1);
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });
});
