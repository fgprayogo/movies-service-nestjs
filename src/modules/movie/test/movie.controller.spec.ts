import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { MovieService } from '../movie.service';
import { movieStub } from './movie.stub';
import { MovieController } from '../movie.controller';

describe('MovieController', () => {
  let movieService: MovieService;
  let movieController: MovieController;

  beforeEach(async () => {
    const movieServiceMock = {
      create: jest.fn().mockResolvedValue(movieStub()),
      findAll: jest.fn().mockResolvedValue([movieStub()]),
      findOne: jest.fn().mockResolvedValue(movieStub()),
      update: jest.fn().mockResolvedValue(movieStub()),
      remove: jest.fn().mockResolvedValue(movieStub()),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(MovieService)
      .useValue(movieServiceMock)
      .compile();

    movieService = module.get<MovieService>(MovieService);
    movieController = module.get<MovieController>(MovieController);
    module.close();
  });

  describe('create', () => {
    describe('when create is called', () => {
      test('should return a new record if successful', async () => {
        const result = await movieController.create(movieStub());
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      test('should return all movies if successful', async () => {
        const result = await movieController.findAll();
        expect(result).toBeDefined();
        expect(result).toEqual([movieStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      test('should return a record if successful', async () => {
        const result = await movieController.findOne('1');
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      test('should return a record if successful', async () => {
        const result = await movieController.update('1', movieStub());
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      test('should return a record that has been deleted if successful', async () => {
        const result = await movieController.remove('1');
        expect(result).toBeDefined();
        expect(result).toEqual(movieStub());
      });
    });
  });

  
});
