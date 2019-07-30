import { InstantModule } from './instant.module';

describe('InstantModule', () => {
  let instantModule: InstantModule;

  beforeEach(() => {
    instantModule = new InstantModule();
  });

  it('should create an instance', () => {
    expect(instantModule).toBeTruthy();
  });
});
