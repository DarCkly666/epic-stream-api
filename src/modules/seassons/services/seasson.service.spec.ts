import { Test, TestingModule } from '@nestjs/testing';
import { SeassonService } from './seasson.service';

describe('SeassonService', () => {
  let service: SeassonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeassonService],
    }).compile();

    service = module.get<SeassonService>(SeassonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
