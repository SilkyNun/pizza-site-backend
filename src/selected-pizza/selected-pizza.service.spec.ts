import { Test, TestingModule } from '@nestjs/testing';
import { SelectedPizzaService } from './selected-pizza.service';

describe('SelectedPizzaService', () => {
  let service: SelectedPizzaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedPizzaService],
    }).compile();

    service = module.get<SelectedPizzaService>(SelectedPizzaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
