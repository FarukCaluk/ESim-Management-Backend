import { Test, TestingModule } from '@nestjs/testing';
import { SimCardsService } from './simcards.service';

describe('SimcardsService', () => {
  let service: SimCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimCardsService],
    }).compile();

    service = module.get<SimCardsService>(SimCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
