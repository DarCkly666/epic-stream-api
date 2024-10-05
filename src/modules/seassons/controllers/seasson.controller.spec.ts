import { Test, TestingModule } from '@nestjs/testing';
import { SeassonController } from './seasson.controller';

describe('SeassonController', () => {
  let controller: SeassonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeassonController],
    }).compile();

    controller = module.get<SeassonController>(SeassonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
