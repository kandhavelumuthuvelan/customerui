import { ConstructionModule } from './construction.module';

describe('ConstructionModule', () => {
  let constructionModule: ConstructionModule;

  beforeEach(() => {
    constructionModule = new ConstructionModule();
  });

  it('should create an instance', () => {
    expect(constructionModule).toBeTruthy();
  });
});
