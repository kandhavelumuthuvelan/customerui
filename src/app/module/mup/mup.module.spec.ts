import { MupModule } from './mup.module';

describe('MupModule', () => {
  let mupModule: MupModule;

  beforeEach(() => {
    mupModule = new MupModule();
  });

  it('should create an instance', () => {
    expect(mupModule).toBeTruthy();
  });
});
