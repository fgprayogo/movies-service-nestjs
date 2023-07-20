import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

let app: INestApplication;
beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

const movieData = {
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  rating: faker.number.float(),
};
let movieId: number;

describe('Movie Module (e2e)', () => {
  /**
   * Register
   */
  describe('/Movies (POST)', () => {
    it('should return NEW record', async () => {
      const response = await request(app.getHttpServer())
        .post('/Movies')
        .send(movieData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      movieId = response.body.id;
    });

    it('should return ERROR when duplicate', async () => {
      await request(app.getHttpServer())
        .post('/Movies')
        .send(movieData)
        .expect(403);
    });
  });

  /**
   * Login
   */
  describe('/Movies (GET)', () => {
    it('should return list of movies', async () => {
      const response = await request(app.getHttpServer())
        .get('/Movies')
        .expect(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  /**
   * Login
   */
  describe('/Movies/:id (GET)', () => {
    it('should return a movie with specific ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/Movies/${movieId}`)
        .expect(200);
      expect(response.body.title).toEqual(movieData.title);
    });
  });

  /**
   * Login
   */
  describe('/Movies/:id (PATCH)', () => {
    it('should update a movie', async () => {
      movieData.description = `UPDATE ${movieData.description}`;
      const response = await request(app.getHttpServer())
        .patch(`/Movies/${movieId}`)
        .send(movieData)
        .expect(200);
      expect(response.body.description).toEqual(movieData.description);
    });
  });

  /**
   * Login
   */
  describe('/Movies/:id (DELETE)', () => {
    it('should delete a movie', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/Movies/${movieId}`)
        .expect(200);
      expect(response.body.id).toEqual(movieId);
    });
  });




});
