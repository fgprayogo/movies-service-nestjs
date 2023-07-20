import { Movies as MoviesModel } from '@prisma/client';

export const movieStub = (): MoviesModel => {
  return {
    id: 1,
    title: 'Avatar',
    description: 'Avatar movie description',
    rating: 7,
    image: '',
    created_at: new Date('2023-07-19T11:04:15.860Z'),
    updated_at: new Date('2023-07-19T09:38:46.266Z'),
  };
};
