import { Test, TestingModule } from '@nestjs/testing';
import { SimcardsController } from './simcards.controller';

describe('SimcardsController', () => {
  let controller: SimcardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimcardsController],
    }).compile();

    controller = module.get<SimcardsController>(SimcardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
