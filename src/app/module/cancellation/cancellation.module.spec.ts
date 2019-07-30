import { CancellationModule } from './cancellation.module';

describe('CancellationModule', () => {
  let cancellationModule: CancellationModule;

  beforeEach(() => {
    cancellationModule = new CancellationModule();
  });

  it('should create an instance', () => {
    expect(cancellationModule).toBeTruthy();
  });
});
