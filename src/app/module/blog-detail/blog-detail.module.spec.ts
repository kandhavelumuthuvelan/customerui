import { BlogDetailModule } from './blog-detail.module';

describe('BlogDetailModule', () => {
  let blogDetailModule: BlogDetailModule;

  beforeEach(() => {
    blogDetailModule = new BlogDetailModule();
  });

  it('should create an instance', () => {
    expect(blogDetailModule).toBeTruthy();
  });
});
