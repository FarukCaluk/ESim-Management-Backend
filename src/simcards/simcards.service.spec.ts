import { Test, TestingModule } from '@nestjs/testing';
import { SimcardsService } from './simcards.service';

describe('SimcardsService', () => {
  let service: SimcardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimcardsService],
    }).compile();

    service = module.get<SimcardsService>(SimcardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
