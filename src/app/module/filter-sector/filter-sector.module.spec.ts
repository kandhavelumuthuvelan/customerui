import { FilterSectorModule } from './filter-sector.module';

describe('FilterSectorModule', () => {
  let filterSectorModule: FilterSectorModule;

  beforeEach(() => {
    filterSectorModule = new FilterSectorModule();
  });

  it('should create an instance', () => {
    expect(filterSectorModule).toBeTruthy();
  });
});
