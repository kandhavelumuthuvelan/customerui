import { ReturnModule } from './return.module';

describe('ReturnModule', () => {
  let returnModule: ReturnModule;

  beforeEach(() => {
    returnModule = new ReturnModule();
  });

  it('should create an instance', () => {
    expect(returnModule).toBeTruthy();
  });
});
