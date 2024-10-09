import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteSeriesController } from './favourite-series.controller';

describe('FavouriteSeriesController', () => {
  let controller: FavouriteSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavouriteSeriesController],
    }).compile();

    controller = module.get<FavouriteSeriesController>(
      FavouriteSeriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
