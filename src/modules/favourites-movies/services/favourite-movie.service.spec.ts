import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteMovieService } from './favourite-movie.service';

describe('FavouriteMovieService', () => {
  let service: FavouriteMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavouriteMovieService],
    }).compile();

    service = module.get<FavouriteMovieService>(FavouriteMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
