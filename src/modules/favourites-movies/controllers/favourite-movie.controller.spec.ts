import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteMovieController } from './favourite-movie.controller';

describe('FavouriteMovieController', () => {
  let controller: FavouriteMovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavouriteMovieController],
    }).compile();

    controller = module.get<FavouriteMovieController>(FavouriteMovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
