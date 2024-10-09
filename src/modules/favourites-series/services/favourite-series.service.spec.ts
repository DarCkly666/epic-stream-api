import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteSeriesService } from './favourite-series.service';

describe('FavouriteSeriesService', () => {
  let service: FavouriteSeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavouriteSeriesService],
    }).compile();

    service = module.get<FavouriteSeriesService>(FavouriteSeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
