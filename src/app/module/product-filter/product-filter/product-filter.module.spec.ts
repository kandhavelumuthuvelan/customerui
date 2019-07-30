import { ProductFilterModule } from './product-filter.module';

describe('ProductFilterModule', () => {
  let productFilterModule: ProductFilterModule;

  beforeEach(() => {
    productFilterModule = new ProductFilterModule();
  });

  it('should create an instance', () => {
    expect(productFilterModule).toBeTruthy();
  });
});
