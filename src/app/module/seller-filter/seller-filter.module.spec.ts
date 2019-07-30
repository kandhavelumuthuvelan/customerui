import { SellerFilterModule } from './seller-filter.module';

describe('SellerFilterModule', () => {
  let sellerFilterModule: SellerFilterModule;

  beforeEach(() => {
    sellerFilterModule = new SellerFilterModule();
  });

  it('should create an instance', () => {
    expect(sellerFilterModule).toBeTruthy();
  });
});
