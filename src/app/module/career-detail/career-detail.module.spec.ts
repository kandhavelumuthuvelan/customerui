import { CareerDetailModule } from './career-detail.module';

describe('CareerDetailModule', () => {
  let careerDetailModule: CareerDetailModule;

  beforeEach(() => {
    careerDetailModule = new CareerDetailModule();
  });

  it('should create an instance', () => {
    expect(careerDetailModule).toBeTruthy();
  });
});
