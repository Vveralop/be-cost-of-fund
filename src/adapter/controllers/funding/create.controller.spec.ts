import { Test, TestingModule } from '@nestjs/testing';
import { CreateFundingController } from './create.controller';

describe('CreateController-Funding', () => {
  let controller: CreateFundingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PruebaController],
    }).compile();

    controller = module.get<PruebaController>(PruebaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
